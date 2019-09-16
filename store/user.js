export const state = () => ({
  token: '',
  name: '',
  email: '',
  favorites: [],
  origin: {},
  destination: {}
})

export const mutations = {
  COMMIT_USER_DATA(state, { token, name, email, favorites }) {
    state.token = token
    state.name = name
    state.email = email
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
  }
}

export const getters = {
  USER_PROFILE: ({ name, email }) => ({ name, email }),
  USER_FAVORITES: ({ favorites }) => ({ ...favorites }),
  GET_COORDS_FOR_ROUTE: ({ origin, destination }) => ({ origin, destination })
}
