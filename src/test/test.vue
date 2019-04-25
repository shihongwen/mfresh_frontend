<template>
  <div>
    <h1>test</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted(){
    // sessionStorage.clear();
    let url='http://127.0.0.1:8080/cart/checkout';
    this.$http.post(url,{cid:116,uid:2}).then(result=>{
      console.log(result);
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
