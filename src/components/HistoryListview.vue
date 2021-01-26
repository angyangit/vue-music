<template>
  <div class='history-list-root'>
    <transition-group name="list" tag="ul" class='history-list-warper' v-if='historyData&&historyData.length>0'>
      <li class='history-item-warper'
          v-for='(item,index) in historyData'
          :key='item'
          @click='historyItemSelect(item)'>
        <span class='history-title'> {{item}}</span>
        <span class='history-delete' @click.stop='deleteItem(index)'><i class='icon-delete'></i></span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'HistoryListview',
  props: {
    historyData: {
      type: Array,
      default: null
    }
  },
  methods: {
    deleteItem (pos) {
      this.$emit('historyDeleteItem', pos)
    },
    historyItemSelect (item) {
      this.$emit('historyItemSelect', item)
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .history-list-root
    padding: 0 10px
    background-color: rgba(255, 255, 255, 0.6)

    .history-item-warper
      line-height: 30px
      height: 30px
      width: 100%
      overflow: hidden
      position: relative

      &.list-enter-active, &.list-leave-active
        transition: all 0.2s

      &.list-enter, &.list-leave-to
        opacity: 0
        height: 0

      .history-title
        display: inline-block
        height: 30px
        white-space: nowrap
        color: $color-text-l
        text-overflow: ellipsis
        overflow: hidden
        font-size: 16px

      .history-delete
        position: absolute
        right: 10px
        display: inline-block
        line-height: 30px

        .icon-delete
          color: #ccc
          font-size: 14px

</style>
