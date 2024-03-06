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
import animationData from '@/assets/pages/dashboard/ai/ai.json' //这个json动画文件是UI给的

export default {
  data() {
    return {
      animation: null,
      animationData: animationData,
    }
  },
  methods: {},
  mounted() {
    this.animation = lottie.loadAnimation({
      container: document.getElementById('lottie_ai'),
      renderer: 'svg',
      loop: true, //循环播放 true/number/false
      autoplay: true,
      animationData,
    })
    this.animation.play()
  },
}
</script>
  
  <style>
</style>