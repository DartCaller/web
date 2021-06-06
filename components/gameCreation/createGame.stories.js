import { action } from '@storybook/addon-actions'
import CreateGame from './createGame'

export default {
  component: CreateGame,
  title: 'CreateGame',
  exludeStories: /.*Data$/,
  args: {
    onInput: action('input'),
  },
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
        '<div style="margin: 1em; padding: 1rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { CreateGame },
  props: Object.keys(argTypes),
  template: '<createGame v-bind="$props" @input="onInput"/>',
})

export const Default = Template.bind({})
