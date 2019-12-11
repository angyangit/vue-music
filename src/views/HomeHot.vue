<template>
  <div class="home-hot">
    <cube-index-list
      ref="indexList"
      :speed=3000
      :data="resData">
      <cube-index-list-group v-for="(group, index) in resData" :key="index" :group="group">
        <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem">
          <div class="custom-item">
            <img class="avatar" :src="item.avatar">
            <span class="name">{{item.name}}</span>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
      <span class="custom-nav-item" slot="nav-item" slot-scope="props">{{props.item}}</span>
    </cube-index-list>
    <router-view/>
  </div>
</template>

<script>
  import {getSingerListJsonp} from "api/server"
  import {Singer} from "common/bean/Singer"
  import {mapMutations} from 'vuex'
  import {SET_SINGER} from "store/mutation-types"

  export default {
    props: {
      msg: String
    },
    data() {
      return {
        singList: [],
        resData: []
      }
    },
    created() {
      getSingerListJsonp(1, 100).then(data => {
        this.resData = []
        if (data.code === 0) {
          if (this.singList.length > 0) {
            this.singList = this.singList.concat(data.data.list)
          } else {
            this.singList = data.data.list
          }
          this._handlerOriginData()
        }
      })
    },
    methods: {
      ...mapMutations({
        setSinger: SET_SINGER
      }),
      selectItem(item) {
        this.setSinger(item)
        this.$router.push({
          path: `/hot/${item.id}`
        })
      },
      clickTitle(title) {
        console.log(title)
      },
      _handlerOriginData() {
        let map = {
          hot: {
            name: '热门',
            items: []
          }
        }
        this.singList.forEach((item, index) => {
          if (index < 10) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              name: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        console.dir(map)

        for (let key in map) {
          let val = map[key]
          if (key !== '9' && val.name !== '热门') {
            this.resData.push(val)
          }
        }
        this.resData.sort((a, b) => {
          return a.name.charCodeAt(0) - b.name.charCodeAt(0)
        })
        console.dir(this.resData)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  .home-hot
    height: 100%
    width: 100%
    position relative
    top 0
    background-color #f1f1f1
    .cube-index-list-content
      background-color: #222
      color: #909090
    .cube-index-list-group
      padding-bottom: 30px
    .cube-index-list-anchor
      background-color: #333
      height: 30px
      line-height: 30px
      padding: 0 0 0 20px
    .custom-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-main
        font-size: $font-size-medium
    .cube-index-list-nav
      padding: 20px 0
      border-radius: 10px
      background: rgba(0, 0, 0, .3)
      > ul
        > li
          padding: 3px
          &.active
            .custom-nav-item
              color: #ffcd32
    .custom-nav-item
      font-size: 12px
      color: #909090
    >>> .cube-loading-spinner
      background-color #31c27c
    >>> .cube-pulldown-loaded
      color #31c27c
</style>
