<template>
  <div class="landing_page__container">
    <div class="main_header">
      <h1>DartCaller</h1>
      <h2>
        <vue-typer :text="subheader" erase-style="backspace" erase-delay="50" />
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data: () => ({
    subheader: [
      'Automatic Dart Score Detection',
      'Play Darts and focus on the game',
      'Play Darts over the internet with friends',
    ],
  }),
}
</script>

<style lang="scss" scoped>
.landing_page__container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .main_header {
    margin-top: -4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--grey), 1);
    border-radius: 10px;
    padding: 2rem 4rem;
    box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.6);
    min-width: 45rem;

    h1 {
      margin-bottom: 2rem;
      font-size: 96px;
    }

    h2 {
      font-size: 32px;

      &::v-deep * {
        color: white;

        .custom.caret {
          background-color: white;
        }
      }
    }
  }
}
</style>
