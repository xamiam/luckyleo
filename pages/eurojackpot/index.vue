<script lang="ts" setup>
// get the last 16 draw days / 8 weeks (friday and tuesday for eurojackpot)
const lastDrawDays = () => {
  const drawDays = [];
  let day = new Date();
  while (drawDays.length < 16) {
    day.setDate(day.getDate() - 1);
    // check if the day is a friday or a tuesday
    if (day.getDay() === 5 || day.getDay() === 2) {
      // add the iso string of the day to the drawDays array
      drawDays.push(day.toISOString().split("T")[0]);
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
          <NuxtLink :to="'/eurojackpot/' + drawday">
            <div class="padding">
              <div class="lottery-logo">
                <SvgLogoEurojackpot />
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
