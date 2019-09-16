<template>
  <div style="display: flex">
    <aside class="aside-menu">
      <Auth v-if="!$store.state.user.token" />
      <Menu v-else />
    </aside>
    <k-dialog v-if="$store.state.dialogRouter" />
    <nuxt />
  </div>
</template>
<script>
export default {
  components: {
    KDialog: () => import('~/components/KDialog'),
    Auth: () => import('~/components/auth/DesktopAuth'),
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
  width 400px
</style>
