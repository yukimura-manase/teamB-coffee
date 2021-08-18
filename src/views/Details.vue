<template>
    <div id="details">
        <div>商品詳細画面</div>
        {{$route.params.id}}
        <div><img :src="itemdetails.imageURL"> </div>
        <div>{{itemdetails.name}}</div>
        <div>{{itemdetails.contents}}</div>
        <div>【トッピング】</div>
            <span v-for="tops in toppings" :key="tops.ID">
            <label><input type="checkbox" v-model="choseToppings" :value="tops.name">
            {{ tops.name }}</label></span> 
            <div>※Mサイズは1トッピングにつき200円</div>
            <div>Lサイズは1トッピングにつき300円</div>
        <div>【サイズ】</div>
        <div>M: {{ itemdetails.priceM }}円(税抜)</div>
        数量：<select v-model="countM">
                <option>0</option>
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
        <div>L:{{ itemdetails.priceL }}円(税抜)</div>
        数量：<select v-model="countL">
                <option>0</option>
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
        <div>選択中のトッピング：{{ choseToppings }}</div>
        <h1>商品金額：{{  totalPrice }}円(税込)</h1>
        <router-link :to="{name: 'Home'}"><button>戻る</button></router-link> |
        <!--ボタンclickしたら、firestoreに保存される-->
        <button @click="goCart(itemdetails)">カートに入れる</button>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'Order',
    data(){
        //商品詳細情報が入る
        return {
            itemdetails:{},
            countM:'',
            countL:'',
            topping:{},
            choseToppings:[]
        }
    },
    created(){
        //this.$route.params.idは選択された商品のid
        //gettersによってstateの配列のなかからidが一致したデータを取得
        const getItem = this.$store.getters.getItem(this.$route.params.id);
        if(getItem){
            this.itemdetails = getItem
        }
        this.getTopping()
    },
    methods:{
        //カートのボタン押されたらintoActionsを呼び出し
        goCart(itemdetails){
            itemdetails.choseToppings = this.choseToppings
            itemdetails.totalPrice = this.totalPrice;
            itemdetails.countM = this.countM;
            itemdetails.countL = this.countL;
            // this.intoCart(itemdetails)
            console.log(itemdetails)
        },
        ...mapActions(['intoCart', 'getTopping'])
    },
    computed:{
        totalPrice(){
            const total = (this.itemdetails.priceM * this.countM + this.itemdetails.priceL * this.countL) * 1.1
            return Math.floor(total)
        },
        ...mapState(['toppings'])
    }
}

</script>
