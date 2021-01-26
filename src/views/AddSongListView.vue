<template>
  <transition name='addSongSlide'>
    <section v-show='showAddSongPop' class='add-song-list-root' @click.stop>
      <section class='add-song-header-warper'>
      <span class='add-song-header-close' @click='closePop'>
        <i class='icon-delete'></i>
      </span>
        <h1 class='add-song-header-title'>添加歌曲列表</h1>
      </section>
      <section class='search-view-warper'>
        <search-view
          ref='searchView'
          @searchQuery='searchQuery'/>
      </section>
      <section class='content-warper'>
        <div class='default-content'
             v-show='!searchKey'>
          <section class='tab-warper'>
         <span class='item-tab'
               :class='{"tab-active":isNearPlay}'
               @click='nearClick'>最近播放</span>
            <span class='item-tab'
                  :class='{"tab-active":!isNearPlay}'
                  @click='historyClick'>搜索历史</span>
          </section>
          <section class='list-warper'>
            <history-song-list
              @historySongSelect='historySongSelect'
              ref='historySongListView'
              v-show='isNearPlay'/>
            <history-listview
              v-show='!isNearPlay'
              :historyData='getSearchHistory'
              @historyDeleteItem='deleteSearchHistory'
              @historyItemSelect='historyItemSelect'/>
          </section>
        </div>
        <div class='search-result-warper' v-show='searchKey'>
          <search-result-view
            @itemSelect='itemSelect'
            :queryKey='this.searchKey'/>
        </div>
      </section>
      <top-tip ref='topTip' @click='topTipClick'>
        <div class='top-tip-warper'>
          <div class="tip-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已经添加到播放列表</span>
          </div>
        </div>
      </top-tip>
    </section>
  </transition>
</template>

<script>
import SearchView from '../components/SearchView'
import SearchResultView from '../components/SearchResultView'
import HistoryListview from '../components/HistoryListview'
import { mapActions, mapGetters } from 'vuex'
import HistorySongList from '../components/HistorySongList'
import TopTip from '../components/TopTip'

export default {
  name: 'AddSongListView',
  components: {
    SearchView,
    SearchResultView,
    HistoryListview,
    HistorySongList,
    TopTip
  },
  computed: {
    caclData () {
      return this.getSearchHistory.concat(this.hotKey)
    },
    ...mapGetters(['getSearchHistory', 'getHistorySongList'])
  },
  data () {
    return {
      searchKey: '',
      isNearPlay: true,
      showAddSongPop: false
    }
  },
  created () {
    this.$refs.historySongListView.show()
  },
  methods: {
    closePop () {
      this.hide()
    },
    show () {
      this.showAddSongPop = true
    },
    hide () {
      this.showAddSongPop = false
    },
    nearClick () {
      this.isNearPlay = true
      this.$refs.historySongListView.show()
    },
    historyClick () {
      this.isNearPlay = false
    },
    searchQuery (queryStr) {
      this.searchKey = queryStr
    },
    historyItemSelect (item) {
      this.$refs.searchView.setQueryKey(item)
      this.searchKey = item
    },
    itemSelect (item) {
      this.insertSong(item)
      this.$refs.topTip.show()
      this.saveSearchHistory(this.searchKey)
    },
    historySongSelect (song) {
      this.insertSong(song)
      this.$refs.topTip.show()
    },
    topTipClick () {
      this.$refs.topTip.hide()
    },
    ...mapActions([
      'insertSong',
      'saveSearchHistory',
      'deleteSearchHistory',
      'selectPlayAction'
    ])
  }

}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .addSongSlide-enter-active, .addSongSlide-leave-active
    transition: all 0.5s

  .addSongSlide-enter, .addSongSlide-leave-to
    opacity: 0
    transform: translateY(100%)

  .add-song-list-root
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: white
    position: fixed

    .add-song-header-warper
      height: 40px
      line-height: 40px

      .add-song-header-title
        text-align: center
        font-size: 18px
        color: $color-text

      .add-song-header-close
        line-height: 40px
        margin-right: 10px
        float: right

        .icon-delete
          color: $color-theme
          font-weight: 700
          font-size: 20px

    .search-view-warper
      padding: 0 20px

    .content-warper
      margin-top: 10px

      .tab-warper
        margin: 0 auto
        height: 30px
        width: 160px
        display: flex
        line-height: 30px

        .item-tab
          flex-grow: 1
          text-align: center
          display: inline-block
          font-size: 14px
          border: 1px solid #ccc
          color: $color-text

          &:first-child
            border-right: 0
            border-radius: 5px 0 0 5px

          &:last-child
            border-left: 0
            border-radius: 0 5px 5px 0

        .tab-active
          color: white
          border: 1px solid $color-theme
          font-weight: 700
          background-color: $color-theme

      .default-content
        .list-warper
          top: 120px
          left: 0
          right: 0
          bottom: 0
          position: absolute

    .search-result-warper
      top: 120px
      left: 0
      right: 0
      bottom: 0
      position: absolute

    .top-tip-warper
      line-height: 40px
      height: 40px
      width: 100%
      background-color: rgba(200, 200, 200, 1)

      .tip-title
        display: inline-block
        position: absolute
        left: 50%
        height: 100%
        overflow: hidden
        transform: translateX(-50%)
        font-size: 14px

        .icon-ok
          color: $color-theme

        .text
          text-align: center
          padding-left: 10px
          color: $color-theme
</style>
