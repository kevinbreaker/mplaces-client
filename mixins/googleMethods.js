import { gmapApi } from 'vue2-google-maps'
export default {
  computed: {
    google: gmapApi
  },
  methods: {
    setMarker({ latLng, title = 'Tes' }) {
      return new this.google.maps.Marker({
        position: latLng,
        map: this.$refs.mapRef.$mapObject,
        title
      })
    },
    setFavoritePlaceMarker({ latLng, title = 'Tes' }) {
      return new this.google.maps.Marker({
        position: latLng,
        icon: require('@/assets/heart.svg'),
        map: this.$refs.mapRef.$mapObject,
        title
      })
    },
    getDirectionRoute() {
      const directionsService = new this.google.maps.DirectionsService()
      const directionsDisplay = new this.google.maps.DirectionsRenderer()
      directionsDisplay.setMap(this.$refs.mapRef.$mapObject)

      directionsService.route(
        {
          origin: {
            lat: this.$store.state.user.origin.lat,
            lng: this.$store.state.user.origin.lng
          },
          destination: {
            lat: this.$store.state.user.destination.lat,
            lng: this.$store.state.user.destination.lng
          },
          travelMode: 'DRIVING'
        },
        (response, status) => {
          status === 'OK'
            ? directionsDisplay.setDirections(response)
            : console.log('Errror ', status)
        }
      )
    }
  }
}
