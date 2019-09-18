export const state = () => ({
  token: '',
  name: '',
  email: '',
  picture: '',
  favorites: [],
  myReviews: [],
  origin: {},
  destination: {}
})

export const mutations = {
  COMMIT_USER_DATA(state, { token, name, email, favorites, picture }) {
    state.token = token
    state.name = name
    state.email = email
    state.picture = picture
    state.favorites = favorites
  },
  COMMIT_FAVORITES(state, data) {
    state.favorites = data
  },
  COMMIT_ORIGIN_ROUTE(state, data) {
    state.origin = data
  },
  COMMIT_DESTINATION_ROUTE(state, data) {
    state.destination = data
  },
  CLEAR_DATA(state) {
    state.token = ''
    state.name = ''
    state.email = ''
    state.favorites = []
    state.origin = {}
    state.destination = {}
  }
}

export const actions = {
  SET_USER_DATA({ commit }, data) {
    commit('COMMIT_USER_DATA', data)
  },
  ADD_FAVORITE({ commit }, data) {
    commit('COMMIT_FAVORITES', data)
  },
  SET_ORIGIN_ROUTE({ commit }, data) {
    commit('COMMIT_ORIGIN_ROUTE', data)
  },
  SET_DESTINATION_ROUTE({ commit }, data) {
    commit('COMMIT_DESTINATION_ROUTE', data)
  },
  LOGOUT({ commit }) {
    commit('CLEAR_DATA')
  }
}

export const getters = {
  USER_PROFILE: ({ name, email }) => ({ name, email }),
  USER_FAVORITES: ({ favorites }) => ({ ...favorites }),
  USER_REVIEWS: ({ myReviews }) => ({ ...myReviews }),
  GET_COORDS_FOR_ROUTE: ({ origin, destination }) => ({ origin, destination }),
  IS_AUTHENTICATED: ({ name, token }) => !!name && !!token
}
