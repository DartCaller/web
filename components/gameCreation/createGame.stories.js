import CreateGame from './createGame'

export default {
  component: CreateGame,
  title: 'GameCreation/CreateGame',
  exludeStories: /.*Data$/,
  argTypes: {
    onInput: { table: { disable: true } },
  },
  parameters: {
    backgrounds: { default: 'white' },
    controls: { hideNoControlsWarning: true },
  },
  decorators: [
    () => ({
      template:
        '<div style="max-width: 76rem; max-height: 35rem; margin: 1em; padding: 1rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { CreateGame },
  props: Object.keys(argTypes),
  template: '<createGame v-bind="$props" @input="onInput"/>',
})

export const Default = Template.bind({})
