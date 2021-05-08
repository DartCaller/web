import ActionsPure from './actionsPure.vue'

export default {
  component: ActionsPure,
  title: 'ActionsPure',
  exludeStories: /.*Data$/,
  decorators: [
    () => ({
      template:
        '<div style="width: fit-content; margin: 1em; padding: 1rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { ActionsPure },
  props: Object.keys(argTypes),
  template: '<actionsPure v-bind="$props"/>',
})
export const InGame = Template.bind({})
InGame.args = {
  legFinished: false,
}
export const Finished = Template.bind({})
Finished.args = {
  legFinished: true,
}
