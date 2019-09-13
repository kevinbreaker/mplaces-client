<template>
  <section class="aside">
    <section class="aside__logo">
      <!-- <img src="~~/assets/logo-animated.svg" /> -->
      Fazer Login
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
  </section>
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
  width 100vw
  background #2D3B3C
  display grid
  position absolute
  bottom 0
  z-index 2
  height 60vh
  border-radius 50px 50px 0 0

  // border-radius 15% 15% 0 0
  &__logo
    display flex
    flex-direction column
    justify-content center
    align-items center
    color white
    font-weight bold
    font-size 1.4em
    padding-top 10px

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
