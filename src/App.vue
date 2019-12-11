<template>
  <div id="app">
    <div id="nav">
      <router-link class="recommend" tag='div' to="/recommend">推荐音乐</router-link>
      <router-link class="hot" tag='div' to="/ranking">排行榜</router-link>
      <router-link class="hot" tag='div' to="/hot">热歌榜</router-link>
      <router-link class="search" tag='div' to="/search">搜索</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <music-player/>
  </div>
</template>
<script>
  import MusicPlayer from 'components/MusicPlayer'

  export default {
    components: {
      MusicPlayer
    }
  }
</script>
<style lang="stylus" scoped>
  @import 'common/stylus/variable.styl'
  #app
    font-size: 16px /*no*/
    color $color-text
    position fixed
    top 0
    width: 100%
    height: 100%
    #nav
      position relative
      top 0
      left 0
      width: 100%
      justify-content space-around
      display flex
      line-height: 38px
      color $color-text
      font-weight 700
      background-color white
      border-bottom 1px solid $color-background /*no*/
      .recommend, .hot, .search
        padding 0 10px
      >>> .router-link-active
        border-bottom 2px solid $color-theme /*no*/
        font-size 18px /*no*/
        color $color-theme
</style>
