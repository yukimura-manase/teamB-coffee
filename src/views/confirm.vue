<template>
    <div id="confirm">
        <h1>注文内容確認</h1>
        <table v-if="cartItems.length" border="1">
            <thead>
            <tr>
                <th>商品名</th>
                <th>サイズ</th>
                <th>数量</th>
                <th>トッピング</th>
                <th>小計(税込)</th>
                <th>削除</th>
            </tr>
            </thead>
            <tbody v-for="(item, index) in cartItems" :key="index">
                <tr v-for="(item2, index) in item" :key="index">
                <td><img :src="item2.imageURL"><div>{{item2.name}}</div></td>
                <td>{{item.countM}} </td>
                <td>M：{{item.countM}}個/L：{{item.countL}}個</td>
                 <td><div v-for="(tops, index) in item2.topping" :key="index">{{tops}}</div></td>
                <td>{{item2.totalPrice}}円</td>
                <td><button @click="deleteConfirm(id)">削除</button></td>
            </tr>
            </tbody>
        </table>
            <!-- <h1>合計金額：{{ sumPrice }}</h1> -->
        <!-- ※注文画面へのリンク作成※ -->
            <button @click="check(cartItems)">この内容で注文する</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
       check(){
            if(this.uid){
                // this.addOrderList(this.cartItems)
                //ユーザー情報入力画面に移行
                this.$router.push({name:'Toorder'})
                console.log(this.cartItems)
            }else if(!this.uid){
                this.login()
                // this.addOrderList(this.carts)
                this.$router.push({name:'Toorder'})
            }
        },
        ...mapActions(['detailChangeCart'])
    },
    created(){
        //storeのカートリストをcartItemsにpush
        // this.detailChangeCart()
        this.cartItems.push(this.cartItemList)
        console.log(this.cartItems)
    },
    computed:{
        ...mapGetters(['cartItemList', 'uid', ]),

    }
}


</script> 
