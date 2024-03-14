<template>
  <div class="teaser">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "~/assets/css/main.scss";

.teaser {
  background: #fff;
  margin: 2em 0;
  color: #000;
  position: relative;
  @include radius;
  background: #fff;
  text-align: center;
  overflow: hidden;
  @include box_shadow;

  @media #{$media_xs} {
    margin: 2em -2em 2em;
    border-radius: 0;
  }

  .padding {
    padding: 2em;
  }
  &.lottery {
    @include transition_fast;
    .lottery-logo {
      max-width: 20em;
      margin: 0 auto;
      overflow: hidden;
      padding: 0;
      @media #{$media_sm_max} {
        max-width: 80%;
      }
      svg {
        width: 100%;
        height: 100%;
        max-height: 10em;
      }
    }
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
