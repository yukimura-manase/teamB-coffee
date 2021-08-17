<template>
  <div class="home">
      <button @click="logout" v-if="$store.state.login_user">ログアウト</button>
      <button @click="login" v-else>ログイン</button>
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
          <th>商品詳細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getlist " :key="item.id">
          <th>{{item.ID}}</th>
          <th>{{item.name}}</th>
          <th>{{item.contents}}</th>
          <th>{{item.priceM}}円</th>
          <th>{{item.priceL}}円</th>
          <th><img :src="item.imageURL"></th>
          <th><router-link :to="{name: 'Details',params:{id:item.ID}}"><button>商品詳細へ</button></router-link></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default{
    methods:{
      ...mapActions(["login","logout"]),
    },
    data(){
      return {
        coffeelist:[],
        url:require('@/assets/img_coffee/header_logo.png'),
        search:''
      }
    },
      created(){
      this.coffeelist = this.$store.state.coffeeList
      console.log(this.coffeelist);
    },
    computed:{
      getlist(){
        const coffeeList  = this.$store.state.coffeeList
        return coffeeList.filter((item) => {
        return item.name.match(this.search)
      })
      }
    }
  }

</script>