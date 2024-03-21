<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import gql from "graphql-tag";
import { useNuxtApp, useRoute, useRouter, useAsyncQuery } from "#imports";

// Get route and router
const route = useRoute();
const router = useRouter();

// Set refs for current date, timeout message and loading
const currentDate = ref(route.params.date as string);
const lottery = ref(route.params.lottery as string);
const timeoutMessage = ref(false);
const loading = ref(true);

// Set showOdds to false, this will hide winners by default
const showOdds = ref(false);

// Check if the date is valid and in the past
const isValidDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(date.getTime())) {
    return false;
  } else {
    // REFACTOR: better not compare different timezones, set fixed locale instead
    if (lottery.value === "eurojackpot" || lottery.value === "euromillions") {
      // check if the day is a tuesday or a friday
      return (
        (date.getDay() === 5 || date.getDay() === 2) &&
        date.getTime() <= today.getTime()
      );
    } else if (lottery.value === "powerball") {
      // check if the day is a monday, wednesday or saturday (shift +1 day because of US eastern time)
      return (
        (date.getDay() === 2 || date.getDay() === 4 || date.getDay() === 0) &&
        date.getTime() <= today.getTime()
      );
    }
  }
};

// check currentDate with regex for YYYY-MM-DD, redirect if invalid
if (!currentDate.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
  router.push("/" + lottery);
}
// check if date is valid, redirect if invalid
else if (isValidDate(currentDate.value) === false) {
  router.push("/" + lottery);
}

// Function to calculate the next or previous draw date
const calculateDrawDate = (date: Date, increment: number) => {
  let i = 0;
  while (i < 7) {
    date.setDate(date.getDate() + increment);
    i++;
    if (isValidDate(date)) {
      return date.toISOString().split("T")[0];
    }
  }
  return null;
};

// set up refs
const prevDraw = ref({});
const nextDraw = ref({});
const currentDraw = ref({});
const nextDate = ref(calculateDrawDate(new Date(currentDate.value), 1));
const prevDate = ref(calculateDrawDate(new Date(currentDate.value), -1));
const jackpot = ref(0);

// Query template
const getLotteryDrawQuery = (date: string, lottery: string) => gql`
  query GetLotteryDraw {
    draw(date: "${date}", limit: 1, type: "${lottery.value}") {
      backendError
      draws {
        additionalNumbers
        date
        gameAmount
        jackpot
        numbers
        odds {
          numberOfWinners
          winningClass
          odd
        }
      }
      success
    }
  }
`;

