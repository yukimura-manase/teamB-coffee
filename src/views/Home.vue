<template>
  <div class="home">
<<<<<<< HEAD
      <button @click="logout" v-if="$store.state.login_user">ログアウト</button>
      <button @click="login" v-else>ログイン</button>
=======
    <img :src="url">
    <h1>コーヒーの商品検索</h1>
    <input type="text" v-model="search">
    <button>検索</button>
    <!-- v-on click -->
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>商品説明</th>
          <th>価格(M)</th>
          <th>価格(L)</th>
          <th>イメージ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coffeelist" :key="item.id">
          <th>{{item.ID}}</th>
          <th>{{item.name}}</th>
          <th>{{item.contents}}</th>
          <th>{{item.priceM}}円</th>
          <th>{{item.priceL}}円</th>
          <th><img :src="item.imageURL"></th>
        </tr>
      </tbody>
    </table>
>>>>>>> de4819fe01f2f0b1f07d1b6040290c5b5fdd5519
  </div>
</template>
<script>
<<<<<<< HEAD
  import { mapActions } from "vuex";
  export default{
    methods:{
      ...mapActions(["login","logout"]),
    },
=======
export default {
    data(){
      return {
        coffeelist:[],
        url:require('@/assets/img_coffee/header_logo.png'),
        search:''
      }
    },
    created(){
      console.log('画面表示します！');
      this.coffeelist = this.$store.state.coffeeList
      console.log(this.coffeelist);
    },

>>>>>>> de4819fe01f2f0b1f07d1b6040290c5b5fdd5519
  }
</script>