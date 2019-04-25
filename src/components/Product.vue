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
      <div class="pl_header">
        <a :class="type==1?'cur':''" @click.prevent="changeType(1)">净美仕净化器</a>
        <a :class="type==2?'cur':''" @click.prevent="changeType(2)">净美仕滤网</a>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="p in pager.data">
          <router-link :to="'/productDetail/'+p.pid">
            <img :src="require('../assets/'+p.pic)" alt=""/>
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{p.model}}</p>
              <span>{{p.title2}}</span>
            </h3>
            <router-link :to="'/productDetail/'+p.pid">查看详情</router-link>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a href="" :class="pager.pageNum==1?'default':''"
           @click.prevent="loadProducts(pager.pageNum-1,type)">上一页</a>
        <a href="" v-for="pno in pageList"
           :class="pno==pager.pageNum?'cur':''"
           @click.prevent="loadProducts(pno,type)">{{pno}}</a>
        <a href="" :class="pager.pageNum==pager.pageCount?'default':''"
           @click.prevent="loadProducts(pager.pageNum+1,type)">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pager: {},
        pageList:[],
        type:0
      }
    },
    mounted() {
      this.type=this.$route.params.type;
      this.loadProducts(1, this.type);
    },
    methods: {
      // 加载数据
      loadProducts(pageNum, type) {
        if (pageNum <= 0) return;
        if (pageNum > this.pager.pageCount) return;
        this.pageList=[];
        let url = 'http://127.0.0.1:8080/product/select?pageNum=' + pageNum + '&type=' + type;
        this.$http.get(url).then(result => {
          this.pager = result.body;
          for(let i=1;i<=this.pager.pageCount;i++){
            this.pageList.push(i);
          }
        });
      },
      // 更改产品类别
      changeType(type){
        this.type=type;
        this.loadProducts(1,this.type);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
