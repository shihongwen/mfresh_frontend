<template>
  <div>
    <!--banner-->
    <div class="banner" @mouseenter="mouseIn" @mouseleave="mouseOut">
      <!-- 练习：编写banner的html和css-->
      <!-- 图片列表-->
      <ul>
        <li :style="'background: '+bgImg1+' center 0 no-repeat; display: block;z-index: 20;'"><a href="#"
                                                                                                 class="link"></a>
        </li>
        <li :style="'background: '+bgImg2+' center 0 no-repeat; display: block;z-index: 10;'"><a href="#"
                                                                                                 class="link"></a></li>
        <li :style="'background: '+bgImg3+' center 0 no-repeat; display: block;z-index: 10;'"><a href="#"
                                                                                                 class="link"></a></li>
        <li :style="'background: '+bgImg4+' center 0 no-repeat; display: block;z-index: 10;'"><a href="#"
                                                                                                 class="link"></a></li>
      </ul>
      <!-- 左右箭头-->
      <span class="cut prev" @click="prev"></span>
      <span class="cut next" @click="next"></span>
      <!-- 小圆点指示器-->
      <div class="indicator">
        <a href="" v-for="ind in indList"
           @mouseenter="indMouseOver(ind)" :class="ind==cur?'cur':''"></a>
        <!--<a href=""></a>-->
        <!--<a href=""></a>-->
        <!--<a href=""></a>-->
      </div>
    </div>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title"><a href="#" class="more">more</a>净美仕产品</h2>
        <ul class="clearfloat">
          <li><a href="#" class="link"><img src="../assets/images/01.jpg" alt=""/></a></li>
          <li><a href="#" class="link"><img src="../assets/images/02.jpg" alt=""/></a></li>
          <li><a href="#" class="link"><img src="../assets/images/03.jpg" alt=""/></a></li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title"><a href="#" class="more">more</a>关于净美仕</h2>
          <p>
            北京净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。净美仕肩负着为人类创造健康安全生活环境的使命应运而生。2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。
            <a
                href="#">查看更多</a></p>
        </div>
        <div class="ind_news">
          <h2 class="title"><a href="#" class="more">more</a>公司动态</h2>
          <ul>
            <li><span>2016-02-21</span><a href="">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a></li>
            <li><span>2016-02-21</span><a href="">净美仕新风净化系统　助力校园新风行动</a></li>
            <li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>
            <li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  require('../assets/js/jquery-1.11.3');
  export default {
    data() {
      return {
        bgImg1: `url(${require('../assets/images/banner_01.jpg')})`,
        bgImg2: `url(${require('../assets/images/banner_02.jpg')})`,
        bgImg3: `url(${require('../assets/images/banner_03.jpg')})`,
        bgImg4: `url(${require('../assets/images/banner_04.jpg')})`,
        number: $(".banner ul li").size() - 1,//图片的数量
        cur: 0,//当前显示的图片
        timer: 0,//定时器
        indList: [0,1, 2, 3]
      }
    },
    mounted() {
      this.carousel();
      this.number = $(".banner ul li").size() - 1;
    },
    methods: {
      // 轮播
      carousel() {
        this.timer = setInterval(this.slideNext, 3000);
      },
      //下一个
      slideNext() {
        let that = this;
        if (that.cur < that.number) {
          $(".banner ul li").eq(that.cur).css({'z-index': 10}).stop().fadeOut();
          $(".banner ul li").eq(that.cur + 1).css({'z-index': 20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(that.cur + 1).addClass("cur");
          that.cur += 1;
        } else {
          $(".banner ul li").eq(that.cur).css({'z-index': 10}).stop().fadeOut();
          $(".banner ul li").eq(0).css({'z-index': 20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(0).addClass("cur");
          that.cur = 0;
        }
      },
      //上一个
      slidePrev() {
        let that = this;
        if (that.cur > 0) {
          $(".banner ul li").eq(that.cur).css({'z-index': 10}).stop().fadeOut();
          $(".banner ul li").eq(that.cur - 1).css({'z-index': 20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(that.cur - 1).addClass("cur");
          that.cur -= 1;
        } else {
          $(".banner ul li").eq(that.cur).css({'z-index': 10}).stop().fadeOut();
          $(".banner ul li").eq(that.number).css({'z-index': 20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(that.number).addClass("cur");
          that.cur = that.number;
        }
      },
      //当鼠标移入banner时，清除定时器
      mouseIn() {
        clearInterval(this.timer);
      },
      mouseOut() {
        this.timer = setInterval(this.slideNext, 3000)
      },
      //上一个、下一个
      prev() {
        this.slidePrev();
      },
      next() {
        this.slideNext();
      },
      //小圆点指示器
      indMouseOver(ind) {
        $(".banner ul li").eq(this.cur).css({'z-index': 10}).stop().fadeOut();//隐藏当前的图片
        $(".banner ul li").eq(ind).css({'z-index': 20}).stop().fadeIn();//显示和a序列号一样的图片
        this.cur = ind;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
