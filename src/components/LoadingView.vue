<template>
  <div class='loading-warper'>
    <div class='loading-content'>
      <img src='../assets/loading.gif'>
      <p>正在加载...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingView'
}
</script>

<style scoped lang='sass'>
  .loading-warper
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    background-color: rgba(0, 0, 0, .6)
    z-index: 1000

    .loading-content
      position: absolute
      background-color: rgba(26, 26, 26, .2)
      text-align: center
      padding: 5px
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      border-radius: 5px

      img
        width: 40px
        height: 40px

      p
        color: #FFF
</style>
