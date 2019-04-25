<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span>已选商品<em>{{totalCount}}</em>件</span>
          <span>总金额：<strong>{{totalPrice}}</strong></span>
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span><input type="checkbox"/> 全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>

          <ul>
            <h2 v-if="!productList.length">购物车中没有任何商品！</h2>
            <li v-if="productList.length>0" v-for="product in productList">
              <input type="checkbox" class="cart_checkbox"/>
              <a href="" class="cart_img"><img :src="require('../assets/'+product.pic)" alt=""/></a>
              <a href="" class="cart_title">{{product.title1}}</a>
              <i>¥{{product.price}}</i>
              <div>
                <span @click="updateCount(--product.count,product.did,product.pid)">-</span><input type="text" :value="product.count"/><span @click="updateCount(++product.count,product.did,product.pid)">+</span>
              </div>
              <strong>¥{{(product.price*product.count).toFixed(2)}}</strong>
              <em @click="deleteDetail(product.did)"></em>
            </li>
            <!--<li>-->
            <!--<input type="checkbox" class="cart_checkbox"/>-->
            <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
            <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
            <!--<i>¥1599</i>-->
            <!--<div>-->
            <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
            <!--</div>-->
            <!--<strong>¥1599.00</strong>-->
            <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span>已选商品<em>{{totalCount}}</em>件</span>
          <span>总金额：<strong>{{totalPrice}}</strong></span>
          <button type="button" @click="checkOut()">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uid: '',
        cid:'',
        productList: [],
        totalCount:0,
        totalPrice:0
      }
    },
    mounted() {
      this.uid = sessionStorage.uid;
      this.loadDetails();
    },
    methods:{
      //删除某一条数据
      deleteDetail(did){
        let url=`http://127.0.0.1:8080/cart/detail/delete`;
        this.$http.post(url,{did}).then(result=>{
          if(result.body.code==1){//删除成功，重新加载
            this.loadDetails();
            this.bus.$emit('getHeaderCartDetails');
          }
        });
      },
      //加载数据
      loadDetails(){
        this.totalCount=0;
        this.totalPrice=0;
        let url = 'http://127.0.0.1:8080/cart/detail/select/' + this.uid;
        this.$http.get(url).then(result => {
          this.cid=result.body.cid;
          this.productList = result.body.products;
          if(this.productList.length>0){
            for(let product of this.productList){
              this.totalPrice+=parseFloat(product.price)*parseFloat(product.count);
              this.totalCount+=parseInt(product.count);
            }
            this.totalPrice=parseFloat(this.totalPrice).toFixed(2);
          }
        });
      },
      //更改数据的count
      updateCount(count,did,pid){
        if(count<0){
          return;
        }else if(count==0){//如果数量为0，就删除此数据
          this.deleteDetail(did);
        }else{
          let url=`http://127.0.0.1:8080/cart/detail/update`;
          this.$http.post(url,{count,pid,did}).then(result=>{
            if(result.body.code==1){
              this.bus.$emit('headerReload');
              this.loadDetails();
            }
          });
        }
      },
      //结算
      checkOut(){
        let url='http://127.0.0.1:8080/cart/checkout';
        this.$http.post(url,{cid:this.cid,uid:this.uid}).then(result=>{
          alert('结算成功');
          this.loadDetails();
          this.bus.$emit('headerReload');
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
