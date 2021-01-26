<template>
  <div class='recommend-view-root'>
    <scroll-view class='scrollview-root'
                 v-if='getDataLoad'
                 :pullUpLoad='true'
                 :isDataLoadFinsh='isDataLoadFinsh'
                 @pullingUpHandler='handlerPullingUp'
                 :reqData='songList'
                 ref='scrollView'>
      <section>
        <slider>
          <div v-for='item in sliderList' :key='item.id'>
            <a :href='item.linkUrl'>
              <!--fastclick 不会拦截needsclick的class点击事件-->
              <img class="needsclick slide-img" :src='item.picUrl' @load="loadImage"/>
            </a>
          </div>
        </slider>
        <section class='mod'>
          <div class='singer-title'>
            <span>官方歌单</span>
            <span>更多 ></span>
          </div>
        </section>
        <section class='songList'>
          <span>热门推荐</span>
          <ul>
            <li class='recommend-item' v-for='(item,index) in songList' :key='index' @click='select(item)'>
              <img v-lazy='item.imgurl'>
              <section class='recommend-item-content'>
                <h1>{{item.creator.name}}</h1>
                <p>{{item.dissname}}</p>
              </section>
            </li>
          </ul>
        </section>
      </section>
    </scroll-view>
    <transition
      name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '../api/recommend'
import { ERR_OK } from '../api/config'
import Slider from '../components/Slider'
import ScrollView from '../components/ScrollView'
import { playMixin } from '../common/js/mixin'
import { mapMutations } from 'vuex'
import { SET_RECOMMENDSONG } from '../store/mutation-types'

export default {
  name: 'Recommend',
  mixins: [playMixin],
  computed: {
    getDataLoad () {
      return this.songList.length > 0 && this.sliderList.length > 0
    }
  },
  components: {
    Slider,
    ScrollView
  },
  data () {
    return {
      radioList: [],
      sliderList: [],
      songList: [],
      isDataLoadFinsh: false
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  activated () {
    console.log('activated')
    this.$refs.scrollView && this.$refs.scrollView.refresh()
  },
  methods: {
    handlerPlayingListUIUpdate (playList) {
      if (this.$refs.scrollView) {
        const bottom = playList.length > 0 ? 70 : 0
        this.$refs.scrollView.$el.style.bottom = `${bottom}px`
        this.$refs.scrollView.refresh()
      }
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderList = res.data.slider
          this.radioList = res.data.radioList
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.songList = res.data.list
        }
      })
    },
    loadImage () {
      console.log('loadImage--')
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scrollView.refresh()
      }
    },
    handlerPullingUp () {
    },
    select (item) {
      this.setRecommendsong(item)
      this.$router.push(`/recommend/${item.dissid}`)
    },
    ...mapMutations({
      setRecommendsong: SET_RECOMMENDSONG
    })
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .recommend-view-root
    position: fixed
    width: 100%
    top: 95px
    bottom: 0

    .scrollview-root
      height: 100%
      overflow: hidden

      .slide-img
        width: 100%

      .mod
        .singer-title
          overflow: hidden
          line-height: 30px
          padding: 0 10px

          span

            &:first-child
              color: $color-text
              font-size: $font-size-large
              font-weight: 700
              float: left

            &:last-child
              color: $color-text-l
              font-size: $font-size-small
              float: right

      .songList
        > span
          color: $color-theme
          font-size: $font-size-medium
          font-weight: 700
          position: relative
          margin: 10px 10px 15px 15px

          &:before
            content: ''
            width: 4px
            height: 100%
            height: 15px
            margin-top: 2px
            left: -10px
            background-color: $color-theme
            position: absolute

        .recommend-item
          margin: 5px 5px 5px 5px
          border-radius: 5px
          background: $color-white
          padding: 5px
          display: flex

          img
            border-radius: 5px
            width: 80px
            height: 80px

          .recommend-item-content
            padding-left: 12px
            display: flex
            flex-direction: column
            justify-content: space-around

            h1
              color: $color-text
              font-size: $font-size-medium
              font-weight: 700

            p
              color: $color-text-l
</style>
