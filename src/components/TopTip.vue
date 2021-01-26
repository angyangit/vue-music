<template>
  <transition name='slide'>
    <section class='top-tip-root' v-show='showFlag'>
      <slot></slot>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'TopTip',
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      console.log('toptip  show')
      this.showFlag = true
      setTimeout(() => {
        this.showFlag = false
      }, 2000)
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>

<style scoped lang='sass'>
  .top-tip-root
    top: 0
    z-index: 1003
    left: 0
    width: 100%
    position: fixed

    &.slide-enter-active, &slide-leave-active
      transition: all 1s

    &.slide-enter, &slide-leave-to
      transform: translateY(-100%)
</style>
