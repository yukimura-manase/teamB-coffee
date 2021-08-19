<template>
    <div id="details">
        <div>商品詳細画面</div>
        <!-- {{$route.params.id}} -->
        <div><img :src="itemdetails.imageURL"> </div>
        <div>{{itemdetails.name}}</div>
        <div>{{itemdetails.contents}}</div>
        
        <div>【サイズ】</div>
        <div>{{ itemdetails.priceM }}円(税抜)</div>
            <input type="radio" v-model="countSize" value="M">M
            <input type="radio" v-model="countSize" value="L">L
            <select v-model="itemCount">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
            <div>【トッピング】</div>
            <span v-for="tops in toppings" :key="tops.ID">
            <label><input type="checkbox" v-model="choseToppings" :value="tops.name">
            {{ tops.name }}</label></span> 
            <div>※Mサイズは1トッピングにつき200円</div>
            <div>Lサイズは1トッピングにつき300円</div>
        <div>選択中のトッピング：{{ choseToppings }}</div>
        <h1>商品金額：{{ totalPrice() }}円(税込)</h1>
        <router-link :to="{name: 'Home'}"><button>戻る</button></router-link> |
        <!--ボタンclickしたら、firestoreに保存される-->
        <router-link :to="{ name: 'Cart' }"><button @click="goCart">カートに入れる</button></router-link>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'Order',
    data(){
        //商品詳細情報が入る
        return {
            itemdetails: {},
            countSize:'',
            topping:{},
            choseToppings:[],
            itemCount: 0,
            id: 0,
        }
    },
    created(){
        //this.$route.params.idは選択された商品のid
        //gettersによってstateの配列のなかからidが一致したデータを取得
        const getItem = this.$store.getters.getItem(this.$route.params.id);
        console.log(getItem)
        if(getItem){
            this.itemdetails = getItem
        }
        this.getTopping()
    },
    methods:{
         ...mapActions(['addCartItem','intoCart', 'getTopping']),
        //カートのボタン押されたらaddCartItemを呼び出し
        goCart(){
            //選ばれた商品をオブジェクトにして渡す
            let selectItems = {
                id: this.$route.params.id,
                itemCount: this.itemCount,
                totalPrice: this.totalPrice,
                //MかL
                itemSize: this.countSize,
                // 選ばれたトッピング
                choseToppings: this.choseToppings,
            }
            this.addCartItem(selectItems);
        },
        totalPrice(){
            if(this.countSize ==='M'){
                 let total = (this.itemdetails.priceM * this.itemCount +this.choseToppings.length * 200) * 1.1
                return Math.floor(total)
            }else if(this.countSize ==='L'){
                 let total=(this.itemdetails.priceL * this.itemCount + this.choseToppings.length *300) * 1.1
                return Math.floor(total)
            }
        },
    },
    computed:{
        ...mapState(['toppings'])
    }
}

   
        
</script>
