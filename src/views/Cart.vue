<template>
    <div>
        <div>カート</div>
        <!-- <div v-if="this.cartContent.length === 0">
            <h1>カートに商品がありません!!</h1>
        </div> -->
        <!-- <div v-if="this.cartContent.length >= 1"> -->

            <h2 v-if="$store.state.login_user">{{$store.state.login_user.displayName}}さんのカート</h2>
            <div v-if="$store.state.login_user">
                <table border="1">
                    <tr v-for="cart in cartContent" :key="cart.id">
                        <!-- <td v-for="(topping, index) in cart.choseToopings" :key="t"> -->
                            <!-- <img :src="cart.imageURL"> -->
                            <p>商品名：{{ name() }}</p>
                            <p>小計:{{cart.totalPrice}}</p>
                            
                            <div>
                                <button @click="Buy(cart)" style="width:300px">購入する！</button>
                            </div>

                            <div>
                                <button @click="deleteCart(cart)" style="width:300px">カートから削除する！</button>
                            </div>
                            
                        <!-- </td> -->
                    </tr>

                    <tr>
                        <td>
                            <h2>ご注文金額合計：{{}}</h2>

                            <div>
                                <button @click="Buy()" style="width:300px">すべて購入する！</button>
                            </div>

                        </td>
                    </tr>

                </table>

            </div>

        <!-- </div> -->
        


    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            cartContent:{},
            //{ ID: 1, name: 'Gorgeous4サンド', contents: '人気の定番具材「ハム」と「チキン」をセットにした食べごたえ抜群のサンドイッチです', priceM: 480, priceL: 700, imageURL: require('@/assets/img_coffee/1.jpg') },
        }
    },
    created(){       
            this.cartContent = this.$store.state.useCart;
            console.log(this.cartContent);        
    },

    methods:{
        ...mapActions(['BuyInCart','DeleteInCart']),

        Buy(){
            console.log('購入ボタンが押されました！');
            this.cartSample();
        },

        deleteCart(cart){

            console.log('カートから削除ボタンが押されました！');
            console.log(cart);

            this.DeleteInCart(cart);

        },
        tax(hikisu){ // 消費税のみ
            return Math.round(hikisu * 0.1);
        },
        comicomiTax(hikisu){ // 税込計算
            return Math.round(hikisu * 1.1);
        },
    },
    computed:{
        // name(){
        //     this.$store.state.coffeeList.forEach(coffee => {
        //         console.log(coffee)
        //         this.cartContent.Items.forEach(item => {
        //              if(coffee.ID === item.id){
        //                  return coffee.name
        //              }
        //         });
               
        //     });
        
    }

   


    


}



</script>
