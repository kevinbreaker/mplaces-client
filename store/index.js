export const state = () => ({
  isMobile: false
})

export const mutations = {
  DEVICE_IS_MOBILE(state, isMobile) {
    state.isMobile = isMobile
  }
}

export const actions = {
  VERIFY_DEVICE({ commit }, device) {
    commit('DEVICE_IS_MOBILE', device)
  }
}

export const getters = {}
