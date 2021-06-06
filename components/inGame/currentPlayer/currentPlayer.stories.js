import CurrentPlayer from './currentPlayer.vue'

export default {
  component: CurrentPlayer,
  title: 'InGame/CurrentPlayer',
  exludeStories: /.*Data$/,
  decorators: [
    () => ({
      template:
        '<div style="width: fit-content; height: 19rem; margin: 1em; padding: 2rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { CurrentPlayer },
  props: Object.keys(argTypes),
  template: '<currentPlayer v-bind="$props"/>',
})
export const Default = Template.bind({})
Default.args = {
  scoresPerDart: [19, 29, 120],
  currentPlayer: 'Bob',
  pointsRemaining: 140,
}
