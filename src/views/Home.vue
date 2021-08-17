<template>
  <div class="home">
      <button @click="logout" v-if="$store.state.login_user">ログアウト</button>
      <button @click="login" v-else>ログイン</button>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default{
    methods:{
      ...mapActions(["login","logout"]),
    },
  }
</script>