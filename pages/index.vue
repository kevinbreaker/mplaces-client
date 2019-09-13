<template>
  <main class="container"></main>
</template>

<script>
export default {
  layout({ store, req }) {
    const isMobile = req.headers['user-agent'].includes('Mobile')
    store.dispatch('VERIFY_DEVICE', isMobile)

    return isMobile ? 'mobile' : 'default'
  }
}
</script>

<style lang="stylus">
.container
  width 100%
  height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
  background-color #35495e
  background-image url('../assets/Rectangle.jpg')
  background-repeat no-repeat
  background-position right
  background-size 100%

  @media (max-width: 500px)
    background-size cover

  // position absolute
  &::after
    content ''
    background #8F71FFCF
    width 100%
    height 100%
    position relative
    display inline-block
</style>
