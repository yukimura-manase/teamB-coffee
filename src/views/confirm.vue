<template>
    <div>
        <h1>注文内容確認</h1>
        <!-- <div v-if="this.cartContent.length === 0">
            <h1>カートに商品がありません!!</h1>
        </div> -->
        <!-- <div v-if="this.cartContent.length >= 1"> -->
                <table border="1">
                    <tr v-for="cart in cartContent" :key="cart.id">
                        <!-- <td v-for="(topping, index) in cart.choseToopings" :key="t"> -->
                            <!-- <img :src="cart.imageURL"> -->
                            <p>商品名：{{ getItem(cart.id).name }}</p>
                            <p>小計:{{cart.totalPrice}}</p>

                            <p>サイズ：{{cart.itemSize}}</p>
                            <p>追加トッピング：{{cart.choseToppings}}</p>
                            <div>
                                <router-link :to="{ name:'Toorder'}"><button @click="Buy(cart)" style="width:300px">ユーザー情報入力</button></router-link>
                            </div>
                            <div>
                            </div>
                        <!-- </td> -->
                    </tr>
                    <tr>
                        <td>
                            <h2>ご注文金額合計：{{ sumPrice }}</h2>

                            <div>
                            </div>

                        </td>
                    </tr>

                </table>


        <!-- </div> -->
        


    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
        return{
            //{ ID: 1, name: 'Gorgeous4サンド', contents: '人気の定番具材「ハム」と「チキン」をセットにした食べごたえ抜群のサンドイッチです', priceM: 480, priceL: 700, imageURL: require('@/assets/img_coffee/1.jpg') },
        }
    },

    methods:{
        ...mapActions(['BuyInCart','DeleteInCart']),

        Buy(){
            console.log('購入ボタンが押されました！');
            this.cartSample();
        },
         deleteConfirm(id){
            if(confirm("削除してもよろしいですか？")){
                this.deleteCartItem({id})
            }
        },
    },
    computed:{
        cartContent(){
            if(this.$store.state.useCart.Items){
                 return this.$store.state.useCart.Items.concat();      
            }
            return []
        },
        sumPrice(){
            return this.cartContent.reduce((a,c) => a + c.totalPrice, 0)
        },
       ...mapGetters(['getItem'])
        
    }

   


    


}



</script>
