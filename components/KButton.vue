<script>
export default {
  name: 'KButton',
  functional: true,
  render(h, { props, listeners, children, slots }) {
    return h(
      'button',
      {
        class: {
          outlined: !!props.outlined,
          filled: !props.outlined,
          dark: !!props.dark
        },
        attrs: {
          'aria-label': `Botão ${props.label}`,
          title: `Ação de ${props.label}`,
          disabled: !!props.disabled
        },
        on: {
          click: (event) => {
            listeners.click(event)
          }
        }
      },
      [h('span', {}, props.label)]
    )
  }
}
</script>
<style lang="stylus" scoped>
button
  border-radius 27px
  outline none
  padding 10px
  min-width 260px
  box-shadow 5px 4px 9px rgba(143, 113, 255, 0.37)
  color white
  margin 10px 0

  &:disabled
    background #b4b4e08c
    color #0000008f
    box-shadow none

  &:active
    background white
    color #8f71ff

  &:hover
    box-shadow 0px 0px 10px 5px rgba(143, 113, 255, 1)

  span
    text-transform capitalize
    font-weight bold
    font-size 16px

.outlined
  background transparent
  border 2px white solid
  color white

.filled
  border none
  background linear-gradient(180.67deg, #8F71FF 31.88%, #866EC7 96.58%)

.dark
  background linear-gradient(180.51deg, #1D1926 2.68%, rgba(17, 34, 68, 0.53) 97.79%)
  color white
</style>
