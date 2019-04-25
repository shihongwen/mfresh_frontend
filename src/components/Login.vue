<template>
  <div class="login_box">
    <div class="container">
      <div class="login">
        <h2>用户登录</h2>
        <dl class="clearfloat">
          <dt><span class="tips" id="uname_prompt_text">{{unameInfo}}</span>用户名：</dt>
          <dd>
            <input type="text" id="uname" placeholder="邮箱/手机号"
                   v-model.trim="uname" @blur="checkUname"/>
            <em class="icon_user"></em>
            <i class="icon_error"
               :style="{'display':unameInfo==''?'none':'inline-block'}"
               id="uname_prompt_icon"></i>
          </dd>
        </dl>
        <dl>
          <dt><span class="tips" id="pwd_prompt_text">{{upwdInfo}}</span>密码：</dt>
          <dd>
            <input type="password" id="pwd" placeholder="密码"
                   v-model.trim="upwd" @blur="checkUpwd"/>
            <em class="icon_pwd"></em>
            <i class="icon_error"
               :style="{'display':upwdInfo==''?'none':'inline-block'}"
               id="pwd_prompt_icon"></i>
          </dd>
        </dl>
        <p>
          <input type="checkbox" id="auto_login"/>
          <label for="auto_login"><span>自动登录</span></label>
        </p>
        <button type="button" id="login" @click="toLogin">立 即 登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uname:'',
        unameInfo:'',
        unameIsOk:false,
        upwd:'',
        upwdInfo:'',
        upwdIsOk:false
      }
    },
    methods:{
      checkUname(){
        if(!this.uname){
          this.unameInfo='用户名不能为空';
        }else{
          this.unameInfo='';
          this.unameIsOk=true;
        }
      },
      checkUpwd(){
        if(!this.upwd){
          this.upwdInfo='密码不能为空';
        }else{
          this.upwdInfo='';
          this.upwdIsOk=true;
        }
      },
      toLogin(){
        if(!(this.unameIsOk&&this.upwdIsOk)){
          this.unameInfo='用户名或密码不能为空';
          this.unameIsOk=false;
        }else{
          //发送ajax请求
          let url='http://127.0.0.1:8080/user/login?unameOrPhone='+this.uname+'&upwd='+this.upwd;
          this.$http.get(url).then(result=>{
            let data=result.body;
            if(data.code!=1){
              this.unameInfo='用户名或密码错误';
            }else{
              sessionStorage.uid=data.uid;
              sessionStorage.uname=data.uname;
              this.bus.$emit('headerReload');
              this.$router.go(-1);
            }
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