const fetchDraw = async (
  date: string | null,
  lottery: string | null,
  targetRef: any
) => {
  // Set the timeout duration in milliseconds
  const TIMEOUT = 10000;

  if (!date) {
    console.error("Date is null, cannot fetch draw data.");
    return;
  }

  try {
    // Create a new Promise that will reject after TIMEOUT duration
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout reached")), TIMEOUT)
    );

    const queryPromise = useAsyncQuery(getLotteryDrawQuery(date, lottery), {
      limit: 1,
    });

    // Use Promise.race to race the queryPromise against the timeoutPromise
    const response = await Promise.race([queryPromise, timeoutPromise]);

    if (!response) {
      console.log("Timeout reached while fetching data for date:", date);
    } else {
      targetRef.value = response;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data for date: ${date}`, error.message);
    } else {
      console.error("An unexpected error occurred", error);
    }
    timeoutMessage.value = true;
  } finally {
    loading.value = false;
  }
};

// fetch data based on the current date
const updateData = async () => {
  // set loading to true
  loading.value = true;

  nextDate.value = calculateDrawDate(new Date(currentDate.value), 1);
  prevDate.value = calculateDrawDate(new Date(currentDate.value), -1);

  // set draw data
  await fetchDraw(prevDate.value, lottery, prevDraw);
  await fetchDraw(nextDate.value, lottery, nextDraw);
  await fetchDraw(currentDate.value, lottery, currentDraw);

  if (currentDraw.value.data) {
    loading.value = false;
    jackpot.value = Math.round(
      currentDraw.value.data.draw.draws[0].jackpot / 1000000
    );
  }
};

// Use onMounted for initial data fetching
onMounted(updateData);

// Watch for changes in the route params date and refetch data when it changes
watch(
  () => route.params.date,
  async (newDate) => {
    if (newDate && typeof newDate === "string") {
      currentDate.value = newDate;
      updateData();
    }
  }
);
</script>

<template>
  <div>
    <Header />
    <div class="container">
      <div class="teaser" v-if="timeoutMessage === true">
        <div class="padding">
          <h1>Ups.</h1>
          <p>Die API antwortet nicht schnell genug.</p>
        </div>
      </div>
      <div class="loading" v-if="loading === true"></div>
      <div v-if="currentDraw.data">
        <div class="lottery-result">
          <div class="lottery-logo">
            <NuxtLink :to="'/' + lottery + '/'">
              <SvgLogoEurojackpot v-if="lottery == 'eurojackpot'" />
              <SvgLogoEuromillions v-if="lottery == 'euromillions'" />
              <SvgLogoPowerball v-if="lottery == 'powerball'" />
            </NuxtLink>
          </div>
          <div>
            <div class="jackpot">
              <div class="amount">
                {{ jackpot }}
                Mio. €
              </div>
            </div>

            <Numbers
              :numbers="currentDraw.data.draw.draws[0].numbers"
              :additionalNumbers="
                currentDraw.data.draw.draws[0].additionalNumbers
              "
            />

            <div class="dates">
              <NuxtLink
                :to="'/' + lottery + '/' + prevDate"
                v-if="prevDate"
                class="date-prev"
              >
                <i class="icon">
                  <SvgChevronRight />
                </i>
              </NuxtLink>
              <div class="date">
                <i class="icon">
                  <SvgCalendar />
                </i>
                {{ new Date(currentDate).toLocaleDateString("de-DE") }}
                -
                {{
                  new Date(currentDate).toLocaleDateString("de-DE", {
                    weekday: "long",
                  })
                }}
              </div>
              <NuxtLink
                :to="'/' + lottery + '/' + nextDate"
                v-if="nextDate"
                class="date-next"
              >
                <i class="icon">
                  <SvgChevronRight />
                </i>
              </NuxtLink>
            </div>
          </div>
        </div>
        <Teaser v-if="showOdds">
          <Odds :odds="currentDraw.data.draw.draws[0].odds" />
        </Teaser>
        <div class="options" v-if="currentDraw">
          <button
            class="btn-primary"
            type="button"
            @click="showOdds = !showOdds"
            :class="{ active: showOdds }"
          >
            <i class="icon">
              <SvgChevronRight />
            </i>
            <div>Gewinne</div>
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/vars.scss";
@import "~/assets/css/main.scss";

.lottery-result {
  background: #fff;
  @include radius;
  overflow: hidden;
  @include box_shadow;
  margin: 0 0 2em;
  .padding {
    padding: 2em;
  }
  @media #{$media_xs} {
    margin: 0 -2em;
    border-radius: 0;
  }
  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  &.show {
    animation: pop 0.4s ease-out forwards;
  }
}

.lottery-logo {
  max-width: 20em;
  padding: 2em;
  margin: 0 auto;
  overflow: hidden;
  @media #{$media_sm_max} {
    max-width: 50%;
  }
  svg {
    width: 100%;
    height: 100%;
    max-height: 8em;
  }
}
.jackpot {
  background: #000;
  position: relative;
  .amount {
    margin: 0;
    color: $color_ci_bright;
    padding: 0.5em;
    text-align: center;
    @include font_size_xxxxxl;
    @include font_black;
    color: #fff;
    text-shadow: 0 0 5px rgba(#000, 0.3), 0 0 0.6em $color_ci_bright,
      0 0 3em $color_ci_bright, 0 0 5em $color_ci_dark;
  }
}

.options {
  text-align: center;
  margin: 3em 0;
  .btn-primary {
    background: $color_ci_bright;
    color: #000;
    padding: 0.7em 1em 0.5em;
    border: none;
    @include font_bold;
    @include font_size_m;
    @include radius(4em);
    line-height: 1em;
    cursor: pointer;
    background: #fff;
    text-transform: uppercase;
    transition: opacity 0.3s;
    box-shadow: 0 0.25em 0.5em rgba(#000, 0.2);
    display: inline-flex;
    gap: 0.5em;
    align-items: center;
    @include transition_fast;
    i.icon {
      transform: rotate(90deg);
    }
    &:hover {
      transform: scale(1.1);
    }
    &.active {
      i.icon {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
