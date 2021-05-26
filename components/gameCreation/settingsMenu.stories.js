import { action } from '@storybook/addon-actions'
import SettingsMenu from './settingsMenu.vue'

export default {
  component: SettingsMenu,
  title: 'SettingsMenu',
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
        '<div style="margin: 3em; padding: 2rem; border-radius: 1rem; background-color: #303030"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { SettingsMenu },
  props: Object.keys(argTypes),
  template: '<settingsMenu v-bind="$props" @input="onInput"/>',
})

export const Default = Template.bind({})
Default.args = {
  onInput: action('input'),
}
