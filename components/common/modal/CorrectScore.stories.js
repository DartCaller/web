import CorrectScorePure from './CorrectScorePure.vue'

export default {
  component: CorrectScorePure,
  title: 'InGame/CorrectScorePure',
  exludeStories: /.*Data$/,
  decorators: [
    () => ({
      template: '<div style="max-width: 40rem; margin: 1em;"><story/></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  components: { CorrectScorePure },
  props: Object.keys(argTypes),
  template: '<correctScorePure v-bind="$props"/>',
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
