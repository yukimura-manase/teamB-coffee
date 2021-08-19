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
                    <tr v-for="(cart, index) in cartContent" :key="cart.id">
                        <!-- <td v-for="(topping, index) in cart.choseToopings" :key="t"> -->
                            <!-- <img :src="cart.imageURL"> -->
                            <p>商品名：{{ getItem(cart.id).name }}</p>
                            <p>小計:{{cart.totalPrice}}</p>
                            <div>
                                
                            </div>
                            <div>
                                <button @click="deleteCart(index)" style="width:300px">カートから削除する！</button>
                            </div>
                        <!-- </td> -->
                    </tr>
                    <tr>
                        <td>
                            <h2>ご注文金額合計：{{ sumPrice }}</h2>

                            <div>
                                <router-link :to="{ name: 'Toorder'}"><button style="width:300px">すべて購入する！</button></router-link>
                            </div>

                        </td>
                    </tr>

                </table>

            </div>

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
        ...mapActions(['BuyInCart','deleteInCart']),
        deleteCart(index){
            let itemsBox = this.cartContent
            itemsBox.splice(index, 1)
            this.deleteInCart(itemsBox)
        }
    },
    computed:{
        cartContent(){
            console.log(this.$store.state.useCart.Items)
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
