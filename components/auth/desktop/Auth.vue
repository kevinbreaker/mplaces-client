<template>
  <aside class="aside">
    <section class="aside__logo">
      <img src="~~/assets/logo-animated.svg" />
    </section>
    <section class="aside__inputs">
      <k-input v-model="texto" label="email" />
      <k-input v-model="outro" type="password" label="senha" />
    </section>
    <section class="aside__buttons">
      <k-button label="entrar" />
      <k-button label="register" :outlined="true" />
    </section>
    <section class="aside__socials"></section>
  </aside>
</template>

<script>
export default {
  data: () => ({
    texto: '',
    outro: ''
  }),
  components: {
    KInput: () => import('~/components/Kinput'),
    KButton: () => import('~/components/KButton')
  }
}
</script>
<style lang="stylus" scoped>
img
  user-select none
  user-drag none
  -webkit-user-drag none

.aside
  width 30vw
  min-width 300px
  max-width 400px
  background #2D3B3C
  display grid

  &__logo
    display flex
    flex-direction column
    justify-content center
    align-items center

  &__inputs
    display flex
    flex-direction column
    justify-content center
    align-items center

    label
      margin 5px 0

  &__buttons
    display flex
    flex-direction column
    justify-content center
    align-items center

    button
      margin 5px 0
</style>
