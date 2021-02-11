<template>
  <table>
    <thead>
      <tr>
        <th v-for="(player, h) in players" :key="h" class="colored">
          {{ player }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in scores" :key="i">
        <td v-for="(score, j) in row" :key="j">
          {{ score }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ScoreTable',
  props: {
    players: {
      required: true,
      type: Array,
    },
    scores: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  text-align: center;
  border: 0;
  border-collapse: separate;
  border-spacing: 0 5px;

  thead * {
    border-bottom: 2px solid white;
  }

  tr {
    height: 30px;
  }

  tr:nth-child(even) {
    background-color: $lightgrey;

    td:first-child {
      border-radius: 5px 0 0 5px;
    }

    td:last-child {
      border-radius: 0 5px 5px 0;
    }
  }
}
</style>
