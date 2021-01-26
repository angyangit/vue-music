<template>
  <transition name="confirm-anim">
    <section class='confirm-dialog-root'
             v-show='showDialog'
             @click.stop>
      <section
        class='confirm-dialog-warper'
      >
        <transition name="confirm-zoom">

          <section class='confirm-dialog-content'
                   v-show='showDialog'>
            <h1
              class='confirm-dialog-title'
              v-if='title'>{{title}}</h1>
            <h2
              class='confirm-dialog-content'
              v-if='content'>{{content}}</h2>
            <div class='btn-group'>
        <span
          class='confirm-dialog-cancel'
          v-if='cancelText'
          @click.stop='cancel'>
          {{cancelText}}
        </span>
              <span class='line'></span>
              <span
                class='confirm-dialog-confirm'
                v-if='confirmText'
                @click.stop='confirm'>
          {{confirmText}}
        </span>
            </div>
          </section>
        </transition>
      </section>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    cancel () {
      this.$emit('dialogCancel')
    },
    confirm () {
      this.$emit('dialogConfirm')
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"

  .confirm-dialog-root
    left: 0
    right: 0
    bottom: 0
    z-index: 1002
    position: fixed
    background-color: rgba(0, 0, 0, .8)
    top: 0

    &.confirm-anim-enter-active
      animation: confirm-anim-in .5s

    &.confirm-anim-leave-active
      animation: confirm-anim-in .5s reverse

    .confirm-dialog-warper
      top: 50%
      left: 10%
      width: 100%
      width: 80%
      transform: translateY(-50%)
      position: absolute

      .confirm-zoom-enter-active
        animation: confirm-zoom-in .5s

      .confirm-zoom-leave-active
        animation: confirm-zoom-out .5s

      .confirm-dialog-content
        background-color: white
        border-radius: 5px

        .confirm-dialog-title
          font-weight: 700
          font-size: 16px
          padding: 10px 0
          text-align: center
          color: $color-text

        .confirm-dialog-content
          color: $color-text-l
          padding: 10px 5px 20px 0
          text-align: center
          font-size: 14px

        .btn-group
          line-height: 40px
          display: flex
          border-top: 1px solid #eee

          .line
            width: 1px
            background: #eee

          .confirm-dialog-cancel
            font-weight: 700
            font-size: 16px
            flex-grow: 1
            text-align: center
            color: $color-text

          .confirm-dialog-confirm
            font-weight: 700
            font-size: 16px
            flex-grow: 1
            text-align: center
            color: $color-theme

  @keyframes confirm-anim-in
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom-in
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)

  @keyframes confirm-zoom-out
    0%
      transform: scale(1)
    100%
      transform: scale(0)
</style>
