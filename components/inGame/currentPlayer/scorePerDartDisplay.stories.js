import ScorePerDartDisplay from './scorePerDartDisplay.vue'

export default {
  component: ScorePerDartDisplay,
  title: 'InGame/ScorePerDartDisplay',
  exludeStories: /.*Data$/,
  decorators: [
    () => ({
      template:
        '<div style="width: fit-content; margin: 1em; padding: 2rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { ScorePerDartDisplay },
  props: Object.keys(argTypes),
  template: '<scorePerDartDisplay v-bind="$props"/>',
})
export const Default = Template.bind({})
Default.args = {
  scoresPerDart: [19, 29, 120],
}
