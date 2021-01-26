<template>
  <div class='tab-root'>
    <router-link tag='div' v-for="(value, name) in tabData" :key='name' :to='name'>
      <span>{{value}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    tabData: Object,
    default: {}
  },
  data () {
    return {}
  }

}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .tab-root
    display: flex
    display: -webkit-flex
    background: $color-white
    width: 100%
    justify-content: center
    height: $h-tab

    div
      flex-grow: 1
      text-align: center
      color: $color-background

      span
        display: inline-block
        height: 100%
        box-sizing: border-box
        color: $color-text-l
        position: relative
        font: 14px/45px sans-serif

      &.router-link-active
        color: $color-white

        span
          color: $color-theme
          font: 400 16px/45px sans-serif

          &::after
            content: ''
            height: 3px
            background-color: $color-theme
            position: absolute
            left: 50%
            margin-left: -10px
            bottom: 0
            width: 20px
</style>
