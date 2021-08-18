<template>
    <div id="confirm">
        <h1>注文内容確認</h1>
        <table border="1">
            <tr>
                <th>商品名</th>
                <th>サイズ・価格</th>
                <th>数量</th>
                <th>トッピング</th>
            </tr>
            <!-- 注文の品が反映されるテーブルを作る -->
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
            <button>この内容で注文する</button>
    </div>
</template>

<script>

export default{
    name: 'confirm',
    data(){
        return {
        }

    },
    created(){
        this.$store.dispatch('confirmOrder')
    },
}


</script> 
