<template>
    <div id="confirm">
        <h1>ショッピングカート</h1>
        <table>
            <tr>
                <th>商品名</th>
                <th>サイズ</th>
                <th>価格</th>
                <th>数量</th>
                <th>トッピング・価格</th>
            </tr>
            <!-- 注文の品が反映されるテーブルを作る -->
            <tr v-for="item in itemsIncart" :key="item.id">
                <td>{{item.name}}</td>
                <td>{{item.size}}</td>
                <td>{{item.price}}</td>
                <td>{{item.count}}</td>
                <td>{{item.topping}}</td>
            </tr>
        </table>
            <h1>合計金額：{{ totalSum }}</h1>
        <!-- ※注文画面へのリンク作成※ -->
            <button>この内容で注文する</button>
    </div>
</template>

<script>
export default{
    
    created(){

    }

}

</script>