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
      // console.log(state.toppings)
    },
    //idはカートのidを識別するためのもの
    // confirmOrder(state, { id, cart }) {
    //   cart.id = id
    //   state.itemsIncart = cart
    //   console.log(cart.id)
    //   console.log(state.itemsIncart)
    // },
    intoCart(state, itemdetails) {
      state.itemsIncart.push(itemdetails)
      console.log('intoCart完了！');
      console.log(state.itemsIncart);
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
    //注文確認画面にカートの中身を表示
    // confirmOrder({ commit }) {
    //   this.state.itemsIncart = []
    //   firebase.firestore().collection('/cartsample').get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc =>
    //         commit('confirmOrder', { id: doc.id, cart: doc.data() }))
    //   })
    // },

  },
  getters: {
    // coffeeListのidとparams.idが一致したものを返す
    getItem: (state) => (id) => state.coffeeList.find((item) => item.ID === id),
    uid: (state) => (state.loginuser ? state.login_user.uid : null),
    cartList: (state) => state.itemsIncart
  }
})      