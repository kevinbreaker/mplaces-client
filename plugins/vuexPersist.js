import VuexPersist from 'vuex-persist'

export default ({ store }) => {
  new VuexPersist({
    key: 'mplaces',
    storage: window.sessionStorage
  }).plugin(store)
}
