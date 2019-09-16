export const state = () => ({
  isMobile: false,
  dialogRouter: false,
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
  ACTIVATE_EVENT(state) {
    state.eventForRouter = !state.eventForRouter
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
  GET_ROUTER({ commit }) {
    commit('TOGGLE_DIALOG_ROUTER')
    commit('ACTIVATE_EVENT')
  }
}

export const getters = {
  CURRENT_LOCATION: ({ location: { lat, lng } }) => ({ lat, lng }),
  CURRENT_LOCATION_DETAILS: ({ location: { details } }) => ({ ...details })
}
