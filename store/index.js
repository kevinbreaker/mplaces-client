export const state = () => ({
  isMobile: false,
  dialogRouter: false,
  dialogProfile: false,
  eventForRouter: false,
  location: {
    lat: '',
    lng: '',
    details: {
      name: '',
      placeId: '',
      phone: '',
      photos: '',
      website: '',
      address: '',
      rating: '',
      vicinity: ''
    }
  }
})

export const mutations = {
  DEVICE_IS_MOBILE(state, isMobile) {
    state.isMobile = isMobile
  },
  MUTATE_LOCATION(state, { lat, lng, ...data }) {
    state.location.lat = lat
    state.location.lng = lng
    state.location.details = data
  },
  TOGGLE_DIALOG_ROUTER(state) {
    state.dialogRouter = !state.dialogRouter
  },
  TOGGLE_DIALOG_PROFILE(state) {
    state.dialogProfile = !state.dialogProfile
  },
  ACTIVATE_EVENT(state) {
    state.eventForRouter = !state.eventForRouter
  },
  CLEAR_DATA(state) {
    state.dialogRouter = false
    state.eventForRouter = false
    state.location = {
      lat: '',
      lng: '',
      details: {
        name: '',
        placeId: '',
        phone: '',
        photos: '',
        website: '',
        address: '',
        rating: '',
        vicinity: ''
      }
    }
  }
}

export const actions = {
  VERIFY_DEVICE({ commit }, device) {
    commit('DEVICE_IS_MOBILE', device)
  },
  SET_CURRENT_LOCATION({ commit }, data) {
    commit('MUTATE_LOCATION', data)
  },
  TOGGLE_DIALOG_ROUTER({ commit }) {
    commit('TOGGLE_DIALOG_ROUTER')
  },
  TOGGLE_DIALOG_PROFILE({ commit }) {
    commit('TOGGLE_DIALOG_PROFILE')
  },
  GET_ROUTER({ commit }) {
    commit('TOGGLE_DIALOG_ROUTER')
    commit('ACTIVATE_EVENT')
  },
  LOGOUT({ commit }) {
    commit('CLEAR_DATA')
  }
}

export const getters = {
  CURRENT_LOCATION: ({ location: { lat, lng } }) => ({ lat, lng }),
  CURRENT_LOCATION_DETAILS: ({ location: { details } }) => ({ ...details }),
  DIALOG_ROUTER: ({ dialogRouter }) => !!dialogRouter,
  DIALOG_PROFILE: ({ dialogProfile }) => !!dialogProfile
}
