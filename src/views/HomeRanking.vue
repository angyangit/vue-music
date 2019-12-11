<template>
  <div class="home-rank">
    <cube-scroll-nav
      :side="true"
      v-if="data.length"
      :data="data"
      :current="current"
      :options="options"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler">
      <cube-scroll-nav-panel
        v-for="item in data"
        :key="item.groupName"
        :label="item.groupName"
        :title="item.groupName">
        <ul>
          <li v-for="(child,index) in item.toplist" :key="index" @click="itemClick(child)">
            <div class="item-warper">
              <img class="item-img" :src="child.mbHeadPicUrl">
              <div class="item-info">
                <h1 class="item-title">{{child.title}}</h1>
                <ul class="item-info-text">
                  <li class="item-text" v-for="(song,ind) in child.song" :key="ind">
                    <span class="song-ind">{{ind}}.</span>
                    <span class="song-title">{{song.title}}</span>
                    <span class="song-name">-{{song.singerName}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <router-view/>
  </div>
</template>

<script>
  import {getRanking} from "api/server"

  export default {
    props: {
      msg: String
    },
    data() {
      return {
        data: [],
        current: this.data ? this.data[0].groupName : '',
        options: {
          startY: 0,
          click: true
        }
      }
    },
    created() {
      console.log('homeRanking-------')
      getRanking().then((res) => {
        this.data = res.topList.data.group
        this.current = this.data[0].groupName
      })
    },
    methods: {
      changeHandler(label) {
        this.current = label
        console.log('changed to:', label)
      },
      stickyChangeHandler(current) {
        console.log('sticky-change', current)
      },
      itemClick(item) {
        const toast = this.$createToast({
          time: 1000,
          txt: 'Toast time 1s'
        })
        toast.show()
        this.$router.push({name: 'HomeRankingDetail', query: {topId: item.topId, period: item.period}})
        // this.$router.push({
        //   path: `/ranking/33`
        // })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  @import 'common/stylus/mixin'
  >>> .cube-scroll-nav-main
    margin-bottom 50px

  >>> .cube-scroll-nav-panel-title
    background-color white
    line-height 30px

  >>> .cube-scroll-nav-bar-item_active
    color $color-theme

  >>> .cube-sticky-fixed
    z-index 999

  .home-rank
    height: 100%
    width: 100%
    position relative
    top 0
    background-color #f1f1f1
    .item-warper
      background-color white
      margin 5px 10px 5px 10px
      height: 100px
      border-radius 10px
      .item-img
        width: 100px
        float right
        border-radius 0 10px 10px 0
      .item-info
        width: 100%
        font-size 14px
        margin-right 120px
        box-sizing border-box
        padding 10px
        .item-title
          font-size 18px
          font-weight: 800;
          height: 22px
          color black
          no-wrap();
        .item-info-text
          display flex
          margin-top 6px
          flex-direction column
          height: 60px
          justify-content space-around
          .item-text
            no-wrap()
            .song-ind
              font-weight: 800;
              color black
            .song-title
              color #666
            .song-name
              width 100%
              color #ddd

</style>
