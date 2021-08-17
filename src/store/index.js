import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    coffeeList: [],
    login_user: null,

    //カート用の箱 // 確認用にデータを投入中！！
    itemsIncart:[
      { ID: 1, name: 'Gorgeous4サンド', contents: '人気の定番具材「ハム」と「チキン」をセットにした食べごたえ抜群のサンドイッチです', priceM: 480, priceL: 700, imageURL: require('@/assets/img_coffee/1.jpg') },
      { ID: 2, name: 'エスプレッソフラペチーノ', contents: 'ひと口目に感じるエスプレッソは「リストレット」という方法で抽出した力強い香りと優しい苦味を、ふた口目は全体を混ぜて、こだわりのクリームから来るアフォガートのような味わいをお楽しみください。リフレッシュしたい時や、ほっとひと息つきたい時にも、何度でも飲みたくなるフラペチーノ®です。', priceM: 530, priceL: 650, imageURL: require('@/assets/img_coffee/2.jpg') },
      { ID: 3, name: 'Specialキャラメルドーナッツ', contents: 'ドーナツ生地の中に、なめらかで風味豊かなキャラメルフィリングを入れ、仕上げにキャラメルのビター感と香ばしさが楽しめるキャラメルコーティングをかけました。', priceM: 250, priceL: 500, imageURL: require('@/assets/img_coffee/3.jpg') },
      { ID: 4, name: 'チョコクッキー', contents: 'ソフトな食感のクッキー生地には、小麦の香ばしさが感じられるよう全粒粉を入れ、砂糖の一部にはブラウンシュガーを使い、コクのある甘さをプラスしています。風味豊かなスターバックスオリジナルのチョコレートチャンクがごろごろ入っていて、どこを食べてもチョコレートの味わいを存分に楽しめます。ショートサイズのマグカップの上に乗せられるくらいのサイズは、コーヒーと一緒に楽しむのにもぴったりです。', priceM: 190, priceL: 300, imageURL: require('@/assets/img_coffee/4.jpg') },
      { ID: 5, name: 'カフェモカ', contents: 'エスプレッソにほろ苦いチョコレートシロップとミルクを加え、ホットビバレッジにはホイップクリームをトッピング。ちょっとした贅沢を楽しみたい方におすすめです。', priceM: 400, priceL: 520, imageURL: require('@/assets/img_coffee/5.jpg') },
    ],
      
  },
  mutations: {
    setLoginUser(state,user) {
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