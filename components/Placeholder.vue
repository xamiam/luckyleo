<template>
  <div class="placeholder" title="This is only a placeholder">
    <label>{{ label }}</label>
    <slot />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    label: {
      type: String,
      required: true,
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

.placeholder {
  background: rgba(#000, 0.1);
  padding: 2em;
  margin: 1em 0;
  border-radius: 0.5em;
  color: #000;
  position: relative;

  label {
    position: absolute;
    top: 1em;
    right: 1em;
    display: block;
    margin: 0 0 1em;
    color: rgba(#000, 0.5);
    text-transform: uppercase;
    @include font_size_s;
    letter-spacing: 0.1em;
  }
}
</style>
