<template>
    <div>

        
        <div v-if="this.cartContent.length === 0">
            <h1>カートに商品がありません!!</h1>
        </div>

        
        <div v-if="this.cartContent.length >= 1">

            <h2 v-if="$store.state.login_user">{{$store.state.login_user.displayName}}さん専用のカート！！</h2>

            
            <div v-if="$store.state.login_user">

                <table border="1">
                    <tr v-for="cart in cartContent" :key="cart.id">
                        <td>

                            <div>郵便番号：{{cart.addressNumber}}</div>

                            <h2>住所：{{cart.address}}</h2>

                            

                            <div><img :src="cart.imageURL"></div>

                            <p>Mサイズの価格：{{cart.priceM}}</p>

                            <p>Lサイズの価格：{{cart.priceL}}</p>


                            <!-- <p>{{cart.product.price}}円の商品 × {{cart.buyNum}}個で・・・</p>
                            <h3>値段：{{cart.priceResult}}円</h3> -->

                            <div>
                                <button @click="Buy(cart)" style="width:300px">購入する！</button>
                            </div>

                            <div>
                                <button @click="deleteCart(cart)" style="width:300px">カートから削除する！</button>
                            </div>
                            
                        </td>
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

        </div>
        

    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {

    data(){
        return{
            cartContent:[],


            //{ ID: 1, name: 'Gorgeous4サンド', contents: '人気の定番具材「ハム」と「チキン」をセットにした食べごたえ抜群のサンドイッチです', priceM: 480, priceL: 700, imageURL: require('@/assets/img_coffee/1.jpg') },
        }
    },

    created(){

                
                
                this.cartContent = this.$store.state.cartList;

                console.log('cartContentにセット完了！');
                console.log(this.cartContent);

                //console.log(this.tax(100));

                // statusが0のものがあったらセットする！
                // if(this.$store.state.cartItem.status === 0){

                // }
                

                

            
        
    },

    methods:{
        ...mapActions(['BuyInCart','DeleteInCart']),

        Buy(){
            console.log('購入ボタンが押されました！');
            this.cartSample();
        },

        // Buy(cart){

        //     console.log('購入ボタンが押されました！');
        //     console.log(cart);

        //     this.BuyInCart(cart);

        //     this.$router.push('/thanks');

        // },

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

   


    


}



 




 

    

// ショッピングカートの中身を表示する！
//【ユースケース】
// ショッピングカートの中身を表示する => クリア
// 【アクタ】
// 利用者
// 【概要】
// ショッピングカートの中身を表示する
// 【前提条件】
// (1)ヘッダに[ショッピングカート]リンクが表示されていること => クリア
// (2)カートに商品が入っていること 
// 【正常フロー】
// (1)利用者は[ショッピングカート]リンクをクリックする
// (2)システムはショッピングカートの中身を表示する
// 【代替フロー】
// ショッピングカートの中身が0件の場合は「カートに商品がありません」というメッセージのみを表示する => クリア
// ※この時、カート内情報、消費税、ご注文金額合計、注文に進むボタンは全て非表示にする
// 【事後条件】
// ショッピングカート画面が表示されること

//  ショッピングカートに商品を追加する！ => 商品詳細画面
// 【ユースケース】
//  ショッピングカートに商品を追加する
// 【アクタ】
//  利用者
// 【概要】
// 選択された商品をショッピングカートに追加する
// 【前提条件】
//  商品詳細画面が表示されていること
//  購入する個数が選択され、合計金額が表示されていること
// 【正常フロー】
//  (1)利用者は「カートに入れる」ボタンを押下する
//  (2)システムは商品情報をカートに追加する
// 【代替フロー】
//  特になし
// 【事後条件】
//  ショッピングカートに商品情報が追加され、ショッピングカート画面が表示される

// ショッピングカートにから商品を削除する！
// 【ユースケース】
//  ショッピングカートから商品を削除する
// 【アクタ】
//  利用者
// 【概要】
//  ショッピングカートから商品を削除する
// 【前提条件】
//  (1)ショッピングカート画面が表示されていること
//  (2)商品情報がカートに1件以上、入っていること
// 【正常フロー】
//  (1)利用者は任意の商品の削除ボタンを押下する 
//  (2)システムは選択された商品の情報をショッピングカートから削除する
// 【代替フロー】
//  特になし
// 【事後条件】
//  選択された商品情報がショッピングカートから削除されていること
//  ショッピングカート画面が表示されていること

//  ショッピングカートの中身が0件の場合は
// 「カートに商品がありません」というメッセージのみを
// 表示する
// ※この時、カート内情報、消費税、ご注文金額合計、
// 注文に進むボタンは全て非表示にする

</script>
