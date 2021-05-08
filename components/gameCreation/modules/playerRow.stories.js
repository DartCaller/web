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
  argTypes: {
    onDelete: { table: { disable: true } },
    onInput: { table: { disable: true } },
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
    name: 'Test',
    games: 312,
  },
}
