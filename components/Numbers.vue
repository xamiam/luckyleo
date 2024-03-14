<template>
  <div class="numbers" :class="size">
    <div class="number" v-for="number in numbers">
      <div class="ball">
        <div class="front">
          <em>
            {{ number }}
          </em>
        </div>
      </div>
    </div>
    <div class="number number-add" v-for="number in additionalNumbers">
      <div class="ball">
        <div class="front">
          <em>
            {{ number }}
          </em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    numbers: {
      type: Array,
      required: true,
    },
    additionalNumbers: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      default: "small",
    },
  },
  setup(props) {
    const data = ref(null);
    return { data };
  },
};
</script>

<style lang="scss">
@import "~/assets/css/main.scss";

.numbers {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.75em 0;
  background: linear-gradient(0deg, #ccc 25%, #fff 100%);
  gap: 0.2em;

  font-size: 70px;
  @media #{$media_sm_max} {
    font-size: 55px;
  }
  @media #{$media_xs} {
    font-size: 40px;
  }

  .number {
    position: relative;

    @include transition_fast;
    body:not(.touch) &:hover {
      transform: scale(1.3);
      cursor: default;
      z-index: 2;
    }
    @keyframes rollIn {
      0% {
        transform: scale(0) translateY(-50%);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .ball {
      font-size: 0.5em;
      transform: scale(0);
      border-radius: 100%;
      width: 2em;
      height: 2em;
      background: #fff;
      position: relative;
      font-weight: bold;
      background: radial-gradient(
        circle at 50% 100%,
        #ccc 30%,
        #f5f5f5 50%,
        #f5f5f5 100%
      );
      z-index: 2;
      animation: rollIn 1s ease-out forwards;

      .front {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        position: relative;
      }

      @keyframes woosh {
        0% {
          transform: translate(-50%, -50%);
        }
        50% {
          transform: translate(-50%, 100%);
          opacity: 1;
        }
        51% {
          transform: translate(-50%, 100%);
          opacity: 0;
        }
        52% {
          transform: translate(-50%, -200%);
          opacity: 0;
        }
        53% {
          transform: translate(-50%, -200%);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%);
        }
      }

      em {
        @include font_bold;
        padding: 0em 0.1em 0 0;
        line-height: 1em;
        animation: woosh 1s ease-out forwards;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &::before {
        content: "";
        bottom: -7%;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        width: 80%;
        height: 20%;
        background: rgba(#000, 0.4);
        filter: blur(4px);
        border-radius: 100%;
        position: absolute;
        z-index: -1;
        mix-blend-mode: screen;
      }

      &::after {
        content: "";
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        height: 35%;
        background: rgba(#fff, 0.2);
        position: absolute;
        border-radius: 100%;
      }
    }
    @for $i from 0 through 20 {
      &:nth-child(#{$i + 1}) .ball,
      &:nth-child(#{$i + 1}) .ball em {
        animation-delay: 0.1s * $i;
      }
    }
  }
  .number-add {
    .ball {
      background: radial-gradient(
        circle at 50% 100%,
        #000 30%,
        #111 50%,
        #222 100%
      );
      color: #fff;
    }
  }
}
</style>
