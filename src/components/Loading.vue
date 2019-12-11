<template>
  <div class="loading">
    <div class="warper" v-if="isShow">
      <div class="content">
        <div class="loading-img"></div>
        <p class="tip">正在加载...</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      msg: String
    },
    data() {
      return {isShow: false}
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  .loading
    .warper
      position fixed
      width 100%
      height: 100%
      top 0
      left 0
      background-color $color-mask
      .content
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
        .loading-img
          width: 50px
          height: 50px
          background url("assets/loading.gif") no-repeat center
          background-size 50%
        .tip
          font-size 8px /*no*/
          color white
</style>
