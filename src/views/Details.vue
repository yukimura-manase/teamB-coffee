<template>
    <div id="details">
        <div>商品詳細画面</div>
        {{$route.params.id}}
        <div><img :src="itemdetails.imageURL"> </div>
        <div>{{itemdetails.name}}</div>
        <div>{{itemdetails.contents}}</div>
        【サイズ】
        <!-- v-model追加する -->

        <div>M: {{ itemdetails.priceM }}●●円(税抜)</div>
        数量：



        <div>M: {{ itemdetails.priceM }}円(税抜)</div>

        【トッピング】
        <!--v-forでチェックボックス作成
            <div>
            <v-for="">
            <input type="checkbox"></div> -->
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
        <!--合計金額計算して表示itemdetails.priceMはダミー-->
            <h1>商品金額：{{ totalPrice }}円(税込)</h1>

        <!--ボタンclickしたら、firestoreに保存される-->
        <button click="intocCart">カートに入れる</button>

    </div>
</template>
<script>
import {mapActions} from 'vuex'

// 必要な処理
//intocartメソッドを呼んだ後のactionsとmutationsの処理

export default {
    name: 'Order',
    data(){
        //商品詳細情報が入る
        return {
            itemdetails:{},
            countM:'',
            countL:''
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
    },
    methods:{
        //カートのボタン押されたらintoActionsを呼び出し
        intoCart(itemdetails){
            this.intoCart(itemdetails)
        },
        ...mapActions(['intoCart'])
    },
    computed:{
        totalPrice(){
            const total = (this.itemdetails.priceM * this.countM + this.itemdetails.priceL * this.countL) * 1.1
            return Math.floor(total)
        },
    }
}

</script>
