<template>
    <div id="details">
        <div>商品詳細画面</div>

        <div>{{itemdetails.name}}</div>
        <div>{{itemdetails.content}}</div>
        【サイズ】
        <!-- v-model追加する -->
        <div>M: {{ itemdetails.priceM }}●●円(税抜)</div>
         数量：
        <select>
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
        <div>L:{{ itemdetails.priceL }}●●円(税抜)</div>
        数量：<select>
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
            <h1>商品金額：{{  itemdetails.priceM }}●●円(税込)</h1>

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
            itemdetails:{}
        }
    },
    created(){
        //this.$route.params.idは選択された商品のid
        //gettersによってstateの配列のなかからidが一致したデータを取得
        const getItem = this.getItem(this.$route.paeams.id);
        if(getItem){
            this.itemdetails = getItem
        }
    },
    methods:{
        //カートのボタン押されたら
        intoCart(itemdetails){
            this.intoCart(itemdetails)
        },
        ...mapActions(['intoCart'])
    }
}

</script>
