<template>
  <header class='topbar-root' ref='topBar'>
    <i class="icon-back" @click="back"></i>
    <span class='topbar-title' v-text='title'></span>
  </header>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    bgTransOpacity: {
      type: Number,
      default: 1
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  watch: {
    bgTransOpacity (opacity) {
      this.$refs.topBar.style.backgroundColor = `rgba(255,255,255,${opacity})`
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable.sass"
  .topbar-root
    position: absolute
    top: 0
    width: 100%
    z-index: 1000
    height: 40px
    left: 0

    .icon-back
      font-size: 16px
      line-height: 40px
      padding: 0 10px
      display: inline-block
      color: $color-theme

    .topbar-title
      font-weight: 700
      font-size: 16px
      line-height: 40px
      position: absolute
      left: 50%
      transform: translateX(-50%)
      text-align: center
      color: $color-theme
</style>
