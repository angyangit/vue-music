<template>
  <section class='circle-progress-root'>
    <svg width="60" height="60" version="1.1"
         viewBox='0 0 60 60'
         xmlns="http://www.w3.org/2000/svg">
      <circle class='progress-bg' cx="30" cy="30" r="27"/>
      <circle class='progress-run' cx="30" cy="30" r="27"
              :stroke-dasharray='dasharray'
              :stroke-dashoffset='dashoffset'/>
    </svg>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'CircleProgressBar',
  props: {
    progressPercent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dasharray: Math.PI * 54
    }
  },
  computed: {
    dashoffset () {
      return (1 - this.progressPercent) * this.dasharray
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .circle-progress-root
    position: relative

    .progress-bg
      stroke-width: 4px
      fill: transparent
      stroke: $color-theme-tran

    .progress-run
      stroke-width: 4px
      fill: transparent
      stroke: $color-theme
</style>
