<template>
<div id="header">
    
    <img :src="url" style="width:300px height:300px">
    <div>
        <span style="margin:30px;">
            <section>
                <button class="btn_01" @click="logout" v-if="$store.state.login_user" style="">ログアウト</button>
                <button class="btn_01"  @click="login" v-else>ログイン</button>
            </section>
        </span>
    </div>
    
    <div style="margin:30px height:800px">
        <img :src="url2">
    </div>
    
    </div>

</template>

<script>
import { mapActions } from "vuex";
export default({
    data(){
        return{
            url:'/img_coffee/header_logo.png',
            url2:'/coffee-teamb.jpg'
        }
    },
    methods:{
    ...mapActions(["login","logout"]),
    },
})


</script>

<style>
section {
  max-width: 300px;
  margin: 0 auto;
}
button.btn_01 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#4fb5ef, #0076b9 100%);
  border: 1px solid #005e94;
  border-radius: 12px;
  box-shadow: inset 0px 0px 2px 0px rgb(255, 255, 255);
  box-shadow: 0px 4px 4px 0px rgb(175, 175, 175);
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 0 20px 0 70px;
  color: #fff;
  font-size: 16px;
  text-align: left;
  text-decoration: none;
  position: relative;
  transition-duration: 0.2s;
}
button.btn_01:hover {
  opacity: .7;
}
a.btn_01:before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 0 7px 8px;
  border-color: transparent transparent transparent #ffffff;
  position: absolute;
  top: 50%;
  left: 23px;
  margin-top: -7px;
}
button.btn_01:after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 100%;
  background-color: #005e94;
  box-shadow: 0px 0px 2px 0px rgb(255, 255, 255);
  position: absolute;
  top: 0;
  left: 50px;
}

#header{
  background-image:url('');
  background-repeat: no-repeat;
  background-size: 800px;
  height: 800px;
  position: center;
}
</style>