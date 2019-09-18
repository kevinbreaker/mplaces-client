<template>
  <GmapMap
    ref="mapRef"
    :center="$store.getters['CURRENT_LOCATION']"
    :zoom="17"
    map-type-id="terrain"
    class="map"
    @click="getInfo"
  >
    <GmapMarker
      v-for="(m, index) in userFavorites"
      :key="index"
      :ref="`markers-${index}`"
      :icon="require('~/assets/heart.svg')"
      :position="{ lat: +m.lat, lng: +m.lng }"
      :clickable="true"
      :draggable="true"
    />
  </GmapMap>
</template>

<script>
import { mapGetters } from 'vuex'
import gMapMixin from '@/mixins/googleMethods'
export default {
  // middleware: 'auth',
  mixins: [gMapMixin],
  data: () => ({
    reviews: [],
    infoPosition: null,
    infoContent: null,
    infoOpened: false,
    infoCurrentKey: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    }
  }),
  computed: {
    ...mapGetters({
      location: 'CURRENT_LOCATION',
      userFavorites: 'user/USER_FAVORITES'
    })
  },
  watch: {
    '$store.state.eventForRouter'() {
      this.getDirectionRoute()
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setUserPosition)
    }
  },
  methods: {
    getInfo({ latLng, placeId, infoText, ta, xa, pixel }) {
      if (!latLng && !placeId) return
      const map = this.$refs.mapRef.$mapObject
      const service = new this.google.maps.places.PlacesService(map)
      service.getDetails(
        {
          placeId,
          fields: [
            'name',
            'rating',
            'photos',
            'geometry',
            'icon',
            'vicinity',
            'formatted_address',
            'formatted_phone_number',
            'website'
          ]
        },
        (
          {
            name,
            rating,
            photos,
            geometry: { location },
            icon,
            vicinity,
            formatted_address: address,
            formatted_phone_number: phone,
            website
          },
          status
        ) => {
          const photosUrl = photos ? photos.map((photo) => photo.getUrl()) : []
          this.$store.dispatch('SET_CURRENT_LOCATION', {
            lat: location.lat(),
            lng: location.lng(),
            placeId,
            name,
            rating,
            vicinity,
            website,
            photosUrl,
            address,
            phone
          })
          // this.setMarker({
          //   latLng: {
          //     lat: location.lat(),
          //     lng: location.lng()
          //   }
          // })
        }
      )
      this.$store.dispatch('SET_CURRENT_LOCATION', {
        lat: latLng.lat(),
        lng: latLng.lng()
      })
      this.infoContent = 'test content'
      this.infoPosition = {
        lat: latLng.lat(),
        lng: latLng.lng()
      }
    },
    clickMark(place) {
      if (!place) return
      if (place.id) this.getPlaceInfo(place)
    },
    setUserPosition(position) {
      this.$store.dispatch('SET_CURRENT_LOCATION', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.map
  width calc(100vw - 400px)
  height 100vh
</style>
