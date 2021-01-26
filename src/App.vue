<template>
  <div id="app">
    <loading-view v-if='getLoadingState'/>
    <tool-bar/>
    <tab :tabData='tabData'/>
    <transition name="slide-page">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <player/>
  </div>
</template>
<script>
import ToolBar from './components/ToolBar'
import Tab from './components/Tab'
import LoadingView from './components/LoadingView'
import { mapGetters } from 'vuex'
import Player from './views/Player'

const tabData = {
  '/recommend': '推荐',
  '/singer': '歌手',
  '/rank': '排行',
  '/search': '搜索'
}

export default {
  data () {
    return {
      tabData: tabData
    }
  },
  computed: {
    ...mapGetters(
      [
        'getLoadingState'
      ]
    )
  },
  components: {
    ToolBar,
    Tab,
    LoadingView,
    Player
  }
}
</script>
<style scoped>
  .slide-page-leave-active {
    transition: .5s;
  }

  .slide-page-enter-active {
    transition: .5s;
  }

  .slide-page-leave-to {
    transform: translate(-100%, 0);
  }

  .slide-page-enter {
    transform: translate(100%, 0);
  }
</style>
