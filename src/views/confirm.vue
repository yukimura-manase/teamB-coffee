<template>
    <div id="confirm">
        <h1>注文内容確認</h1>
        <table>
            <tr>
                <th>商品名</th>
                <th>サイズ・価格</th>
                <th>数量</th>
                <th>トッピング</th>
            </tr>
            <!-- 注文の品が反映されるテーブルを作る -->
        </table>
        <div>合計金額：〇〇円(税込)</div>
        <h2>お届け先情報</h2>
        <div>
        お名前：<input type="text" v-model="name">
        メールアドレス：<input type="mail" v-model="mail">
        郵便番号：<input type="text">
        住所：<input type="address">
        電話番号：<input type="text">
        </div>
        <h2>お支払い方法</h2>
        <div>どちらかお選びください。
            <input type="radio" v-model="pay">代金引換 |
            <input type="radio" v-model="pay">クレジットカード
        <button>この内容で注文する</button>
        </div>
    </div>
</template>

<script>

export default{
    name: 'confirm',
    data(){
        return {
            name: '',
            mail: '',
            postNum: '',
            address: '',
            tel: '',
            pay: 1
        }

    }
}




</script> 