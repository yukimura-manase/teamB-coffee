<template>
    <div id="confirm">
        <h1>注文内容確認</h1>
        <table v-if="cartItems.length">
            <thead>
            <tr>
                <th>商品名</th>
                <th>サイズ</th>
                <th>数量</th>
                <th>トッピング</th>
                <th>小計(税抜)</th>
                <th>削除</th>
            </tr>
            </thead>
            <tbody v-for="(item, index) in cartItems" :key="index">
                <tr v-for="(item2, index) in item" :key="index">
                <td>{{item2.ID}}</td>
                <td>{{item2.num}}</td>
                <td>{{item2.size}}</td>
                <td>{{item2.topping}}</td>
                <td>{{item2.totalPrice}}</td>
                <td><button @click="deleteConfirm(id)">削除</button></td>
            </tr>
            </tbody>
        </table>
            <!-- <h1>合計金額：{{ sumPrice }}</h1> -->
        <!-- ※注文画面へのリンク作成※ -->
            <button @click="check()">この内容で注文する</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default{
    name: 'confirm',
    data(){
        return {
            cartItems: [],
            total:''
        }
    },
    methods:{
        deleteConfirm(id){
            if(confirm("削除してもよろしいですか？")){
                this.deleteCartItem({id})
            }
        },
        // check(){
        //     if(this.getters.uid){
                
        //         //ログインしていなかったらログインする処理へ
        //     } else {
        //     }
        // }
    },
    created(){
        this.cartItems.push(this.cartList)
        // console.log(this.itemsIncart)
    },
    computed:{
        // sumPrice(){
        //     this.cartItems.forEach(item => {
        //         item.forEach(el => {
        //             total += el.totalPrice
        //         })
        //     })
        // },
        ...mapGetters(['cartList', 'uid']),

    }
}


</script> 
