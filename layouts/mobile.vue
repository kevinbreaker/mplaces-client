<template>
  <div style="">
    <Auth />
    <nuxt />
  </div>
</template>
<script>
export default {
  components: {
    Auth: () => import('~/components/auth/mobile/Auth')
  }
}
</script>
<style lang="stylus">
html
  font-family 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

*, *:before, *:after
  box-sizing border-box
  margin 0
  padding 0
</style>
