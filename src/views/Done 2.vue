<template>
  <div id="done">
    <h1>決済が完了しました！</h1>
    <div>ご注文頂きありがとうございます。</div>
    <div>注文内容は「注文履歴」からご確認ください。</div>
    <router-link :to="{name:'Home'}"><button>TOP画面へ</button></router-link>
  </div>
</template>

<script>
export default{
  name:'Done',
}
</script>