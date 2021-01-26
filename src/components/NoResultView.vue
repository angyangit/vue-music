<template>
  <div class='noresult-root'>
    <div class='noresult-warper'>
      <img class='logo' src='https://y.qq.com/mediastyle/mod/mobile/img/logo.svg'/>
      <h1 class='text'>暂无数据</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoResultView'
}
</script>

<style scoped lang='sass'>
  .noresult-root
    width: 100%
    height: 100%

    .noresult-warper
      top: 50%
      left: 50%
      transform: translate3d(-50%, -50%, 0)
      position: absolute

      .logo
        width: 60px
        height: 60px

      .text
        font-size: 18px
        color: #aaa
        vertical-align: center
</style>
