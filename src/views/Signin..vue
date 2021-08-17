<template>
  <button @click="login">ログイン</button>
</template>

<script>
  import { mapActions } from "vuex";
  export default{
    methods:{
      ...mapActions(["login"]),
    },
  }
</script>