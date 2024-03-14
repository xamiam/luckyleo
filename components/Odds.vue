<template>
  <div class="odds">
    <table>
      <thead>
        <tr>
          <th>Gewinnklasse</th>
          <th>Gewinner</th>
          <th>Summe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="odd in odds" :key="odd.odd">
          <th>{{ odd.winningClass }}</th>
          <td>{{ odd.numberOfWinners }}</td>
          <td>{{ $formatPrice(odd.odd / 100) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    odds: {
      type: Array,
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

.odds {
  margin: 0;
  table {
    width: 100%;
    border-collapse: collapse;
    border: none;
    th,
    td {
      padding: 0.5em 0 0.5em 2em;
      border-bottom: 2px solid #000;
      text-align: left;
      overflow: hidden;
      background: #fff;
    }
    thead {
      tr {
        th {
          background: #000;
          color: #fff;
          padding: 0.75em 0 0.75em 2em;
        }
      }
    }
    tbody {
      tr:nth-child(even) {
        td,
        th {
          background: rgba(#000, 0.1);
        }
      }
      tr:last-child {
        th,
        td {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
