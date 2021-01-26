<template>
  <section class='singer-view-root' ref='singerRoot'>
    <scroll-view
      class='singer-scrollview-root'
      ref='scrollView'
      :probeType='3'
      :reqData='singers'
      :scrollListener='true'
      @scrollListener='scrollListener'>
      <ul>
        <li class='singer-warper' v-for='(item,index) in singers' :key='index' ref='singerItem'>
          <h1 class='singer-title'>{{item.title}}</h1>
          <ul>
            <li class='singer-content' v-for='(singer) in item.items' :key='singer.id' @click='itemClick(singer)'>
              <img class='singer-avatar' v-lazy='singer.avatar'>
              <p class='singer-name'>{{singer.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>

    <!--      <template v-slot:exContent>-->
    <div class='fiexd-root'>
      <div class="list-fixed" ref="fixedTitle" v-show="getFixedTitle">
        <div class="fixed-title">{{getFixedTitle}}</div>
      </div>
    </div>
    <section
      class='anchor-warper'
      @touchstart.stop='onAnchorTouchStart'
      @touchmove.stop.prevent="onAnchorTouchMove">
      <ul>
        <li v-for='(item,index) in getAnchorList' :key='item' :data-index='index'
            :class='{"anchor-active":curentIndex===index}'>
          {{item}}
        </li>
      </ul>
    </section>
    <!--      </template>-->
    <transition
      name="slide">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { getSingerList } from '../api/singer'
import { ERR_OK } from '../api/config'
import Singer from '../common/js/Singer'
import ScrollView from '../components/ScrollView'
import { getData } from '../common/js/dom'
import { mapMutations } from 'vuex'
import { SET_SINGER } from '../store/mutation-types'
import { playMixin } from '../common/js/mixin'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
const ANCHOR_HEIGHT = 18
export default {
  name: 'Singer',
  mixins: [playMixin],
  components: { ScrollView },
  computed: {
    getAnchorList () {
      return this.singers.map((singer) => {
        return singer.title.substr(0, 1)
      })
    },
    getFixedTitle () {
      if (this.currentY > 0) {
        return ''
      }
      return this.singers && this.singers[this.curentIndex] ? this.singers[this.curentIndex].title : ''
    }
  },
  data () {
    return {
      singers: [],
      curentIndex: 0,
      currentY: -1,
      diff: -1
    }
  },
  created () {
    this.touch = {}
    this._getSingerList()
  },
  activated () {
    this.$refs.scrollView.refresh()
  },
  methods: {
    handlerPlayingListUIUpdate (playList) {
      const bottom = playList.length > 0 ? 70 : 0
      this.$refs.singerRoot.style.bottom = `${bottom}px`
      this.$refs.scrollView.refresh()
    },
    _getSingerList () {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this._handlerSingerList(res.data.list)
        }
      })
    },
    _handlerSingerList (list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      const hot = []
      const res = []
      for (const key in map) {
        const value = map[key]
        if (value.title === HOT_NAME) {
          hot.push(value)
        } else if (value.title.match(/[a-zA-Z]/)) {
          res.push(value)
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      this.singers = hot.concat(res)
    },
    onAnchorTouchStart (e) {
      const anchorIndex = getData(e.target, 'index')
      if (!anchorIndex && anchorIndex !== 0) return
      this.touch.yStart = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex

      this.$refs.scrollView.scrollToElement(this.$refs.singerItem[anchorIndex], 1000)
    },
    onAnchorTouchMove (e) {
      this.touch.yEnd = e.touches[0].pageY
      const delta = (this.touch.yEnd - this.touch.yStart) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      if (anchorIndex < 0) {
        anchorIndex = 0
      } else if (anchorIndex > this.listHeight.length - 2) {
        anchorIndex = this.listHeight.length - 2
      }
      this.$refs.scrollView.scrollToElement(this.$refs.singerItem[anchorIndex], 20)
    },
    scrollListener (pos) {
      this.currentY = pos.y
      if (this.currentY > 0) {
        this.curentIndex = 0
        return
      }
      for (let i = 0; i < this.listHeight.length; i++) {
        const startH = this.listHeight[i]
        const endH = this.listHeight[i + 1]
        if (-this.currentY >= startH && -this.currentY <= endH) {
          this.curentIndex = i
          this.diff = endH + this.currentY
          if (Math.abs(this.diff) > 30) {
            this.$refs.fixedTitle.style.transform = ''
            return
          }
          const transTop = this.diff > 0 && this.diff <= 30 ? this.diff - 30 : 0
          this.$refs.fixedTitle.style.transform = `translateY(${Math.ceil(transTop)}px)`
          return
        }
      }
      if (-this.currentY > this.listHeight[this.listHeight.length]) {
        this.curentIndex = this.listHeight.length - 2
      }
    },
    _calculateHeight () {
      this.listHeight = []
      const singerItemList = this.$refs.singerItem
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < singerItemList.length; i++) {
        const singerItem = singerItemList[i]
        height += singerItem.clientHeight
        this.listHeight.push(height)
      }
    },
    itemClick (singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.setSinger(singer)
    },
    ...mapMutations(
      {
        setSinger: SET_SINGER
      }
    )
  },
  watch: {
    singers () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .down-leave-active, .down-enter-active
    transition: all 0.4s ease

  .down-enter, .down-leave-to
    opacity: 0

  .down-leave, .down-leave-to
    transform: translateY(100%)

  .singer-view-root
    position: fixed
    width: 100%
    top: 95px
    bottom: 0

    .singer-scrollview-root
      position: relative
      top: 0
      width: 100%
      height: 100%
      overflow: hidden

      .singer-warper
        .singer-title
          color: $color-theme
          font-size: 16px
          padding-left: 10px
          font-weight: 700
          height: 30px
          line-height: 30px
          background-color: #eee

        .singer-content
          background-color: $color-white
          display: flex
          height: 80px
          padding: 0 10px
          border-bottom: 1px solid #f1f1f1
          align-items: center

          .singer-avatar
            width: 60px
            border-radius: 50%

          .singer-name
            margin-left: 20px
            font-size: 16px

    .anchor-warper
      background-color: rgba(55, 55, 55, .3)
      color: $color-white
      font-size: 12px
      top: 50%
      transform: translateY(-50%)
      width: 20px
      text-align: center
      font-weight: 700
      border-radius: 10px
      padding: 10px 0
      position: absolute
      z-index: 1000
      right: 0

      .anchor-active
        font-size: 18px
        font-weight: 900
        color: $color-theme

    .fiexd-root
      position: absolute
      top: -1px
      left: 0
      overflow: hidden
      width: 100%
      height: 30px

      .list-fixed
        position: absolute
        top: 0
        left: 0
        background-color: #ccc
        height: 30px
        z-index: 10
        width: 100%

        .fixed-title
          color: $color-theme
          font-size: 16px
          padding-left: 10px
          font-weight: 700
          line-height: 30px
</style>
