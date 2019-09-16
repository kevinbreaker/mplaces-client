<template>
  <div class="dialog">
    <section class="dialog__box">
      <header class="dialog__box__header">
        <h2 class="dialog__box__header--title">Escolha seu destino</h2>
        <div
          @click="$store.dispatch('TOGGLE_DIALOG_ROUTER')"
          role="button"
          class="dialog__box__header--close"
        >
          <img
            width="40px"
            :src="require('~/assets/close-circle.svg')"
            alt=""
          />
        </div>
      </header>
      <k-search labelName="Local de partida" @placeChanged="started" />
      <k-search labelName="Local de destino" @placeChanged="destination" />
      <k-button @click="$store.dispatch('GET_ROUTER')" label="Buscar rota" />
    </section>
  </div>
</template>

<script>
export default {
  components: {
    KSearch: () => import('~/components/KSearch'),
    KButton: () => import('~/components/KButton')
  },
  methods: {
    started(placeOrigin) {
      const {
        name,
        place_id: placeId,
        formatted_address: address,
        geometry: { location }
      } = placeOrigin

      this.$store.dispatch('user/SET_ORIGIN_ROUTE', {
        name,
        placeId,
        address,
        lat: location.lat(),
        lng: location.lng()
      })
    },
    destination(placeDestination) {
      const {
        name,
        place_id: placeId,
        formatted_address: address,
        geometry: { location }
      } = placeDestination

      this.$store.dispatch('user/SET_DESTINATION_ROUTE', {
        name,
        placeId,
        address,
        lat: location.lat(),
        lng: location.lng()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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

      &--close
        margin-left 40px

        &:hover
          transition all 0.4s
          transform scale(1.3)
</style>
