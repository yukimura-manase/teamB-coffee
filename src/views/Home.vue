<template>
  <div class="home">

    <div>
        商品名を入力：<input type="text" v-model="search">
        <button v-on:click="Kensaku(search)">検索</button>
    </div>

    <table border="1">

      <thead>
        <tr>
          <th>商品ID</th>
          <th>商品名</th>
          <th>イメージ</th>
          <th>商品説明</th>
          <th>Mサイズの値段</th>
          <th>Lサイズの値段</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(coffee,index) in coffeelist" :key="index">
          <td>{{coffee.ID}}</td>
          <td><h3>{{coffee.name}}</h3></td>
          <td><img :src="coffee.imageURL"></td>
          <td>{{coffee.contents}}</td>
          <td>Mサイズ値段：{{coffee.priceM}}円</td>
          <td>Lサイズ値段：{{coffee.priceL}}円</td>
        </tr>
      </tbody>
      
    </table>

  </div>
</template>

<script> // 商品の一覧表示！ & 検索機能！
import { mapActions } from 'vuex';

  
  export default {
    data(){
      return {
        coffeelist:[],
        search:''

      }
    },
    created(){
      console.log('画面表示します！');
      this.coffeelist = this.$store.state.coffeeList
      console.log(this.coffeelist);
    },
    methods:{
      ...mapActions(['Search']),

      Kensaku(hikisu){
        
        console.log('検索ボタンが押されました！！');

        this.Search(hikisu);

      }

    },

  }
</script>
