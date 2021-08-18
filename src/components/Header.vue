<template>
<div>
    <button @click="logout" v-if="$store.state.login_user">ログアウト</button>
    <button @click="login" v-else>ログイン</button>
    <img :src="url">
    </div>

</template>

<script>
import { mapActions } from "vuex";
export default({
    data(){
        return{
            url:'/img_coffee/header_logo.png'
        }
    },
    methods:{
    ...mapActions(["login","logout"]),
    },
})


</script>

<style>

</style>