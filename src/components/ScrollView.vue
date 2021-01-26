<template>
  <div ref='scrollViewRoot'>
    <div class='scroll-content'>
      <slot/>
      <div v-if='pullUpLoad' class="pullup-tips">
        <span>{{getPullUpTip}}</span>
      </div>
    </div>
    <slot name='exContent'></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)
export default {
  name: 'ScrollView',
  data () {
    return { isPullUpLoad: false }
  },
  computed: {
    getPullUpTip () {
      let pullUpTip = '上拉加载更多'
      if (this.isDataLoadFinsh) {
        pullUpTip = '没有更多数据'
      } else if (this.isPullUpLoad) {
        pullUpTip = '正在加载...'
      }
      return pullUpTip
    }
  },
  props: {
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    isDataLoadFinsh: {
      type: Boolean,
      default: false
    },
    reqData: {
      type: Array,
      default: null
    },
    scrollListener: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 1
    },
    eventPassthrough: {
      type: String,
      default: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScollViewBScroll()
    }, 20)
  },
  methods: {
    _initScollViewBScroll () {
      this.scrollview = new BScroll(this.$refs.scrollViewRoot, {
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        momentum: true,
        bounce: true,
        // 是否阻止事件冒泡。多用在嵌套 scroll 的场景
        stopPropagation: false,
        click: true,
        pullUpLoad: this.pullUpLoad,
        probeType: this.probeType,
        // 有时候我们使用 BetterScroll 在某个方向模拟滚动的时候，希望在另一个方向保留原生的滚动
        eventPassthrough: this.eventPassthrough
      })
      if (this.pullUpLoad) {
        this.scrollview.on('pullingUp', this._pullingUpHandler)
      }
      if (this.scrollListener) {
        const that = this
        this.scrollview.on('scroll', (position) => {
          that.$emit('scrollListener', position)
        })
      }
      // console.log('scrollView=>', this.scrollview)
    },
    _pullingUpHandler () {
      this.isPullUpLoad = true
      this.$emit('pullingUpHandler')
    },
    refresh () {
      console.log('refresh')
      setTimeout(() => {
        if (this.scrollview) {
          this.scrollview.refresh()
          if (this.pullUpLoad) {
            this.scrollview.finishPullUp()
            this.isPullUpLoad = false
          }
        }
      }, 20)
    },
    scrollTo () {
      this.scrollview && this.scrollview.scrollTo.apply(this.scrollview, arguments)
    },
    scrollToElement () {
      this.scrollview && this.scrollview.scrollToElement.apply(this.scrollview, arguments)
    }
  },
  watch: {
    reqData () {
      this.refresh()
    }
  }

}
</script>

<style scoped lang='sass'>
  .pullup-tips
    text-align: center
    color: #7e8c8d
    font-size: 12px
    padding: 10px 0
</style>
