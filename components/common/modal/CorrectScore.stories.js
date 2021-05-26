import PureCorrectScore from './PureCorrectScore.vue'

export default {
  component: PureCorrectScore,
  title: 'PureCorrectScore',
  exludeStories: /.*Data$/,
}

const Template = (args, { argTypes }) => ({
  components: { PureCorrectScore },
  props: Object.keys(argTypes),
  template: '<pureCorrectScore v-bind="$props"/>',
})
export const Default = Template.bind({})
Default.args = {
  playerNames: { 1: 'Bob', 2: 'Alice' },
  playerOrder: ['1', '2'],
  currentPlayer: '1',
  scores: {
    1: ['501', 'T20T19D12', 'T20T19D12'],
    2: ['501', 'T20T19D12', 'T20T19D12'],
  },
  gameID: '123',
}
