import { action } from '@storybook/addon-actions'
import PlayerRow from './playerRow.vue'

export default {
  component: PlayerRow,
  title: 'PlayerRow',
  exludeStories: /.*Data$/,
  args: {
    onInput: action('input'),
    onDelete: action('delete'),
  },
  parameters: {
    backgrounds: { default: 'gray' },
  },
}

const Template = (args, { argTypes }) => ({
  components: { PlayerRow },
  props: Object.keys(argTypes),
  template: '<playerRow v-bind="$props" @input="onInput" @delete="onDelete"/>',
})
export const Default = Template.bind({})
Default.args = {
  player: {
    name: '',
  },
}
