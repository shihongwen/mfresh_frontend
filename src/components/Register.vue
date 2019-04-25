<template>
  <div>
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input type="text" id="uname" placeholder="请输入邮箱名"
                 v-model.trim="uname" @blur="checkUname"/>
          <em v-if="unameInfoIcon!==''" :class="unameInfoIcon"></em>
          <i v-if="unameInfo!==''">{{unameInfo}}</i>
        </li>
        <li>
          <span>密码：</span>
          <input type="password" id="upwd" placeholder="请输入密码"
                 v-model.trim="upwd" @blur="checkUpwd"/>
          <em v-if="upwdInfoIcon!==''" :class="upwdInfoIcon"></em>
          <i v-if="upwdInfo!==''">{{upwdInfo}}</i>
        </li>
        <li>
          <span>重复密码：</span>
          <input type="password" id="upwd2" placeholder="请重复输入密码"
                 v-model.trim="upwd2" @blur="checkUpwd2"/>
          <em v-if="upwd2InfoIcon!==''" :class="upwd2InfoIcon"></em>
          <i v-if="upwd2Info!==''">{{upwd2Info}}</i>
        </li>
        <li>
          <span>手机号：</span>
          <input type="text" id="phone" placeholder="请输入手机号"
                 v-model.trim="phone" @blur="checkPhone"/>
          <em v-if="phoneInfoIcon!==''" :class="phoneInfoIcon"></em>
          <i v-if="phoneInfo!==''">{{phoneInfo}}</i>
        </li>
        <li>
          <span>验证码：</span>
          <input type="text" class="inp_yzm" placeholder="请输入验证码" value="w3e5"/>
          <img src="../assets/images/yzm.png" alt=""/>
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox"><label>
          <input type="checkbox" v-model="isAgree"/>
          <span>我已阅读并同意用户注册协议</span>
        </label>
        </li>
        <li class="li_btn">
          <button type="button"
                  :class="isAgree&&unameIsOk&&upwdIsOk&&upwd2IsOk&&phoneIsOk?'':'disabled'" @click="toRegister">提交注册</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uname: '',
        upwd: '',
        upwd2:'',
        phone:'',
        unameInfo: '',
        unameInfoIcon:'',
        unameIsOk:false,
        upwdInfo: '',
        upwdInfoIcon:'',
        upwdIsOk:false,
        upwd2Info:'',
        upwd2InfoIcon:'',
        upwd2IsOk:false,
        phoneInfo:'',
        phoneInfoIcon:'',
        phoneIsOk:false,
        isAgree:true,
      }
    },
    methods: {
      //用户名邮箱验证
      checkUname() {
        //邮箱的正则
        let regUname=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        this.unameInfoIcon='icon_error';
        if(!this.uname){
          this.unameInfo='请输入您的注册邮箱';
        }else if(!regUname.test(this.uname)){
          this.unameInfo='请输入正确的邮箱格式';
        }else{
          let url='http://127.0.0.1:8080/user/check/uname?uname='+this.uname;
          this.$http.get(url).then(result=>{
            if(result.body.code==1){
              this.unameInfo='此邮箱已被其他用户注册';
            }else{
              this.unameInfo='';
              this.unameInfoIcon='icon_ok';
              this.unameIsOk=true;
            }
          });
        }
      },
      //密码验证
      checkUpwd() {
        this.upwdInfoIcon='icon_error';
        if(!this.upwd){
          this.upwdInfo='请输入您的密码';
        }else if(this.upwd.length<6||this.upwd.length>12){
          this.upwdInfo='密码长度应为6~12个字符之间';
        }else{
          this.upwdInfo='';
          this.upwdInfoIcon='icon_ok';
          this.upwdIsOk=true;
        }
      },
      // 重复密码验证
      checkUpwd2(){
        this.upwd2InfoIcon='icon_error';
        if(!this.upwd2){
          this.upwd2Info='请再次输入密码';
        }else if(this.upwd2!==this.upwd){
          this.upwd2Info='两次输入的密码不一致';
        }else{
          this.upwd2Info='';
          this.upwd2InfoIcon='icon_ok';
          this.upwd2IsOk=true;
        }
      },
      //手机号验证
      checkPhone(){
        this.phoneInfoIcon='icon_error';
        let regPhone=/^1(3|4|5|7|8)\d{9}$/;
        if(!this.phone){
          this.phoneInfo='请填写您的手机号';
        }else if(!regPhone.test(this.phone)){
          this.phoneInfo='请输入正确的手机号码';
        }else{
          let url='http://127.0.0.1:8080/user/check/phone?phone='+this.phone;
          this.$http.get(url).then(result=>{
            if(result.body.code==1){
              this.phoneInfo='此手机号已被其他用户绑定';
            }else{
              this.phoneInfo='';
              this.phoneInfoIcon='icon_ok';
              this.phoneIsOk=true;
            }
          })
        }
      },
      //注册
      toRegister(){
        if(!(this.isAgree&&this.unameIsOk&&this.upwdIsOk
          &&this.upwd2IsOk&&this.phoneIsOk)){
          return;
        }
        let url='http://127.0.0.1:8080/user/register'
        this.$http.post(url,
          {uname:this.uname,upwd:this.upwd,phone:this.phone}).then(result=>{
            let data=result.body;
          if(data.code==1){
            sessionStorage.uid=data.uid;
            sessionStorage.uname=data.uname;
            alert('恭喜您，注册成功！即将为您跳转到刚才的页面。');
            this.bus.$emit('headerReload');
            this.$router.go(-1);
          }
        })
      }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
