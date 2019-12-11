<template>
  <div class="home-search">
    <div class="search-bar">
      <search-box @keywordChange="keywordChange"
                  @keywordSearch="keywordSearch"
                  :mData="mData"/>
      <div class="hot-key-warper clear-fix">
        <span class="hot-key"
              v-for="(item,index) in getHotkey"
              :key="index">{{item.k}}</span>
      </div>
    </div>
    <div class="content-warper">
      <cube-tab-bar
        v-model="selectedLabelSlots"
        show-slider
        useTransition>
        <cube-tab
          v-for="(item) in tabs"
          :label="item.label"
          :key="item.val"
          :value="item.val"
          @click="clickHandler">
        </cube-tab>
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              <ul class="album-warper" v-if="albumList&&albumList.length>0">
                <li class="album-item" v-for="(item,index) in albumList" :key="index">
                  <img class="album-img" :src="item.albumPic"/>
                  <div class="album-content">
                    <p class="album-name">{{item.albumName}}</p>
                    <div class="top">
                      <p class="album-singer">{{item.singerName}}</p>
                      <p class="album-time">{{item.publicTime}}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="empty" v-else>
                <empty-view msgTip='暂无数据'/>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              <ul class="mv-warper clear-fix" v-if="mvList&&mvList.length>0">
                <li class="mv-item" v-for="(item,index) in mvList" :key="index">
                  <div class="mv-item-warper">
                    <img class="mv-img" :src="item.mv_pic_url"/>
                    <p class="mv-name">{{item.mv_name}}</p>
                    <p class="mv-singer">{{item.singer_name}}</p>
                  </div>
                </li>
              </ul>
              <div class="empty" v-else>
                <empty-view msgTip='暂无数据'/>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll
              :options="scrollOptions">
              <ul class="song-warper" v-if="songList&&songList.length>0">
                <div class="song-item-div">
                  <p class="song-name">歌曲</p>
                  <p class="song-singer">歌手</p>
                  <p class="song-album">专辑</p>
                </div>
                <li class="song-item" v-for="(item,index) in songList" :key="index">
                  <p class="song-name">{{item.songname}}</p>
                  <p class="song-singer">{{item.singer[0].name}}</p>
                  <p class="song-album">{{item.albumname}}</p>
                </li>
              </ul>
              <div class="empty" v-else>
                <empty-view msgTip='暂无数据'/>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              {{tabs[3].label}}
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              {{tabs[4].label}}
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              {{tabs[5].label}}
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </div>
</template>

