import { action } from '@storybook/addon-actions'
import PlayerMenu from './playerMenu.vue'

export default {
  component: PlayerMenu,
  title: 'PlayerMenu',
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
        '<div style="margin: 3em; padding: 2rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { PlayerMenu },
  props: Object.keys(argTypes),
  template: '<playerMenu v-bind="$props" @input="onInput"/>',
})

export const Default = Template.bind({})
