<script>
export default {
  name: 'KInput',
  functional: true,
  props: {
    value: {
      type: String,
      required: true,
      default: () => 'Report error'
    },
    label: {
      type: String,
      required: true,
      default: () => 'Report error'
    },
    type: {
      type: String,
      default: () => 'Text'
    },
    key: {
      type: [Number, String],
      default: () => 1
    }
  },
  render(h, { props, listeners, children, slots }) {
    return h(
      'label',
      {
        attrs: {
          key: props.key,
          'aria-label': `Campo de ${props.label}`,
          title: `Preencha este campo com ${props.label}`
        }
      },
      [
        h('input', {
          domProps: {
            value: props.value
          },
          on: {
            input: (event) => {
              listeners.input(event.target.value)
            }
          },
          attrs: {
            required: true,
            type: props.type
          }
        }),
        h('img', {
          style: {
            display: props.type === 'password' ? 'block' : 'none'
          },
          on: {
            click() {
              console.log('click eye', listeners.seePassword)
              listeners.seePassword = !listeners.seePassword
            }
          },
          attrs: {
            'aria-label': listeners.seePassword
              ? 'Mostrar sua senhar'
              : 'Esconder sua senha',
            src: listeners.seePassword
              ? require('~/assets/eye-off.svg')
              : require('~/assets/eye.svg')
          }
        }),
        h('span', {}, props.label)
      ]
    )
  }
}
</script>
<style lang="stylus" scoped>
img
  width 30px
  height 30px
  position absolute
  bottom 6px
  right 18px
  z-index 1

label
  position relative
  display block
  max-width 260px
  width 100%
  margin 12px 0

  span
    color #000
    display inline-block
    text-transform capitalize
    font-weight 350
    position absolute
    margin-left 10px
    transition all 0.8s
    left 0
    top 10px

  input
    border none
    border-radius 8px
    font-size 18px
    padding 10px 10px 10px 5px
    display block
    max-width 260px
    height 40px
    width 100%
    outline none

    &[type='password']
      letter-spacing 4px
      font-size 1.4em

    &:focus
      transition all 0.3s
      border 2px #9c27b0 solid
      box-shadow 0 0 4px #9c279c, 0 0 6px #8f71ff

    &:focus ~ span, &:valid ~ span
      color #B7FBFF
      transition all 0.8s
      font-size 16px
      font-weight bold
      position absolute
      pointer-events none
      left 5px
      top -18px
</style>
