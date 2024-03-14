<template>
  <header>
    <Head>
      <Title>🦁 Lucky Leo</Title>
      <Meta name="description" content="Die besten Lotterien der Welt!" />
    </Head>
    <div class="container">
      <NuxtLink to="/" class="logo">
        <SvgLuckyleo />
      </NuxtLink>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/eurojackpot">Eurojackpot</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/css/main.scss";
header {
  margin: 0 0 1em;
  background: $color_yellow;
  padding: 1em 0;
  .logo {
    display: block;
    margin: 0 -0.25em;
    margin: 0 auto;
    width: 80%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  nav {
    display: flex;
    gap: 1em;
    margin: 1em 0;
    display: none;
    a {
      display: block;
      color: #fff;
      text-decoration: none;
      &.router-link-active {
        color: #000;
      }
    }
  }
}
</style>
