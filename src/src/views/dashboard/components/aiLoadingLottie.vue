<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <div id="lottie" style="z-index: 1000; width: auto"></div>
</template>
  
  <script>
import lottie from 'lottie-web'
import animationData from '@/assets/pages/dashboard/ai/aiLoading.json' //这个json动画文件是UI给的

export default {
  data() {
    return {
      animation: null,
      animationData: animationData,
      num: 0,
    }
  },
  methods: {
    openL() {
      this.num++
      if (this.num == 1) {
        this.animation = lottie.loadAnimation({
          container: document.getElementById('lottie_ai_loading'),
          renderer: 'svg',
          loop: true, //循环播放 true/number/false
          autoplay: true,
          animationData,
        })
        this.animation.play()
      } else {
      }
    },
  },
  mounted() {
    this.num = 0
  },
}
</script>
  
  <style>
</style>