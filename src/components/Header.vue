<template>
  <div>
    <header class="header container">
      <h1 class="logo">
        <router-link to="/" class="link"></router-link>
      </h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li><a href="#">中文</a></li>
          <li><em>|</em></li>
          <li><a href="#">English</a></li>
          <li v-if="isLogin"><a href="#" class="weixin"></a></li>
          <li v-if="isLogin"><a href="#" class="weibo"></a></li>
          <li v-if="!isLogin">
            <router-link to="/login" class="h_login">登录</router-link>
          </li>
          <li v-if="!isLogin"><em>|</em></li>
          <li v-if="!isLogin">
            <router-link to="/register" class="h_register">注册</router-link>
          </li>
          <li v-if="isLogin" class="top_user"><a href="">{{uname}}</a></li>
          <li v-if="isLogin" class="top_quit">
            <a href="" @click.prevent="logout">退出</a>
          </li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text"/>
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li>
              <router-link to="/"><span class="icon_home"></span>首页</router-link>
            </li>
            <li>
              <router-link to="/about">关于净美仕</router-link>
            </li>
            <li>
              <router-link to="/news">公司动态</router-link>
            </li>
            <li class="nav_pd">
              <router-link to="/product/1">产品中心<span class="icon_pd"></span></router-link>
              <div class="pd_dropdown">
                <router-link to="/product/1">净美仕净化器</router-link>
                <router-link to="/product/2">净美仕滤网</router-link>
              </div>
            </li>
            <li>
              <router-link to="/contact">联系我们</router-link>
            </li>
          </ul>
        </div>
        <div class="s_cart"
             @mouseenter="isShowDropDown=true" @mouseleave="isShowDropDown=false">
          <router-link to="/cart">
            <span class="icon_cart"></span>购物车(
            <strong id="cart_sum">{{totalCount}}</strong>)
            <span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown" v-if="isShowDropDown">
            <h3 v-if="!cartProductList.length">您的购物车为空~</h3>
            <ul v-if="cartProductList.length>0">
              <li v-for="product of cartProductList">
                <a href=""><img :src="require('../assets/'+product.pic)" alt=""/></a>
                <div>
                  <span @click="updateCount(--product.count,product.did,product.pid)">-</span><input type="text" :value="product.count"/><span @click="updateCount(++product.count,product.did,product.pid)">+</span>
                </div>
                <strong>¥{{parseFloat(product.count*product.price).toFixed(0)}}</strong>
                <em @click="deleteDetail(product.did)"></em>
              </li>
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
            </ul>
            <div class="cd_js clearfloat">
              <span>共计：<strong>{{totalPrice}}</strong></span>
              <router-link to="/cart">结算</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalCount: 0,
        totalPrice: 0,
        uid: '',
        uname:'',
        cartProductList: [],
        isShowDropDown: false,
        isLogin:false   //是否已登录
      }
    },
    mounted() {
      this.init();
      this.bus.$on('headerReload',this.init);
      this.bus.$on('getHeaderCartDetails',this.getCartDetails);
    },
    methods: {
      //初始化
      init(){
        this.uid = sessionStorage.uid;
        this.uname=sessionStorage.uname;
        if(this.uid!=null&&this.uid!=''){
          this.isLogin=true;
          this.getCartDetails();
        }
      },
      //获取购物车数据
      getCartDetails() {
        this.totalCount = 0;
        this.totalPrice = 0;
        let url = `http://127.0.0.1:8080/cart/detail/select/${this.uid}`;
        this.$http.get(url).then(result => {
          this.cartProductList = result.body.products;
          if (this.cartProductList.length > 0) {//有数据
            for (let product of this.cartProductList) {
              this.totalCount += parseInt(product.count);
              this.totalPrice += parseFloat(product.price * product.count);
            }
          }
        });
      },
      //删除购物车某条数据
      deleteDetail(did){
        let url=`http://127.0.0.1:8080/cart/detail/delete`;
        this.$http.post(url,{did}).then(result=>{
          if(result.body.code==1){//删除成功，重新加载
            this.getCartDetails();
          }
        });
      },
      //更改购物车记录中的数量
      updateCount(count,did,pid){
        if(count<0){
          return;
        }else if(count==0){//如果数量为0，就删除此数据
          this.deleteDetail(did);
        }else{
          let url=`http://127.0.0.1:8080/cart/detail/update`;
          this.$http.post(url,{count,pid,did}).then(result=>{
            if(result.body.code==1){
              this.getCartDetails();
            }
          });
        }
      },
      //注销
      logout(){
        sessionStorage.uid='';
        sessionStorage.uname='';
        this.isLogin=false;
        this.totalCount = 0;
        this.totalPrice = 0;
        this.cartProductList=[];
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
