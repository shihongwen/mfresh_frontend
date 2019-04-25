<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <ul>
          <li v-for="item in this.pager.data">
            <span>{{item.pubTime|myDate}}</span>
            <router-link :to="'/newsDetail/'+item.nid">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a href="" :class="pager.pageNum==1?'default':''"
           @click.prevent="loadList(pager.pageNum-1)">上一页</a>
        <a href="" :class="p==pager.pageNum?'cur':''"
           v-for="p in this.pageList"
           @click.prevent="loadList(p)">{{p}}</a>
        <a href="" :class="pager.pageNum==pager.pageCount?'default':''"
           @click.prevent="loadList(pager.pageNum+1)">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      pager:{},
      pageList:[]
    }
  },
  mounted(){
    this.loadList(1);
  },
  methods:{
    loadList(pageNum){
      if(pageNum<=0) return;
      if(pageNum>this.pager.pageCount) return;
      this.pageList=[];
      let url='http://127.0.0.1:8080/news/select?pageNum='+pageNum;
      this.$http.get(url).then(res=>{
        this.pager=res.body;
        for(let i=1;i<=this.pager.pageCount;i++){
          this.pageList.push(i);
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
