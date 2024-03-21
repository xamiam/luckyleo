<script lang="ts" setup>
// Get route and router
const route = useRoute();
const router = useRouter();

// Set refs for current date, timeout message and loading
const lottery = ref(route.params.lottery as string);

console.log(lottery.value);

// get the last 16 draw days / 8 weeks and check for valid dates
const lastDrawDays = () => {
  const drawDays = [];
  let day = new Date();
  while (drawDays.length < 16) {
    day.setDate(day.getDate() - 1);
    if (lottery.value == "eurojackpot" || lottery.value == "euromillions") {
      // check if the day is a tuesday or a friday
      if (day.getDay() === 2 || day.getDay() === 5) {
        // add the iso string of the day to the drawDays array
        drawDays.push(day.toISOString().split("T")[0]);
      }
    } else if (lottery.value == "powerball") {
      // check if the day is a monday, wednesday or saturday (shift +1 day because of US eastern time)
      if (day.getDay() === 2 || day.getDay() === 4 || day.getDay() === 0) {
        // add the iso string of the day to the drawDays array
        drawDays.push(day.toISOString().split("T")[0]);
      }
    }
  }
  return drawDays;
};
</script>

<template>
  <div>
    <Header />
    <div class="container">
      <div class="teasers">
        <Teaser class="lottery" v-for="drawday in lastDrawDays()">
          <NuxtLink :to="'/' + lottery + '/' + drawday">
            <div class="padding">
              <div class="lottery-logo">
                <SvgLogoEurojackpot v-if="lottery == 'eurojackpot'" />
                <SvgLogoEuromillions v-if="lottery == 'euromillions'" />
                <SvgLogoPowerball v-if="lottery == 'powerball'" />
              </div>
            </div>
            <div class="dates">
              <div class="date">
                <i class="icon">
                  <SvgCalendar />
                </i>
                {{ new Date(drawday).toLocaleDateString("de-DE") }}
                -
                {{
                  new Date(drawday).toLocaleDateString("de-DE", {
                    weekday: "long",
                  })
                }}
              </div>
            </div>
          </NuxtLink>
        </Teaser>
      </div>
    </div>
    <Footer />
  </div>
</template>
