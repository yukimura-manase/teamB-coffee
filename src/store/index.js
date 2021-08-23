import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)



export default new Vuex.Store({

  state: {
    
    coffeeList: [], //商品(コーヒー)のリスト
   
    toppings: [],  // トッピングリスト

    login_user: null,
    
    
    useCart: {}, // 現在使ってるカート情報 => status0
    
    historyCart: [], //購入ずみのカートたち => status0以外
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
    //DBから取ってきた商品情報をセットする！ // fetch => 取って参る！
    fetchItems(state, { item }) {
      state.coffeeList.push(item) // itemは1つの商品情報であり、オブジェクト
      //  console.log('コーヒー一覧')
      //  console.log(state.coffeeList)
    },
    //トッピングを取ってくる
    getTopping(state, { subItems }) { // subItemsを分割代入している！
      state.toppings.push(subItems)
      // console.log('トッピング一覧')
      // console.log(state.toppings)
    },

    // カートを追加する処理
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
      console.log('useCart')
      console.log(state.useCart);
    },

    historyCart(state, { id, cartItem }) {
      state.historyCart.id = id;
      state.historyCart.push(cartItem);
    },

    deleteFromCart(state, cart) {
      state.useCart.Items = cart.concat()
    },

    addCustomerInfo(state, customerInfo) {
      state.historyCart.push(customerInfo)
      state.useCart = {}
    }
  },


  actions: {
    //ログインユーザーの情報をセットする！
    setLoginUser({ commit }, user) {
        commit('setLoginUser', user)
    },
    //ログイン時のリダイレクト処理を呼び出す。
    login() {
      //Googleプロジェクトオブジェクトのインスタンスの作成
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      //ログインページ（google）のにリダイレクトしてログインする為のコード
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    //ログアウト
    logout() {
      firebase.auth().signOut()
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },

    //商品データをデータベースから取ってくる処理 => Home.vueで起動！
    fetchItems({ commit }) {
      this.state.coffeeList = [] // 初期化
      
      firebase.firestore().collection(`/Items`) //商品リストをfirestoreから持ってくる！
        .get()
        
        .then(snapshot => {
          console.log('snapshotの中身')
          console.log(snapshot)

          snapshot.forEach(doc => // 18回回転しているから改善したほうがいいかもしれない！
            commit('fetchItems', { item: doc.data() }) // itemキーにdoc.data()をセットする。 // 18回回転しているから改善したほうがいいかもしれない！
            )
        })
    },

    //トッピングを持ってくる
    getTopping({ commit }) {
      this.state.toppings = [] // 初期化
      firebase.firestore().collection(`/subItems`).get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit('getTopping', { subItems: doc.data() }))
        })
    },

    //ユーザーがログインしてたらカートに入れる処理
    addCartItem({ getters, commit, state }, selectItem) {
      let usecartInfo = Object.assign({}, state.useCart) // 

      if (getters.uid) {
        console.log(usecartInfo)
        if (!Object.keys(usecartInfo).length) {
          console.log('aaa')
          const initState = {
              Items: [selectItem],
              address: '',
              orderID: '',
              orderTime: '',
              user: '',
              addressNumber: '',
              mail: '',
              orderDate: '',
              phoneNumber: '',
              status: 0,
            }
          firebase.firestore().collection(`users/${getters.uid}/carts`)
            .add(initState)
            .then(doc => {
               commit('useCart', { id: doc.id, cartItem: initState })   
              })
        } else {
          // let usecartInfo = Object.assign({}, state.useCart)
          usecartInfo.Items = state.useCart.Items.slice()
          usecartInfo.Items.push(selectItem)
          console.log(usecartInfo.Items)
          console.log(getters.uid)
          console.log(selectItem)
          // let hairetsu = usecartInfo.Items.concat().slice(1, -1) 
          firebase.firestore().collection(`users/${getters.uid}/carts`)
            .doc(usecartInfo.orderID).update(usecartInfo)
          commit('updateCart', { selectItem })
        }
      }
    },
    deleteInCart({ state, getters, commit }, cart){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/carts`)
            .doc(state.useCart.orderID).update({ Items: cart})
          commit('deleteFromCart', cart)
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
    //注文ボタンの後に実行される
    addCustomerInfo({ state,getters, commit }, customerInfo) {
      let CI = Object.assign({}, customerInfo)
      CI.Items = state.useCart.Items
      console.log(state.useCart.Items)
      console.log(CI)
      firebase.firestore().collection(`users/${getters.uid}/carts`)
        .doc(state.useCart.orderID).update(CI)
          commit('addCustomerInfo', CI)
    }
  },

  // gettersはcomputedに似ている！ => いろいろなところで、プロパティ(key)のように呼び出して使える！
  // 2つのアクセススタイルを持つ！ => 「プロパティアクセススタイル」と「メソッドアクセススタイル」
  getters: { 

    // <超重要 mutaitionsとgettersの違い！>
    // gettersは、stateのデータを使って、新しいデータを作成する・加工処理する！ => stateのデータの内容は変わらない！
    // mutationsは、stateのデータを変更する・更新する・書き換える！ => stateのデータの内容が変わる！

    // <メソッドスタイルアクセス> => 引数を渡すことができます。
    // 関数を返り値にすることで、getterに引数を渡すこともできます。これは特にストアの中の配列を検索する時に役立ちます。

    // stateの中から、特定のIDのコーヒーをgetする処理
    getItem: (state) => (id) => state.coffeeList.find( product => product.ID === id), 

    // stateのログインユーザーをセット
    uid: (state) => (state.login_user ? state.login_user.uid : null),

    // stateのuserCartをセット
    cartItemList: (state) => state.useCart,
  }
})
