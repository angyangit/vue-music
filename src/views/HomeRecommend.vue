<template>
  <div class="home-recommend">
    <cube-scroll
      :data="groupData"
    >
      <div class="banner-warper">
        <cube-slide
          v-if="banner.length>0"
          ref="slide"
          :data="banner"
        >
          <cube-slide-item
            v-for="(item, index) in banner" :key="index">
            <a :href="item.linkUrl">
              <img class="banner-img" :src="item.picUrl">
            </a>
          </cube-slide-item>
        </cube-slide>
      </div>
      <div
        :v-if='hasData'
        v-for="(item,index) in groupData"
        :key="index"
        class="item-ver">
        <h1 class="rec-singer-list-title">{{item.title_template}}</h1>
        <cube-scroll
          ref="scroll"
          :data="item.v_niche[0].v_card"
          direction="horizontal"
          class="horizontal-scroll-list-wrap">
          <ul class="child-warper">
            <div
              :v-if='(item)=>hasChildData'
              v-for="(child,indexChild) in item.v_niche[0].v_card"
              :key="indexChild"
              :class="item.title_template==='分类专区' ? 'item-hor-other':'item-hor'">
              <img class="child-img" :src="child.cover" alt="">
              <p class="child-title">{{child.title}}</p>
            </div>
          </ul>
        </cube-scroll>
      </div>
      <div class="hotkey">
        <ul v-if="hotkeyList.length>0">
          <li v-for="(item,index) in hotkeyList" :key="index">
            <div class="hotkey-item">
              <img ref="hotImg" class="hotkey-img" :src="item.pic_url" onerror="onerror=null;src='../assets/logo.png'"/>
              <div class="hotkey-content">
                <p class="hotkey-name">{{item.title}}</p>
                <p class="hotkey-des">{{item.description}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import {getRecommmend, getRecommendBanner} from 'api/server'

  export default {
    props: {
      msg: String
    },
    computed: {
      hasData() {
        return this.MusicHallHomePage && this.MusicHallHomePage.data && this.MusicHallHomePage.data.v_shelf.length
      },
      hasChildData(item) {
        return item.v_niche && item.v_niche[0].v_card
      }

    },
    data() {
      return {
        MusicHallHomePage: {},
        groupData: [],
        hotkeyList: [],
        banner: []
      }
    },
    created() {
      getRecommmend().then(res => {
        this.MusicHallHomePage = res.MusicHallHomePage
        this.groupData = this.MusicHallHomePage && this.MusicHallHomePage.data ? this.MusicHallHomePage.data.v_shelf : []
        this.hotkeyList = res.hotkey.data.vec_hotkey
      })
      getRecommendBanner().then(res => {
        this.banner = res.data.slider
      })
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  @import 'common/stylus/mixin'
  .home-recommend
    height: 100%
    .banner-warper
      .banner-img
        width 100%
    .item-ver
      .rec-singer-list-title
        border-left 3px solid $color-theme
        margin 10px
        font-weight 800
        font-size 20px /*no*/
        padding-left 10px
    .horizontal-scroll-list-wrap
      border-radius: 5px
      >>> .cube-scroll-content
        display: inline-block
      .child-warper
        white-space: nowrap
        .item-hor-other
          width 50vw
          display inline-block
          padding-left 10px
        .item-hor
          width 30vw
          display inline-block
          padding-left 10px
        .child-img
          border-radius 5px
          width: 100%
        .child-title
          font-size 12px /*no*/
          line-height 40px
          height: 40px
          no-wrap()
          text-align center
    .hotkey
      margin-bottom 50px
      padding-bottom 50px
      .hotkey-item
        display flex
        height: 50px
        vertical-align top
        background-color white
        margin 8px
        padding 8px
        .hotkey-img
          width: 20px
          height: 20px
          vertical-align top
        .hotkey-content
          display flex
          flex-direction column
          margin-left 10px
          justify-content space-between
          flex 1
</style>