<script>
  import {getSearchLoveTip, getSearchSimple, getSearchClient} from 'api/server'
  import SearchBox from 'components/SearchBox'
  import EmptyView from 'components/EmptyView'

  export default {
    components: {
      SearchBox,
      EmptyView
    },
    computed: {
      initialIndex() {
        let index = 0
        index = this.findIndex(this.tabs, item => item.val === this.selectedLabelSlots)
        return index
      },
      getHotkey: function () {
        let hotList = []
        if (this.hotkey) {
          this.hotkey.forEach((item, index) => {
            if (index < 6) hotList.push(item)
          })
        }
        return hotList
      }
    },
    props: {
      msg: String
    },
    data() {
      return {
        keySearch: '',
        hotkey: [],
        mData: {},
        scrollOptions: {
          directionLockThreshold: 0
        },
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        selectedLabelSlots: 1,
        tabs: [{
          val: 1,
          label: '专辑'
        }, {
          val: 2,
          label: 'MV'
        }, {
          val: 3,
          label: '单曲'
        }, {
          val: 4,
          label: '歌单'
        }, {
          val: 5,
          label: '用户'
        }, {
          val: 6,
          label: '歌词'
        }],
        songList: [],
        singerList: [],
        albumList: [],
        mvList: []

      }
    },
    created() {
      getSearchLoveTip().then((res) => {
        this.hotkey = res.data.hotkey
      })
      // this._getSearchSimple('%27%27')
    },
    methods: {
      keywordChange(keyword) {
        this.keySearch = keyword
        // this._getSearchSimple(keyword)
      },
      keywordSearch(keyword) {
        this.albumList = []
        this.mvList = []
        this.songList = []
        this._getSearchClient(keyword, 'ablum')
      },
      clickHandler(label) {
        console.log(label)
      },
      changePage(current) {
        this.selectedLabelSlots = this.tabs[current].val
        console.log('changePage=>' + current + '    ' + this.selectedLabelSlots)
        if (this.keySearch) {
          if (this.selectedLabelSlots === 1 && this.albumList.length === 0) {
            this._getSearchClient(this.keySearch, 'ablum')
          } else if (this.selectedLabelSlots === 2 && this.mvList.length === 0) {
            this._getSearchClient(this.keySearch, 'mv')
          } else if (this.selectedLabelSlots === 3 && this.songList.length === 0) {
            this._getSearchClient(this.keySearch, 'song')
          }
        }
      },
      scroll(pos) {
      },
      findIndex(ary, fn) {
        if (ary.findIndex) {
          return ary.findIndex(fn)
        }
        /* istanbul ignore next */
        let index = -1
        /* istanbul ignore next */
        ary.some(function (item, i, ary) {
          const ret = fn.call(this, item, i, ary)
          if (ret) {
            index = i
            return ret
          }
        })
        /* istanbul ignore next */
        return index
      },
      _getSearchSimple(key) {
        getSearchSimple(key).then((res) => {
          this.mData = res.data
        })
      },
      _getSearchClient(key, tag) {
        getSearchClient(key, tag).then((res) => {
          if (tag === 'song') {
            this.songList = res.data.song.list
          } else if (tag === 'ablum') {
            this.albumList = res.data.album.list
          } else if (tag === 'mv') {
            this.mvList = res.data.mv.list
          }
        })
      }

    }
  }
</script>
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  @import 'common/stylus/mixin'

  .home-search
    height: 100%
    width: 100%
    position relative
    top 0
    background-color white
    .search-bar
      width: 100%
      background url("https://y.gtimg.cn/mediastyle/yqq/img/bg_search.jpg") no-repeat center
      background-size cover
      padding 5px 20px
      box-sizing border-box
      .hot-key-warper
        margin 5px 0
        .hot-key
          padding 4px 8px
          margin 3px 3px
          border 1px solid white
          color white
          float left
          font-size 12px
          border-radius 5px
          background-color rgba(0, 0, 0, .6)
    .content-warper
      width 100%
      height: 100%
      .tab-slide-container
        width 100%
        height: 100%
        .empty
          position absolute
          top 50%
          transform translateY(60px)
        .song-warper
          margin-bottom 100px
          padding-bottom 100px
          .song-item-div
            color black
            padding 10px 10px
            display flex
            justify-content space-around
          .song-item
            padding 10px 10px
            display flex
            &:nth-child(2n)
              background-color #eee
            .song-name
              color $color-text-main
              flex 1
              hight: auto
              text-align center
              word-break: break-all
              word-wrap: break-word
              overflow hidden
            .song-singer
              color $color-text-mid
              flex 1
              no-wrap()
              text-align center
            .song-album
              text-align center
              flex 1
              no-wrap()
              color $color-text-mid
      .album-warper
        margin-bottom 150px
        padding-bottom 150px
        .album-item
          display flex
          margin 8px
          background-color #f1f1f1
          border 1px solid #ccc
          border-radius 5px
          height: 80px
          .album-img
            width: 80px
          .album-content
            padding 10px
            display flex
            flex 1
            justify-content space-between
            flex-direction column
            .top
              display flex
              justify-content space-between
              .album-name
                flex 1
                color black
                no-wrap()
              .album-time
                color #ccc
      .mv-warper
        margin-bottom 150px
        padding-bottom 150px
        background-color #f1f1f1
        .mv-item
          width: 50%
          float left
          .mv-item-warper
            box-sizing border-box
            background-color white
            border 1px solid #eee
            margin 5px 4px
            border-radius 5px
            box-shadow 4px 4px 4px #ccc
            .mv-img
              width: 100%
              border-radius 5px 5px 0 0
            .mv-name
              padding 5px 0
              no-wrap()
              text-align center
            .mv-singer
              no-wrap()
              text-align center
              padding 5px 0
</style>
