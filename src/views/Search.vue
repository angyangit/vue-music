<template>
  <div class='search-view-root'
  >
    <div class='search-warper'>
      <search-view
        ref='searchView'
        @searchQuery='searchQuery'/>
    </div>
    <div class='search-content-warper'
         ref='searchRoot'>
      <scroll-view
        class='search-content-scroll'
        ref='scrollView'
        :reqData='caclData'>
        <div class='search-nomal' v-show='!searchKey' v-if='hotKey.length>0'>
          <section class='tag-warper'>
            <h2 class='tag-lable'>
              热门搜索
            </h2>
            <tag-container
              :showRow='3'
              :tagList='hotKey'
              @toggleHeight='toggleHeight'
              @selectTag='selectTag'/>
          </section>
          <section class='history-warper' v-if='getSearchHistory.length>0'>
            <div class='history-top-warper'>
        <span class='history-lable'>
          历史搜索
        </span>
              <span class='history-clear-all'
                    @click='showHistoryClearDialog'>
            <i class="icon-clear"></i>
         </span>
            </div>
            <history-listview
              :historyData='getSearchHistory'
              @historyDeleteItem='deleteSearchHistory'
              @historyItemSelect='historyItemSelect'/>
          </section>
        </div>
      </scroll-view>
    </div>
    <div class='search-result-warper' v-show='searchKey'>
      <search-result-view
        @itemSelect='itemSelect'
        :queryKey='this.searchKey'/>
    </div>
    <confirm-dialog
      title='搜索历史'
      content='是否清空所有搜索历史'
      :showDialog='isShowHistoryClearDialog'
      @dialogCancel='dialogCancel'
      @dialogConfirm='dialogConfirm'
    />
    <transition
      name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import SearchView from '../components/SearchView'
import { getHotKey } from '../api/search'
import { ERR_OK } from '../api/config'
import TagContainer from '../components/TagContainer'
import SearchResultView from '../components/SearchResultView'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { SET_SINGER } from '../store/mutation-types'
import Singer from '../common/js/Singer'
import HistoryListview from '../components/HistoryListview'
import ConfirmDialog from '../components/ConfirmDialog'
import ScrollView from '../components/ScrollView'
import { playMixin } from '../common/js/mixin'

const TYPE_SINGER = 'singer'
export default {
  name: 'Search',
  mixins: [playMixin],
  components: {
    TagContainer,
    SearchView,
    SearchResultView,
    HistoryListview,
    ConfirmDialog,
    ScrollView
  },
  computed: {
    caclData () {
      return this.getSearchHistory.concat(this.hotKey)
    },
    ...mapGetters(['getSearchHistory'])
  },
  data () {
    return {
      hotKey: [],
      searchKey: '',
      isShowHistoryClearDialog: false
    }
  },
  created () {
    this._getHotKey()
  },
  methods: {
    handlerPlayingListUIUpdate (playList) {
      const bottom = playList.length > 0 ? 70 : 0
      this.$refs.searchRoot.style.bottom = `${bottom}px`
      this.$refs.scrollView.refresh()
    },
    searchQuery (queryStr) {
      this.searchKey = queryStr
    },
    historyItemSelect (item) {
      this.$refs.searchView.setQueryKey(item)
      this.searchKey = item
    },
    selectTag (item) {
      this.$refs.searchView.setQueryKey(item.k)
      this.searchKey = item.k
    },
    _getHotKey () {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey
        }
      })
    },
    itemSelect (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer(item.singermid, item.singername)
        console.log('singer', singer)
        this.$router.push(`/search/${singer.id}`)
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.saveSearchHistory(this.searchKey)
    },
    showHistoryClearDialog () {
      this.isShowHistoryClearDialog = true
    },
    dialogCancel () {
      this.isShowHistoryClearDialog = false
    },
    dialogConfirm () {
      this.isShowHistoryClearDialog = false
      this.clearSearchHistory()
    },
    toggleHeight () {
      console.log('toggleHeight')
      setTimeout(() => {
        this.$refs.scrollView.refresh()
      }, 500)
    },
    ...mapMutations(
      {
        setSinger: SET_SINGER
      }
    ),
    ...mapActions([
      'insertSong',
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  watch: {
    searchKey (newSearchHistory) {
      if (!newSearchHistory) {
        this.$refs.scrollView.refresh()
      }
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .search-view-root
    width: 100%
    position: fixed
    top: 95px
    bottom: 0
    box-sizing: border-box
    padding: 0 10px

    .slide-enter-active, .slide-leave-active
      transition: all 0.3s

    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)

    .search-warper
      margin-top: 10px

    .search-content-warper
      top: 50px
      bottom: 0
      bottom: 0
      left: 10px
      right: 10px
      position: absolute

      .search-content-scroll
        overflow: hidden
        height: 100%

    .tag-warper
      margin-top: 10px

      .tag-lable
        line-height: 30px
        background: white
        color: $color-text
        font-size: 16px
        padding-left: 10px
        font-weight: 700

    .history-warper
      margin-top: 20px

      .history-top-warper
        line-height: 30px
        height: 30px
        background: white

        .history-clear-all
          padding-left: 10px
          margin-right: 10px
          float: right

          .icon-clear
            line-height: 30px
            font-size: 16px

        .history-lable
          line-height: 30px
          color: $color-text
          font-size: 16px
          padding-left: 10px
          font-weight: 700

    .search-result-warper
      width: 100%
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 0

</style>
