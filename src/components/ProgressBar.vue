<template>
  <section class='progress-bar-root'>
    <div class='progress-bg' ref='bgProgress'
         @click='progressClick'>
      <div class='progress-runing-bg' ref='bgRunProgress'>
      </div>
      <div
        class='progress-btn'
        ref='btnProgress'
        @touchstart.prevent='progressTouchStart'
        @touchmove.prevent='progressTouchMove'
        @touchend='progressTouchEnd'
        >
      </div>
    </div>
  </section>
</template>

<script>
import { prefixStyle } from '../common/js/dom'

const transform = prefixStyle('transform')
export default {
  name: 'ProgressBar',
  props: {
    progressPercent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  mounted () {
    this.$refs.bgRunProgress.style.width = '0px'
  },
  methods: {
    progressTouchStart (e) {
      const pageX = e.touches[0].pageX
      this.touch.init = true
      this.touch.touchStartX = pageX
      this.touch.runWidth = this.$refs.bgRunProgress.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.init) return
      const pageX = e.touches[0].pageX
      const deltaX = pageX - this.touch.touchStartX
      const offsetWidth = Math.min(this.$refs.bgProgress.clientWidth, Math.max(0, this.touch.runWidth + deltaX))
      this.offsetDis(offsetWidth)
      this.handlerPercent(offsetWidth)
    },
    progressTouchEnd (e) {
      this.touch.init = false
    },
    updateUI (newProgress) {
      const offsetWidth = this.$refs.bgProgress.clientWidth * newProgress
      this.offsetDis(offsetWidth)
    },
    offsetDis (offsetWidth) {
      this.$refs.bgRunProgress.style.width = `${offsetWidth}px`
      this.$refs.btnProgress.style[transform] = `translateX(${offsetWidth}px)`
    },
    progressClick (e) {
      const rect = this.$refs.bgProgress.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this.offsetDis(offsetWidth)
      this.handlerPercent(offsetWidth)
    },
    handlerPercent (offsetWidth) {
      const precent = Number.parseFloat((offsetWidth / this.$refs.bgProgress.clientWidth).toFixed(2))
      this.$emit('changeProgress', precent)
    }
  },
  watch: {
    progressPercent (newProgress) {
      if (newProgress > 0 && !this.touch.init) {
        this.updateUI(newProgress)
      }
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .progress-bar-root
    width: 100%
    height: 20px

    .progress-bg
      height: 6px
      width: 100%
      border-radius: 5px
      position: relative
      top: 7px
      left: 0
      background: white

      .progress-runing-bg
        position: absolute
        top: 0
        left: 0
        width: 0px
        height: 6px
        border-radius: 3px
        background: white
        background: $color-theme

      .progress-btn
        position: absolute
        top: -4px
        left: -5px
        height: 10px
        border-radius: 50%
        border: 2px solid white
        background: $color-theme
        width: 10px
</style>
