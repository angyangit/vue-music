<template>
  <div class="empty-view">
    <img class="empty-img" src="../assets/logo.png"/>
    <p class="tip">{{msgTip}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Emptyview',
    props: {
      msgTip: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  .empty-view
    width: 100%
    height: 100%
    position flex
    flex-direction column
    justify-content center
    align-items center
    .empty-img
      width: 50%
      align-items center
      margin 0 auto
      transform translateX(25vw)
    .tip
      font-size 16px
      margin-top 10px
      text-align center
      color $color-text-mid

</style>
