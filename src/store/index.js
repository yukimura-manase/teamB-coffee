import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coffeeList: [],
    login_user: null,
    //カート用の箱
    itemsIncart: []
  },
  mutations: {
<<<<<<< HEAD
    setLoginUser (state,user){
=======
    setLoginUser(state, user) {
>>>>>>> 92ada9fa2e0fa9e4265ef310882489b88e5b5fa1
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    fetchItems(state, { item }) {
      state.coffeeList.push(item)
      console.log(state.coffeeList)
    }
    // //intoCartのactionsを画面に反映
    // intoCart({ state }, itemdetails) {
    //   state.itemsIncart.push(itemdetails)
    // }

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
    fetchItems({ commit }) {
      firebase.firestore().collection(`/Items`)
        .get().then(snapshot => {
          snapshot.forEach(doc =>
            commit('fetchItems', {item: doc.data()}))
      })
    }
    // //選択したものをカート(DB)に入れる処理
    // intoCart({ commit }, itemdetails) {
    //   //カートが空だったら追加
    //   if (this.itemsIncart === '' ) {
    //     firebase.firestore().collection(`対象パス`).set({})
    //       .then((doc) => {
    //         commit("intoCart", { id: doc.id, itemdetails: itemdetails })
    //       })
    //   } else {
    //     //カートに既に何か入っていたら
    //     firebase.firestore().collection(`対象パス`).doc().update(itemdetails)
    //       .then(() => {
    //       commit("intoCart",{ id: doc.id, itemdetails: itemdetails } )
    //     })
    //   }
    // }
  },
  getters: {
    //coffeeListのidとparams.idが一致したものを返す
    getItem: (state) => (id) => state.coffeeList.find((product) => product.ID === id),
    uid: (state) => (state.loginuser ? state.login_user.uid : null) 
  }
})      