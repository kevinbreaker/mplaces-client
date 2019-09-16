<template>
  <GmapMap
    :center="$store.getters['CURRENT_LOCATION']"
    :zoom="17"
    @click="getInfo"
    map-type-id="terrain"
    class="map"
    ref="mapRef"
  >
    <GmapMarker
      v-for="(m, index) in userFavorites"
      :key="index"
      :icon="require('~/assets/heart.svg')"
      :ref="`markers-${index}`"
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
  middleware: 'auth',
  mixins: [gMapMixin],
  data: () => ({
    position: {
      lat: 10,
      lng: 100
    },
    favorites: [
      {
        name: 'mesa',
        position: {
          lat: -8.039719,
          lng: -34.92046749999997
        }
      }
    ],
    selectedComponent: 'search',
    selectedPlace: '',
    reviews: [],
    comment: '',
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
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setUserPosition)
    }
  },
  watch: {
    '$store.state.eventForRouter'() {
      this.getDirectionRoute()
    }
  },
  methods: {
    getInfo({ latLng, placeId, infoText, ta, xa, pixel }) {
      if (!latLng && !placeId) return
      const apoha = this.google.maps
      console.log(apoha)
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
          console.log(name, address, status)
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
          this.setMarker({
            latLng: {
              lat: location.lat(),
              lng: location.lng()
            }
          })
        }
      )
      this.position.lat = latLng.lat()
      this.position.lng = latLng.lng()
      this.$store.dispatch('SET_CURRENT_LOCATION', {
        lat: latLng.lat(),
        lng: latLng.lng()
      })
      this.infoContent = 'oi'
      this.infoPosition = this.position
    },
    clickMark(place) {
      if (!place) return
      this.position = place.position
      if (place.id) this.getPlaceInfo(place)
    },
    setUserPosition(position) {
      console.log('posição ', position)
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
