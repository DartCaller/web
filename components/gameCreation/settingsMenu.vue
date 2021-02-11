<template>
  <div>
    <h2>Settings</h2>
    <div class="row">
      <p>Game Mode</p>
      <vs-select v-model="gameMode" color="#14A76C" class="select">
        <vs-option
          v-for="mode in gameModeOptions"
          :key="mode"
          :label="mode"
          :value="mode"
        >
          {{ mode }}
        </vs-option>
      </vs-select>
    </div>
    <div v-for="item in Object.keys(switches)" :key="item" class="row">
      <p>{{ item }}</p>
      <vs-switch v-model="switches[item]" color="#14A76C">
        <template #off> Off </template>
        <template #on> On </template>
      </vs-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsMenu',
  data: () => ({
    gameMode: 501,
    gameModeOptions: [301, 501],
    switches: {
      'Double-In': false,
      'Double-Out': true,
      'Automatic Dart Score Recognition': true,
      'Checkout Recommendations': true,
    },
  }),
}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 15px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;

  .select {
    max-width: 80px;

    > * {
      min-height: 28px;
    }
  }
}
</style>

<style lang="scss">
.row {
  .select > *,
  .select input {
    min-height: 28px;
  }
}
</style>
