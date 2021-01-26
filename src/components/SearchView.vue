<template>
  <section class='search-comp-root' ref='searchViewWarper'>
    <i class='icon icon-search' :class='{"focus-color":focus}'/>
    <input type='text'
           class='search-ipt'
           v-model='queryStr'
           :placeholder='placeholder'
           @focus='onFocus'
           @blur='onBlur'
           ref='query'/>
    <i class='icon icon-dismiss'
       :class='{"focus-color":focus}'
       @click='clear'/>
  </section>
</template>

<script>
import { debounce } from '../common/js/util'

export default {
  name: 'SearchView',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      focus: false,
      queryStr: ''
    }
  },
  created () {
    this.$watch('queryStr', debounce(() => {
      this.$emit('searchQuery', this.queryStr)
    }, 400))
  },
  methods: {
    onFocus () {
      this.focus = true
      this.$refs.searchViewWarper.style.border = '1px solid rgba(34, 213, 156, 1)'
    },
    onBlur () {
      console.log('onAbort')
      this.focus = false
      this.$refs.searchViewWarper.style.border = '1px solid #ccc'
    },
    clear () {
      this.queryStr = ''
      this.$refs.query.focus()
    },
    setQueryKey (queryKey) {
      this.queryStr = queryKey
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .search-comp-root
    height: 35px
    width: 100%
    border-radius: 5px
    border: 2px solid #ccc
    position: relative

    .icon
      color: #ccc
      line-height: 35px

    .icon-search
      top: 0
      left: 10px
      font-size: 20px
      position: absolute

    .icon-dismiss
      position: absolute
      top: 0
      font-size: 16px
      right: 20px

    .search-ipt
      display: inline-block
      box-sizing: border-box
      padding-left: 35px
      border-radius: 4px
      height: 100%
      outline: none
      font-size: 16px
      background: none
      width: 100%

      &:focus
        caret-color: $color-theme

      &::placeholder
        color: #ddd
</style>
