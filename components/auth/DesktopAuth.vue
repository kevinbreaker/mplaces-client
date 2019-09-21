<template>
  <section class="aside-auth">
    <section class="aside-auth__logo">
      <img src="~~/assets/logo-animated.svg" />
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
        <k-button label="entrar" @click="Login" />
        <k-button
          label="registrar"
          :outlined="true"
          @click="hasAccount = !hasAccount"
        />
      </template>
      <template v-else>
        <k-button label="registrar" @click="Register" />
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
import { mapActions } from 'vuex'
export default {
  name: 'AuthenticatePage',
  components: {
    KInput: () => import('@/components/Kinput'),
    KButton: () => import('@/components/KButton')
  },
  data: () => ({
    hasAccount: true,
    email: '',
    name: '',
    password: ''
  }),
  watch: {
    hasAccount() {
      this.name = ''
      this.email = ''
      this.password = ''
    }
  },
  methods: {
    ...mapActions({ setData: 'user/SET_USER_DATA' }),
    Login() {
      this.$axios
        .post('/login', { email: this.email, password: this.password })
        .then(({ data }) => {
          this.setData({ token: data.token, ...data.user })
          this.$toast.success('Seja bem-vindo!', { duration: 4000 })
          this.$axios.setToken(data.token, 'Bearer')
          this.$router.push({ name: 'app' })
        })
        .catch((er) => {
          this.$toast.error(
            'Erro ao fazer login, verifique se seus dados estão corretos.',
            { duration: 4000 }
          )
        })
    },
    Register() {
      this.$axios
        .post('/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.$toast.success('Conta criada com sucesso!', { duration: 4000 })
          this.hasAccount = !this.hasAccount
        })
        .catch((er) => {
          this.$toast.error('Erro ao fazer cadastro!', { duration: 4000 })
        })
        .finally(() => {
          this.name = ''
          this.email = ''
          this.password = ''
        })
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
  background #2D3B3C
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
