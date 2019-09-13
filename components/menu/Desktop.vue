<template>
  <section class="aside-auth">
    <section class="aside-auth__logo">
      <k-input label="buscar"></k-input>
    </section>
    <section class="aside-auth__inputs">
      <template v-if="hasAccount">
        <k-input v-model="email" label="email" />
        <k-input v-model="password" type="password" label="senha" />
      </template>
      <template v-else>
        <k-input v-model="name" label="name" />
        <k-input v-model="email" label="email" />
        <k-input v-model="password" type="password" label="senha" />
      </template>
    </section>
    <section class="aside-auth__buttons">
      <template v-if="hasAccount">
        <k-button label="entrar" />
        <k-button
          label="registrar"
          :outlined="true"
          @click="hasAccount = !hasAccount"
        />
      </template>
      <template v-else>
        <k-button label="registrar" :disabled="isFormLoginValid" />
        <k-button
          label="login"
          :outlined="true"
          @click="hasAccount = !hasAccount"
        />
      </template>
    </section>
    <section class="aside-auth__socials"></section>
  </section>
</template>

<script>
export default {
  components: {
    KInput: () => import('~/components/Kinput'),
    KButton: () => import('~/components/KButton')
  },
  data: () => ({
    hasAccount: true,
    email: '',
    name: '',
    password: ''
  }),
  computed: {
    isFormLoginValid() {
      return true
    }
  }
}
</script>
<style lang="stylus" scoped>
img
  user-select none
  user-drag none
  -webkit-user-drag none

.aside-auth
  // width 30vw
  // min-width 300px
  // max-width 400px
  background red
  display grid
  grid-template-rows repeat(3, 2fr) 1fr
  height 100%

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
