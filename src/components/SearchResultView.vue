<template>
  <scroll-view class='search-result-root'
               :reqData='searchList'
               :pullUpLoad='true'
               :isDataLoadFinsh='isDataLoadFinsh'
               @pullingUpHandler='pullingUpHandler'
               ref='searchScrollview'>
    <ul class='search-result-warpper'>
      <li class='search-item'
          v-for='(item,index) in searchList' :key='index'
          @click='itemClick(item)'>
        <div class="item-icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class='item-info'>
          <p class='title'>{{getInfoName(item)}}</p>
          <p class='tip' v-if='item.type !== "singer"'>{{item.singer}}</p>
        </div>
      </li>
    </ul>
  </scroll-view>
</template>

<script>
import { search } from '../api/search'
import { ERR_OK } from '../api/config'
import { createSongInfo } from '../common/js/SongInfo'
import ScrollView from './ScrollView'
import { mapMutations } from 'vuex'
import { SET_SINGER } from '../store/mutation-types'
// import Singer from '../common/js/Singer'

const TYPE_SINGER = 'singer'

export default {
  name: 'SearchResultView',
  components: {
    ScrollView
  },
  props: {
    queryKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchList: [],
      page: 1,
      isDataLoadFinsh: false
    }
  },
  methods: {
    _search (query, page, zhida, perpage) {
      search(query, page, zhida, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.hadlerRes(res.data)
        }
      })
    },
    hadlerRes (data) {
      if (!data.song.list || data.song.list.length === 0) {
        console.log('length  ', data.song.list.length)
        this.isDataLoadFinsh = true
      } else {
        if (this.page === 1) {
          if (data.zhida && data.zhida.singerid) {
            this.searchList.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
          }
        }
        this.searchList = this.searchList.concat(this._normalizeSongs(data.song.list))
      }
      console.log('hadlerRes', this.searchList)
    },
    pullingUpHandler () {
      console.log('pullingUpHandler----')
      this.page++
      this._search(this.queryKey, this.page)
    },
    getIconCls (item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getInfoName (item) {
      return item.type === TYPE_SINGER ? item.singername : item.name
    },
    _normalizeSongs (list) {
      const ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSongInfo(musicData))
        }
      })
      return ret
    },
    itemClick (item) {
      this.$emit('itemSelect', item)
      // if (item.type === TYPE_SINGER) {
      //   const singer = new Singer(item.singermid, item.singername)
      //   console.log('singer', singer)
      //   this.$router.push(`/singer/${singer.id}`)
      //   this.setSinger(singer)
      // } else {
      // }
    },
    ...mapMutations(
      {
        setSinger: SET_SINGER
      }
    )
  },
  watch: {
    queryKey (newQueryKey) {
      if (newQueryKey) {
        this.searchList = []
        this.page = 1
        this.isDataLoadFinsh = false
        this._search(newQueryKey, this.page)
      }
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .search-result-root
    overflow: hidden
    height: 100%
    width: 100%

    .search-result-warpper
      padding: 0 10px

      .search-item
        display: flex
        border-bottom: 1px solid #ddd
        align-items: center

        .item-icon
          font-size: 18px
          margin-right: 10px

        .item-info
          .title
            color: $color-text
            font-weight: 700
            line-height: 30px
            height: 30px
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
            font-size: 16px

          .tip
            color: $color-text-l
            line-height: 20px
            height: 20px
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
            font-size: 12px
</style>
