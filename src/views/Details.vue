<template>
    <div id="details">
        <div>商品詳細画面</div>

        <div><img :src="itemdetails.imageURL"> </div>
        <div>{{itemdetails.name}}</div>
        <div>{{itemdetails.contents}}</div>
        【サイズ】
        <!-- v-model追加する -->
        <div>M: {{ itemdetails.priceM }}円(税抜)</div>
        【トッピング】
        <!--v-forでチェックボックス作成 
            <div> 
            <v-for="">
            <input type="checkbox"></div> -->
        数量：<select v-model="countM">
                <option disabled>0</option>
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
                <option disabled>0</option>
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
            <h1>商品金額：{{  totalPrice }}円(税込)</h1>

        <!--ボタンclickしたら、firestoreに保存される-->
        <button @click="goCart()">カートに入れる</button>

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
            countM:'0',
            countL:'0',
        }
    },
    created(){
        //this.$route.params.idは選択された商品のid
        //gettersによってstateの配列のなかからidが一致したデータを取得
        const getItem = this.$store.getters.getItem(this.$route.params.id);

        console.log('商品詳細画面を生成！');
        console.log(getItem)

        if(getItem){
            this.itemdetails = getItem
        }

    },
    methods:{

         ...mapActions(['addCartItem']),


        //カートのボタン押されたらaddCartItemを呼び出し
        goCart(itemdetails){

            console.log('カートにGo!!');
            console.log(itemdetails);

            itemdetails.totalPrice = this.totalPrice;
            itemdetails.countM = this.countM;
            itemdetails.countL = this.countL;

            console.log('カート情報を追加');
            console.log(itemdetails);

            this.addCartItem(itemdetails);
        },
           
       
    },

    computed:{
        totalPrice(){
            const total = (this.itemdetails.priceM * this.countM + this.itemdetails.priceL * this.countL) * 1.1
            return Math.floor(total)
        },
       
    }
}




            // if(this.countM !== 0||this.countL !== 0){
            // console.log('どちらかが0では無い'); // => どちらかが0だと処理ストップ

            // if(this.countM === 0 && this.countL === 0 ){
            //     console.log('両方とも0ではない'); // => 両方とも0だと処理ストップ
            //     console.log(this.countM);
            //     console.log(this.countL);

                // if(this.countM!== '' && this.countL !== ''){
                    //console.log('両方とも空欄ではない'); // => 両方とも空欄だと処理ストップ
            //         }
            //     }
            // }

            // if(this.countM !== 0){
            //                         console.log('countMは0ではない！')
            //                     }
            //                     if(this.countL !== 0){
            //                         console.log('countLは0ではない！')
            //                     }
                        
                        
                            
                            

                            
        
</script>
