import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBAVdtrs8mLAEToGSENgMOtClKjqCTe-NQ',
    libraries: 'places'
  }
})
