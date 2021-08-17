<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/details">商品詳細</router-link> |
      <router-link to="/cart">買い物かご</router-link>

    </div>
    <router-view/>
  </div>

</template>

<script>


// ○基本機能(全 7個)
//  1-1.ログインする(初級)
//  1-2.ログアウトをする(初級)
//  1-3.商品一覧を表示(検索)する(初級)
//  1-4.商品詳細を表示する(初級)
//  1-5.ショッピングカートに商品を追加/表示/削除する(上級) 
//  1-6.注文確認画面を表示する(中級)
//  1-7.注文をする(中級)
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default{
created(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.setLoginUser(user) //ログインユーザー情報をセット
        }else{
          this.deleteLoginUser() //ログインユーザー情報を削除
        }
    })
  },
  methods:{
   ...mapActions(['setLoginUser','logout','deleteLoginUser'])
  }
}
</script>