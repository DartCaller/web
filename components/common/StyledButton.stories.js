import { action } from '@storybook/addon-actions'
import StyledButton from './StyledButton.vue'

export default {
  component: StyledButton,
  excludeStories: /.*Data$/,
  title: 'Common/StyledButton',
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['check', 'history', 'pencil', 'plus'],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { StyledButton },
  props: Object.keys(argTypes),
  template:
    '<StyledButton v-bind="$props" @click="onClick">{{label}}</StyledButton>',
})
export const Default = Template.bind({})
Default.args = {
  label: 'Submit',
  onClick: action('clicked'),
}

export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  primary: true,
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  loading: true,
}

export const Icon = Template.bind({})
Icon.args = {
  ...Default.args,
  icon: 'history',
  smallText: true,
}
