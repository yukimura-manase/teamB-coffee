import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coffeeList: [],
    login_user: null,
    //カート用の箱
    itemsIncart: [],
    toppings: []
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    fetchItems(state, { item }) {
      state.coffeeList.push(item)
    },
    getTopping(state, { subItems }) {
      state.toppings.push(subItems)
      console.log(state.toppings)
    }

  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    login() {
      //Googleプロジェクトオブジェクトのインスタンスの作成
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      //ログインページ（google）のにリダイレクトしてログインする為のコード
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      firebase.auth().signOut()
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    //商品リストをfirestoreから持ってくる
    fetchItems({ commit }) {
      this.state.coffeeList = []
      firebase.firestore().collection(`/Items`)
        .get().then(snapshot => {
          snapshot.forEach(doc =>
            commit('fetchItems', { item: doc.data()}))
      })
    },
    //トッピングを持ってくる
    getTopping({ commit }) {
      this.state.toppings = []
      firebase.firestore().collection(`/subItems`).get()
        .then(snapshot => {
          snapshot.forEach(doc =>
          commit('getTopping', { subItems: doc.data()}))
      })
    },
    // confirmOrder({commit, getters}) {
    //   if (getters.uid) {
    //     firebase.firestore().collection(`/DBcart`).get()
    //       .then(snapshot => {
    //         snapshot.forEach(cart =>
    //           commit('confirmOrder', { cart : cart.data() }))
    //     })
      // }
    // }
  },
  getters: {
    // coffeeListのidとparams.idが一致したものを返す
    getItem: (state) => (id) => state.coffeeList.find((item) => item.ID === id),
    uid: (state) => (state.loginuser ? state.login_user.uid : null),
  }
})      