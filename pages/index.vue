<template>
  <div>
    <Header />
    <div class="container">
      <Teaser>
        <div class="padding">
          <h1>Willkommen bei Lucky Leo!</h1>
          <p>Mit Leo spielen Sie die besten Lotterien der Welt.</p>
        </div>
      </Teaser>
      <Teaser class="lottery">
        <NuxtLink to="/eurojackpot/">
          <div class="padding">
            <div class="lottery-logo">
              <SvgLogoEurojackpot />
            </div>
          </div>
          <div class="dates">
            <div class="date">
              <i class="icon">
                <SvgChevronRight />
              </i>
              alle Ergebnisse
            </div>
          </div>
        </NuxtLink>
      </Teaser>
    </div>
    <Footer />
  </div>
</template>
