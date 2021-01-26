<template>
  <div class='slide-wrapper' ref='slideWrapperEl'>
    <div class='slide-content' ref='slideContentEl'>
      <slot></slot>
    </div>
    <div class="dots-wrapper">
        <span
          class="dot"
          v-for="num in nums"
          :key="num"
          :class="{'active': currentPageIndex === (num - 1)}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { addClass } from '../common/js/dom'

BScroll.use(Slide)
export default {
  name: 'Slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      nums: 0,
      currentPageIndex: 0
    }
  },
  created () {
    console.log('created')
  },
  updated () {
    console.log('updated')
  },
  mounted () {
    console.log('mounted')
    setTimeout(() => {
      this._initBScroll()
    }, 20)
  },
  activated () {
    console.log('activated')
    this.slider && this.slider.refresh()
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    // this.slider.destroy()
  },
  methods: {
    _initBScroll () {
      this.slider = new BScroll('.slide-wrapper', {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 100,
          interval: this.interval,
          speed: 300,
          autoplay: this.autoPlay,
          loop: this.loop
        },
        momentum: false,
        bounce: false,
        stopPropagation: true,
        click: true,
        probeType: 2
      })
      this._initSliderWidth()
      this.slider.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
    },
    _initSliderWidth () {
      const slideContentEl = this.$refs.slideContentEl
      this.slideChildren = slideContentEl.children
      this.nums = this.loop ? (slideContentEl.children.length - 2) : slideContentEl.children.length
      console.dir(this.slider)
      this.slideChildren.forEach(item => {
        addClass(item, 'slide-item')
      })
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .slide-wrapper
    position: relative
    min-height: 1px
    overflow: hidden

    .slide-content
      white-space: nowrap
      font-size: 0

      .slide-item
        display: inline-block
        width: 100%
        text-align: center

        a
          width: 100%
          display: block

          img
            width: 100%

    .dots-wrapper
      position: absolute
      bottom: 10px
      left: 50%
      transform: translateX(-50%)

      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: #eee

        &.active
          width: 20px
          background: $color-theme
          border-radius: 5px
</style>
