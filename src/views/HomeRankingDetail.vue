<template>
  <div class="home-rank-detail">
    <cube-scroll
      ref="scroll">
      <div class="warper">
        <div class="img-warper">
          <i @click="goBack" class="icon-back">返回</i>
          <img class="logo"
               :src="this.data.data.mbFrontPicUrl ? this.data.data.mbFrontPicUrl : this.data.data.headPicUrl"/>
        </div>
        <h1 class="title">{{data.data.title}}</h1>
        <p class="update-time">{{data.data.updateTime}}</p>
        <p class="sing-num">排行榜 {{data.songInfoList.length}}</p>
        <ul class="sing-list">
          <li class="sing-item" v-for="(item,index) in data.songInfoList" :key="index">
            <div class="item-rank">
              <p class="rank-num">{{index}}</p>
            </div>
            <div class="sing-info">
              <p class="sing-name">{{item.title}}</p>
              <p class="auto-name">
                {{getAuth(item.singer)}}
              </p>
            </div>
          </li>
        </ul>
        <h1 class="sing-intro">歌单简介</h1>
        <p class="sing-intro-content">{{data.data.intro}}</p>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import {getRankingDetail} from "api/server"

  export default {
    props: {
      msg: String
    },
    computed: {},
    data() {
      return {
        data: {}
      }
    },
    created() {
      let period = this.$route.query.period
      let topId = this.$route.query.topId
      console.log('00000000', topId)

      getRankingDetail(topId, period).then((res) => {
        this.data = res.detail.data
        console.log('getRankingDetail', this.data)
      })
    },
    methods: {
      goBack() {
        console.log("----")
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      getAuth(res) {
        let str = ''
        if (res && res.length > 0) {
          res.forEach((item) => {
            str += item.name + '  '
          })
        }
        return str
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  @import 'common/stylus/mixin'
  .home-rank-detail
    height: 100%
    width: 100%
    position fixed
    top 0
    left 0
    z-index 1000
    background-color #fafafa
    .warper
      margin-bottom 30px
      .img-warper
        width: 200px
        height: 200px
        text-align center
        margin 20px auto
        border 1px solid #f1f1f1
        border-radius 10px
        box-shadow 5px 5px 5px #ccc
        position relative
        .logo
          width: 200px
          border-radius 5px
          height: 200px
        .icon-back
          position absolute
          top 10px
          z-index 1000
          font-size 20px
          color $color-theme
          left 10px
      .title
        color $color-text-main
        text-align center
        font-weight 800
        font-size 28px
        line-height 35px
      .update-time
        color $color-text-mid
        text-align center
        font-size 18px
        line-height 30px
      .sing-num
        color $color-text-mid
        font-weight 800
        line-height 20px
        margin-top 20px
        font-size 18px
      .sing-item
        display flex
        padding 10px 0
        border-radius 4px
        background-color white
        margin 10px
        box-shadow 5px 5px 5px #eee
        margin-top
        .item-rank
          text-align center
          .rank-num
            color $color-theme
            font-size 22px
            font-size 800
            padding 0 20px
            line-height: 50px
        .sing-info
          flex-grow 1
          width: 100%
          height: 50px
          padding-right 10px
          no-wrap()
          .sing-name
            color $color-text-main
            font-size 18px
            font-size 800
            line-height: 30px
            no-wrap()
          .auto-name
            no-wrap()
            color $color-text-main
            font-size 14px
            line-height: 20px
            width 100%
      .sing-intro
        font-size 16px
        font-weight 700
        margin-top 20px
        color $color-text-main
      .sing-intro-content
        padding 10px 10px
        color $color-text-mid
        line-height: 25px
        font-size 12px
</style>
