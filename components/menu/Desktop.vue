<template>
  <section class="aside-menu">
    <section class="aside-menu__search">
      <k-search
        label-name="Buscar Local"
        style="width: 280px"
        @placeChanged="setPlace"
      />
      <k-button
        :outlined="true"
        label="Definir Rotas"
        @click="$store.dispatch('TOGGLE_DIALOG_ROUTER')"
      />
    </section>
    <section class="aside-menu__infos">
      <p>{{ details.name }}</p>
      <p>{{ details.phone }}</p>
      <p>{{ details.address }}</p>
      <a :href="details.website">{{ details.website }}</a>
      <k-rating :rating="details.rating || 0" />
      <k-button
        label="Favoritar local"
        :disabled="!details.name"
        @click="favorited"
      />
    </section>
    <section class="aside-menu__photos">
      <section class="aside-menu__photos__carrosel">
        <img
          v-for="(photo, index) in details.photosUrl"
          :key="index"
          :src="photo"
          :alt="`Imagens de ${details.name}`"
          loading="lazy"
          height="200px"
        />
      </section>
    </section>
    <section class="aside-menu__perfil">
      <section
        class="aside-menu__perfil__userdata"
        @click="$store.dispatch('TOGGLE_DIALOG_PROFILE')"
      >
        <img
          class="avatar"
          width="60px"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt=""
        />
        <p>{{ profile.name }}</p>
        <p>{{ profile.email }}</p>
      </section>
      <section class="aside-menu__perfil__actions">
        <div
          class="btn-logout"
          role="button"
          title="favoritos"
          aria-label="Favoritos"
          @click="getAllFavorites"
        >
          <img
            width="40px"
            :src="require('~/assets/heart.svg')"
            alt="Favoritos"
          />
          <span>favoritos</span>
        </div>
        <div
          class="btn-logout"
          role="button"
          title="Reviews"
          aria-label="Reviews"
        >
          <img width="40px" :src="require('~/assets/eye.svg')" alt="Reviews" />
          <span>reviews</span>
        </div>
        <div
          class="btn-logout"
          role="button"
          title="Sair"
          aria-label="Sair"
          @click="logout"
        >
          <img width="40px" :src="require('~/assets/power.svg')" alt="logout" />
          <span>Sair</span>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import gMapMixin from '@/mixins/googleMethods'
export default {
  components: {
    KRating: () => import('~/components/KRating'),
    KSearch: () => import('~/components/KSearch'),
    KButton: () => import('~/components/KButton')
  },
  mixins: [gMapMixin],
  data: () => ({
    currentPlace: {},
    places: [],
    center: [],
    markers: []
  }),
  computed: {
    ...mapGetters({
      favorites: 'user/USER_FAVORITES',
      profile: 'user/USER_PROFILE',
      location: 'CURRENT_LOCATION',
      details: 'CURRENT_LOCATION_DETAILS'
    })
  },

  mounted() {
    this.getAllFavorites()
  },
  methods: {
    getAllFavorites() {
      this.$axios.get('/favorites').then(({ data }) => {
        this.$store.dispatch('user/ADD_FAVORITE', data)
        this.$toast.success('Favoritos carregados com sucesso!', {
          duration: 4000
        })
      })
    },
    favorited() {
      this.$axios
        .post('/favorites', {
          placeId: this.details.placeId,
          placeName: this.details.name,
          lat: this.location.lat,
          lng: this.location.lng
        })
        .then(({ placeName }) =>
          this.$toast.success(`${placeName} Adicionado com sucesso!`, {
            duration: 4000
          })
        )
        .catch((er) =>
          this.$toast.error('Error ao tentar adcionar aos favoritos', {
            duration: 4000
          })
        )
    },
    setPlace(place) {
      if (!place) return
      const {
        icon,
        name,
        place_id: placeId,
        international_phone_number: phone,
        photos,
        website,
        formatted_address: address,
        rating,
        vicinity,
        geometry: { location }
      } = place

      const photosUrl = photos ? photos.map((photo) => photo.getUrl()) : []
      this.currentPlace.lat = location.lat()
      this.currentPlace.lng = location.lng()
      this.$store.dispatch('SET_CURRENT_LOCATION', {
        name,
        icon,
        placeId,
        phone,
        photosUrl,
        website,
        address,
        rating,
        vicinity,
        lat: location.lat(),
        lng: location.lng()
      })
    },
    logout() {
      this.$store.dispatch('LOGOUT')
      this.$store.dispatch('user/LOGOUT')
      this.$router.replace({ name: 'index' })
      sessionStorage.clear()
    }
  }
}
</script>
<style lang="stylus" scoped>
.avatar
  border-radius 50%

img
  user-select none
  user-drag none
  -webkit-user-drag none

.aside-menu
  background #212121
  display grid
  grid-template-rows 1fr repeat(2, 2fr) 1fr
  height 100vh
  overflow-x hidden
  overflow-y auto

  &__search
    display flex
    flex-direction column
    justify-content space-evenly
    align-items center

  &__infos
    display flex
    flex-direction column
    justify-content center
    align-items center

    p
      color white
      max-width 360px
      text-align center
      padding 2px
      font-size 1.2em

    a
      color navajowhite

  &__photos
    display flex
    flex-direction column
    justify-content center
    align-items center

    &__carrosel
      max-width 340px
      display flex
      flex-direction row
      overflow-x auto

      img
        margin 0 5px

  &__perfil
    box-shadow 0px -7px 17px 0px #9C27B0
    background linear-gradient(180.67deg, #8F71FF 31.88%, #866EC7 96.58%)
    display flex
    flex-direction row
    justify-content space-between
    align-items center

    &__userdata
      display flex
      flex-direction column
      justify-content center
      align-items center
      width 40%
      height 100%

      p
        font-weight bold
        font-size 1.1em
        color white
        padding-top 5px

    &__actions
      display grid
      grid-template-rows repeat(2, 80px)
      grid-template-columns repeat(2, 80px)
      gap 5px
      width 50%
      height 100%

.btn-logout
  display flex
  flex-direction column
  justify-content center
  align-items center
  cursor pointer

  span
    font-weight 600
    color white
    cursor pointer
</style>
