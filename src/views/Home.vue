<template>
  <div class="home">
      <!-- <button @click="logout" v-if="$store.state.login_user">ログアウト</button>
      <button @click="login" v-else>ログイン</button>
    <img :src="url"> -->

  <h1>コーヒー・ショピングサイト</h1>
    <input type="text" v-model="search" style="width:300px; height:20px;">
    <button style="margin-left:20px" >検索</button>
    <!-- v-on click -->


  <div class="container">
    
  <div class="container1">

    <table  style="margin-top:30px ;" align = 'center'>

      <!-- searchMacthは、computedプロパティ -->
      <tbody v-for="item in searchMacth " :key="item.id" style="font-size: 20px;">
        <tr><img :src="item.imageURL" @click="imageLink(item)" class="coffee"></tr>
          <tr><th class="nowrap">{{item.name}}</th></tr>
          <tr><th>{{item.priceM}}円</th></tr>
          <tr><th>{{item.priceL}}円</th></tr>
          <tr><th class="nowrap"><router-link :to="{name: 'Details',params:{id:item.ID}}"><button class="button">商品詳細へ</button></router-link></th></tr>
      </tbody>

    </table>

  </div>

  </div>


    
    
  </div>
</template>

<script> // homeであり、コーヒーの商品一覧表示
  import { mapActions } from "vuex";
  export default{
    methods:{
      ...mapActions(["login","logout","fetchItems"]),

      imageLink(item){ // 画面遷移&パラメーターを渡している！
          this.$router.push({name:"Details",params:{id:item.ID}}) // パラメータに該当商品のIDをセットする！
        },

    },
    data(){
      return {
        // url:'img_coffee/header_logo.png',
        // url:require('@/assets/img_coffee/header_logo.png'),
        search:''
      }
    },
      created(){
      this.fetchItems() // 画面生成時には、商品たちを取って参る！ => Storeに保存
    },

   
    computed:{

      searchMacth(){  //商品リストをセットする&検索機能 => コーヒー配列そのものに化ける！
        const coffeeList  = this.$store.state.coffeeList // コーヒーリストを格納している。

        return coffeeList.filter((item) => { // filterで配列の中にある値を取り出して、matchするもので配列を再生成する！

        // 呼び出し元にmatchした値を返す！ => filterがmatch関数の処理を呼び出している！ => コールバック関数
        return item.name.match(this.search) //String.prototype.match() => 文字列型の一致するものを返す！

      })
      }
    }
  }

</script>

<style>
table{
  border-collapse: collapse;
  display:flex;
  
  flex-wrap: wrap;
  
}
.container{
  display:flex;
  background-color: rgb(253, 249, 239);
  flex-wrap: wrap;
  padding: 150px;
}
.container1{
  margin: 2px;
  align-content: stretch;
}

th, td {
  border: solid 1px #333;
}
.nowrap {
  white-space: nowrap;
}

.button {
  padding:30px;
  color :#333;
  font-size: 16px;
  font-weight: bold;
  background: whitesmoke;
  padding: 18px 30px;
  border-radius: 6px;
  transition: .3s;
}
button:hover{
  opacity: 0.6; 
} 
</style>
