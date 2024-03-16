<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <div id="lottie_ai_aiOCR2" style="z-index: 1000; width: auto"></div>
</template>
    
 <script>
import lottie from 'lottie-web'
import animationData from '@/assets/pages/user/bind/ocr_Scanning.json' //这个json动画文件是UI给的的

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
      //   console.log(document.getElementById('lottie_ai_aiOCR'))
      if (this.num == 1) {
        this.animation = lottie.loadAnimation({
          container: document.getElementById('lottie_ai_aiOCR'),
          renderer: 'svg',
          loop: true, //循环播放 true/number/false
          autoplay: false,
          animationData,
        })
        this.animation.play()
      } else {
        this.animation.stop()
        this.animation.play()
      }
    },
    closeL() {
      this.animation.destroy()
    },
  },
  mounted() {
    this.num = 0
  },
}
</script>
    
    <style>
</style>