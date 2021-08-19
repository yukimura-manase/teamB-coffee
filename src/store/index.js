import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)



export default new Vuex.Store({

  state: {
    //商品リスト
    coffeeList: [],
    // /トッピングリスト
    toppings: [],
    login_user: null,
    // 複数のカート情報が入る配列 => 商品情報が複数入る！
    //現在使ってるカート情報
    useCart: {},
    //履歴(ステータスが0以外のものが入ってる)購入ずみ
    historyCart: [],
  },

  mutations: {
    //ログイン
    setLoginUser(state, user) {
      state.login_user = user
    },
    //ログアウト
    deleteLoginUser(state) {
      state.login_user = null
    },
    //商品一覧
    fetchItems(state, { item }) {
      state.coffeeList.push(item)
      console.log(state.coffeeList)
    },
    //トッピングを取ってくる
    getTopping(state, { subItems }) {
      state.toppings.push(subItems)
      // console.log(state.toppings)
    },
    addCartItem(state, { id, cartItem }) {
      state.cartItem.id = id;
      // console.log(cartItem);
      state.cartList.push(cartItem);
      // console.log(state.cartList);
    },
    updateCart(state, { selectItem }) {
      state.useCart.Items.push(selectItem)
      console.log(state.useCart)
    },
    detailChangeCart(state, newCartItem) {
      state.cartList.push(newCartItem)
      console.log('detailChangeCart完了！');
      console.log(state.cartList);
    },
    useCart(state, { id, cartItem }) {
      state.useCart = cartItem;
      state.useCart.orderID = id;
      console.log(state.useCart);
    },
    historyCart(state, { id, cartItem }) {
      state.historyCart.id = id;
      state.historyCart.push(cartItem);
    },
  },
  
  actions: {
    //ログイン
    setLoginUser({ commit }, user) {
      console.log('setLoginUser動いているよ！！'),
        commit('setLoginUser', user)
    },
    //ログイン
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
    //商品リスト
    fetchItems({ commit }) {
      this.state.coffeeList = [] // 初期化
      //商品リストをfirestoreから持ってくる
      firebase.firestore().collection(`/Items`)
        .get().then(snapshot => {
          snapshot.forEach(doc =>
            commit('fetchItems', { item: doc.data() }))
        })
    },
    //トッピングを持ってくる
    getTopping({ commit }) {
      this.state.toppings = []
      firebase.firestore().collection(`/subItems`).get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit('getTopping', { subItems: doc.data() }))
        })
    },
    //ユーザーがログインしてたらカートに入れる処理
    addCartItem({ getters, commit, state }, selectItem) {
      if (getters.uid) {
        if (state.useCart == {}) {
          firebase.firestore().collection(`users/${getters.uid}/carts`)
            .add({
              Items: [],
              address: '',
              orderID: '',
              user: '',
              addressNumber: '',
              mail: '',
              orderDate: '',
              phoneNumber: '',
              status: 0,
            }).then(doc => {
              commit('useCart', { id: doc.id, cartItem: doc.data() })
            })
        } else {
          let usecartInfo = Object.assign({}, state.useCart)
          usecartInfo.Items = state.useCart.Items.slice()
          usecartInfo.Items.push(selectItem)
          // console.log(usecartInfo)
          // console.log(selectItem)
          firebase.firestore().collection(`users/${getters.uid}/carts`)
            .doc(usecartInfo.orderID).update(usecartInfo)
          commit('updateCart', { selectItem })
        }
      }
    },
    //カート情報とってくる(App.vue)
    //ログインしたらユーザー情報持ってくる
    fecthCartItem({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/carts`)
        .get().then(snapshot => {
          snapshot.forEach(doc => {
            //statusが0の場合、未購入の場合ショッピングカートに反映
            if (doc.data().status === 0) {
              commit('useCart', { id: doc.id, cartItem: doc.data() })
              //statusが0以外の場合、購入済みの場合履歴に反映
            } else if (doc.data().status !== 0) {
              commit('historyCart', { id: doc.id, cartItem: doc.data() });
            }
          })
        })
    },
  },

  getters: {
    //coffeeListのidとparams.idが一致したものを返す
    getItem: (state) => (id) => state.coffeeList.find((product) => product.ID === id),
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    cartItemList: (state) => state.cartList
  }
})