import { action } from '@storybook/addon-actions'
import TheNavBarPure from './TheNavBarPure'

export default {
  component: TheNavBarPure,
  excludeStories: /.*Data$/,
  title: 'TheNavBarPure',
}

const Template = (args, { argTypes }) => ({
  components: { TheNavBarPure },
  props: Object.keys(argTypes),
  template: '<TheNavBarPure v-bind="$props" />',
})
export const Default = Template.bind({})
Default.args = {
  loggedIn: false,
  itemsLoggedIn: [
    { label: 'Game', href: 'create-game' },
    { label: 'Profile', clickHandler: action('ProfileClicked') },
    { label: 'Settings', clickHandler: action('SettingsClicked') },
    { label: 'Logout', clickHandler: action('LogoutClicked') },
  ],
  items: [{ label: 'Login', clickHandler: () => {} }],
}

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  ...Default.args,
  loggedIn: true,
}
