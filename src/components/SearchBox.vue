<template>
  <div class="search-warper">
    <div class="search-box">
      <i class="icon-search"
      ></i>
      <input
        ref="query"
        v-model="keyword"
        class="ipt-key" :placeholder="place"
        @blur="blur"
        @focus="focus"
        @keyup.enter="submit"
      />
      <i @click="clean" class="icon-clean"></i>
    </div>
    <div v-if="keyLocalShow&&keyLocalList" class="key-panel">
      <cube-scroll
        :data="keyLocalList">
        <ul>
          <li class="local-key" v-for="(item,index) in keyLocalList" :key="index"
              @click="localClick(item)">
            {{item}}
          </li>
        </ul>
      </cube-scroll>
    </div>

    <div v-if="mData&&contentShow&&notSub" class="data-panel">
      <cube-scroll
      >
        <div class="song">
          <div class="left">
            <i @click="clean" class="icon-song left-ic"></i>
            <span class="left-tip">单曲</span>
          </div>
          <div class="right">
            <ul v-if="mData&&mData.song&&mData.song.itemlist">
              <li class="sing-warper" v-for="(item,index) in mData.song.itemlist" :key="index">
                <span class="song-name">{{item.name}}</span>
                <span class="song-singer">-{{item.singer}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="singer">
          <div class="left">
            <i @click="clean" class="icon-singer left-ic"></i>
            <span class="left-tip">歌手</span>
          </div>
          <div class="right">
            <ul v-if="mData&&mData.singer&&mData.singer.itemlist">
              <li class="sing-warper" v-for="(item,index) in mData.singer.itemlist" :key="index">
                <span class="song-name">{{item.name}}</span>
                <span class="song-singer">-{{item.singer}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="album">
          <div class="left">
            <i @click="clean" class="icon-album left-ic"></i>
            <span class="left-tip">专辑</span>
          </div>
          <div class="right">
            <ul v-if="mData&&mData.album&&mData.album.itemlist">

              <li class="sing-warper" v-for="(item,index) in mData.album.itemlist" :key="index">
                <span class="song-name">{{item.name}}</span>
                <span class="song-singer">-{{item.singer}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mv">
          <div class="left">
            <i @click="clean" class="icon-mv left-ic"></i>
            <span class="left-tip">MV</span>
          </div>
          <div class="right">
            <ul v-if="mData&&mData.mv&&mData.mv.itemlist">

              <li class="sing-warper" v-for="(item,index) in mData.mv.itemlist" :key="index">
                <span class="song-name">{{item.name}}</span>
                <span class="song-singer">-{{item.singer}}</span>
              </li>
            </ul>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import {debounce} from "common/js/util"
  import {saveSearch, loadSearch, deleteSearch} from "common/js/cache"

  export default {
    name: 'Loading',
    props: {
      msg: String,
      mData: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {},
    data() {
      return {
        keyword: '',
        place: '搜索关键字',
        keyLocalList: [],
        keyLocalShow: false,
        contentShow: false,
        notSub: true
      }
    },
    created() {
      this.$watch('keyword', debounce((newQuery) => {
        if (newQuery) {
          this.notSub = true
          this.keyLocalShow = false
          this.contentShow = true
        } else {
          this.contentShow = false
          this.keyLocalShow = true
        }
        this.$emit('keywordChange', newQuery)
      }, 800))
    },
    methods: {
      blur() {
        this.$refs.query.blur()
        this.keyLocalShow = false
        this.contentShow = false
        this.place = '搜索关键字'
        if (this.keyword) {
          loadSearch().forEach((item, index) => {
            if (index > 5) {
              deleteSearch(item)
            }
          })
          saveSearch(this.keyword)
        }
      },
      focus() {
        this.keyLocalShow = true
        this.place = ''
        if (this.keyword === '') this.keyLocalList = loadSearch()
      },
      clean() {
        this.keyLocalShow = false
        this.contentShow = false
        this.keyword = ''
      },
      submit() {
        this.keyLocalShow = false
        this.contentShow = false
        if (this.keyword) {
          loadSearch().forEach((item, index) => {
            if (index > 9) {
              deleteSearch(item)
            }
          })
          saveSearch(this.keyword)
        }
        this.$emit('keywordSearch', this.keyword)
        this.$refs.query.blur()
      },
      localClick(key) {
        this.keyword = key
        this.notSub = false
        this.$emit('keywordSearch', this.keyword)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  @import 'common/stylus/mixin'
  .search-warper
    position relative
    top 0
    height: 40px
    left 0
    z-index 10
    .search-box
      width 100%
      background-color rgba(0, 0, 0, .6)
      border 1px solid #ccc
      display flex
      height: 40px
      padding 0 10px
      position absolute
      top 0
      left 0
      box-sizing border-box
      .ipt-key
        background rgba(0, 0, 0, 0)
        flex 1
        padding 0 10px
        margin 0 10px
        outline: none
        color white
        &::placeholder
          color: #eee
      .icon-search
        line-height 40px
        font-size: 30px
        color: #ccc
      .icon-clean
        line-height 40px
        font-size: 24px
        color: #ccc
    .key-panel
      background-color white
      position absolute
      width: 100%
      top 40px
      left 0
      border 1px solid #ccc
      height: 150px
      .local-key
        padding-left 16px
        color black
        border-bottom 1px solid #eee
        line-height 40px
    .data-panel
      background-color white
      position absolute
      width: 100%
      top 40px
      box-sizing border-box
      left 0
      border 1px solid #ccc
      .left-ic
        font-size: 16px
        color: #aaa
        line-height 30px
      .left-tip
        line-height 30px
        margin-left 10px
        font-size: 18px
      .song
        display flex
      .singer
        display flex
      .album
        display flex
      .mv
        display flex
      .right
        flex 1
        flex-grow 1
        padding-top 10px
        no-wrap()
        .sing-warper
          no-wrap()
          padding 5px 4px
        .song-singer
          color #ccc
          font-size 10px
      .left
        padding 10px 4px
        width: 80px
        border-right 1px solid #ccc
</style>
