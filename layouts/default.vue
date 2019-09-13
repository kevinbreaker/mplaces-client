<template>
  <div style="display: flex">
    <aside class="aside-menu">
      <Auth v-if="$store.state.user.name" />
      <Menu v-else />
    </aside>
    <nuxt />
  </div>
</template>
<script>
export default {
  components: {
    Auth: () => import('~/components/auth/desktop/Auth'),
    Menu: () => import('~/components/menu/Desktop')
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

.aside-menu
  width 30vw
  min-width 320px
  max-width 400px
  // background #2D3B3C
  // display grid
</style>
