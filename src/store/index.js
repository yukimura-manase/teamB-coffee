import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)



export default new Vuex.Store({

  state: {
    //商品リスト
    coffeeList: [],
    login_user: null,
    itemsIncart: [],
    //ショッピングカート表示の為の配列
    cartItem: [],
    //トッピングリスト
    toppings: []
  },

  mutations: {

    setLoginUser(state,user) {

      console.log("回覧されてきたのは・・・")
      console.log(user)

      state.login_user = user
    },

    deleteLoginUser(state) {
      state.login_user = null
    },

    fetchItems(state, { item }) {
      
      state.coffeeList.push(item)
      console.log(state.coffeeList)
    },

    //intoCartのactionsを画面に反映
    intoCart(state, itemdetails) {
      state.itemsIncart.push(itemdetails)
      console.log('intoCart完了！');
      console.log(state.itemsIncart);
    },

    cartSample(state,{id,sample}){

      state.sampleList.id = id;
      state.sampleList.push(sample)
      console.log('cartSample完了！');
      console.log(state.sampleList);
    },

    addCartItem(state,{id,cartItem}){
      state.cartItem.id = id;
      console.log(cartItem);
      state.cartItem.push(cartItem);
      console.log('addCartItem完了！');
      console.log(state.cartItem);

    },

    getTopping(state, { subItems }) {
      state.toppings.push(subItems)
      console.log(state.toppings)
    },
    //idはカートのidを識別するためのもの
    // confirmOrder(state, { id, cart }) {
    //   cart.id = id
    //   state.itemsIncart = cart
    //   console.log(cart.id)
    //   console.log(state.itemsIncart)
    // },
    // intoCart(state, {itemdetails }) {
    //   state.itemsIncart.push(itemdetails)
    //   console.log('intoCart完了！');
    //   console.log(state.itemsIncart);
    // }
  },
  actions: {
    setLoginUser({ commit }, user) {
        console.log('setLoginUser動いているよ！！'),
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

      this.state.coffeeList = [] // 初期化
    //商品リストをfirestoreから持ってくる

      firebase.firestore().collection(`/Items`)
        .get().then(snapshot => {
          snapshot.forEach(doc =>
            commit('fetchItems', { item: doc.data()}))
      })
    },  

    //選択したものをカート(DB)に入れる処理
    intoCart({commit}, itemdetails) {

      console.log('動いているか？');
      //カートが空だったら追加
      if (this.itemsIncart === '' ) {
        console.log('動いているか？?');
        firebase.firestore().collection('DBcart').doc()
        .add({
          
        })
         console.log('処理確認')
          .then((doc) => {

            console.log('firebaseからの返信')
            console.log(doc)

            commit("intoCart", { id: doc.id, itemdetails: itemdetails })
          })
      } else {
        //カートに既に何か入っていたら
        console.log('動いているか？？？');
        firebase.firestore().collection('DBcart').doc('cart')
          .update(itemdetails)
          .then((doc) => {

            console.log('動いているか？？？?');
          commit("intoCart",{ id: doc.id, itemdetails: itemdetails } )
        })
      }
    },
    addCartItem({ getters, commit }, cartItem) {
      //ログインしていれば、
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/carts`)
        .add(cartItem).then(doc => {
          console.log('addCartItem起動！');
          commit('addCartItem',{id: doc.id,cartItem})
        })
      }
    },

    // ログインユーザー固有のカート情報を取ってくる！！
    fecthCartItem({getters,commit}){

      firebase.firestore().collection(`users/${getters.uid}/carts`)
      .get().then(snapshot => {

        console.log('ログインユーザー固有のカート情報を取ってくる！！');
        console.log("データの確認");
        console.log(snapshot);

        if(snapshot.empty){ // ログインユーザーに固有のカート情報がなければ、セットカート！
          console.log('snapshotがemptyである！！')
          this.dispatch('setCart')
        }

        snapshot.forEach(doc => {
          console.log('fecthCartItemのforEach');
          console.log(doc);

          if(doc.data().status === 0){
            commit('addCartItem',{id: doc.id, cartItem: doc.data()})
          } 
        })

      })

    },

    setCart({getters,commit}){
      firebase.firestore().collection(`users/${getters.uid}/carts`)
      .add({
        orderID:'',
        user:'',
        address:'',
        addressNumber:'',
        mail:'',
        orderDate:'',
        phoneNumber:'',
        status:0,
      }).then(doc => {
        commit('addCartItem',{id: doc.id, cartItem: {}})
      })
    },


    cartSample({commit}){ 
      
      firebase.firestore().collection('cartsample').get()
      
      .then(snapshot => {

            console.log("データの確認")
            console.log(snapshot);

            snapshot.forEach(doc => {
              console.log(doc);
              commit('cartSample',{id: doc.id, sample: doc.data()})

            })

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
  },

  getters: {
    //coffeeListのidとparams.idが一致したものを返す
    getItem: (state) => (id) => state.coffeeList.find((product) => product.ID === id),
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    cartList: (state) => state.cartItem
  
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
  
})     
    //注文確認画面にカートの中身を表示
    // confirmOrder({ commit }) {
    //   this.state.itemsIncart = []
    //   firebase.firestore().collection('/cartsample').get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc =>
    //         commit('confirmOrder', { id: doc.id, cart: doc.data() }))
    //   })
    // },