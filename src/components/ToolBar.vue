<template>
  <div class='toolbar-root'>
    <span @click.stop='back' class='back'><i class='icon-back'></i></span>
    <img class='logo' src='https://y.qq.com/mediastyle/mod/mobile/img/logo.svg'/>
    <span @click='toMine' class='back'><i class='icon-mine'></i></span>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  methods: {
    back () {
      this.$router.back()
    },
    toMine () {
      this.$router.push('/mine')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .toolbar-root
    background-color: $color-theme
    height: 50px
    display: flex
    padding: 0 15px
    justify-content: space-between
    align-items: center

    .back
      font-size: 18px
      color: white

    .logo
      width: 30px
      height: 30px

    img
      width: 30px

      &:first-child
        float: right
</style>
