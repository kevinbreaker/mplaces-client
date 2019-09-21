<template>
  <div class="dialog">
    <section class="dialog__box">
      <header class="dialog__box__header">
        <h2 class="dialog__box__header--title">Olá, {{ profile.name }}!</h2>
        <div
          role="button"
          class="dialog__box__header--close"
          @click="$store.dispatch('TOGGLE_DIALOG_PROFILE')"
        >
          <img
            :src="require('~/assets/close-circle.svg')"
            alt=""
            width="40px"
          />
        </div>
      </header>
      <main class="dialog__box__main">
        <section class="dialog__box__main__image">
          <section class="dialog__box__main__image--container">
            <img
              :src="catImageProfile"
              loading="lazy"
              class="dialog__box__main__image--catavar"
              alt=""
            />
            <div :class="loading ? 'loading-image' : ''"></div>
          </section>
          <k-button
            :outlined="true"
            :disabled="loading"
            width="180px"
            label="alterar imagem"
            @click="nextImageId"
          />
        </section>
        <section class="dialog__box__main__labels">
          <k-input v-model="name" label="Alterar nome" />
          <k-input
            v-model="newPassowrd"
            type="password"
            label="Alterar senha"
          />
          <k-input
            v-model="confirmPassword"
            type="password"
            label="confirmar senha"
          />
        </section>
      </main>
      <k-button
        :disabled="!validPassword"
        label="salvar alterações"
        @click="saveChanges"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    KInput: () => import('~/components/Kinput'),
    KButton: () => import('~/components/KButton')
  },
  data: () => ({
    imageId: 1,
    name: '',
    newPassowrd: '',
    confirmPassword: '',
    loading: false
  }),
  computed: {
    ...mapGetters({
      profile: 'user/USER_PROFILE',
      favorites: 'user/USER_FAVORITES',
      reviews: 'user/USER_REVIEWS'
    }),
    wannaChangePassword() {
      return this.newPassowrd.length > 0 || this.confirmPassword.length > 0
    },
    validPassword() {
      return this.wannaChangePassword
        ? this.newPassowrd.length > 4 &&
            this.newPassowrd === this.confirmPassword
        : true
    },
    catImageProfile() {
      return `http://lorempixel.com/output/cats-q-c-640-480-${this.imageId}.jpg`
    }
  },
  mounted() {
    this.name = this.profile.name
  },
  methods: {
    nextImageId() {
      this.loading = true
      this.imageId === 10 ? (this.imageId = 1) : (this.imageId += 1)
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    saveChanges() {
      this.$axios
        .put('/user', {
          name: this.name,
          passowrd: this.newPassowrd,
          picture: this.catImageProfile
        })
        .then(({ data: { name, picture } }) => {
          this.$store.dispatch('user/UPDATE_PROFILE', { name, picture })
          this.$toast.success(`Perfil alterado com sucesso, ${name}!`, {
            duration: 4000
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading-image
  top 0
  width 180px
  height 135px
  position absolute
  display flex
  align-items center
  justify-content center
  background-color #9c27b08c

  &::before
    content ''
    display inline-block
    position relative
    width 50px
    height 50px
    background white
    animation loading 1s linear infinite

@keyframes loading
  to
    transform rotate(360deg)

.dialog
  height 100vh
  width 100vw
  background #0000009b
  position absolute
  z-index 10
  display flex
  align-items center
  justify-content center

  &__box
    border-radius 10px
    background #404040
    width 600px
    height 350px
    display flex
    justify-content center
    align-items center
    flex-direction column

    &__header
      display flex
      justify-content center
      align-items center
      color white
      font-size 1.4em
      width 100%
      padding-bottom 20px

      &--title
        margin-left 10%
        max-width 390px

      &--close
        margin-left 40px

        &:hover
          border-radius 50%
          box-shadow 0 0 6px 1px #fa6666
          transition all 0.4s
          transform scale(1.2)

    &__main
      display flex
      width 100%
      align-items center
      justify-content space-evenly

      &__image
        display flex
        flex-direction column
        align-items center
        justify-content center

        &--container
          position relative

        &--catavar
          width 180px
          border-radius 4%

      &__labels
        display flex
        flex-direction column
        align-items center
        justify-content center
</style>
