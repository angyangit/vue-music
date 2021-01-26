<template>
  <section class='songlist-root'>
    <ul v-if='songList'>
      <li class='song-warper'
          v-for='(song,index) in songList'
          :key='song.id'
          @click='songClick(song,index)'>
        <section class='rank-warper' v-if='rank'>
          <img
            :src="require(index === 0 ? '../assets/first@3x.png' : index === 1 ? '../assets/second@3x.png' : '../assets/third@3x.png')"
            class='rank-img'
            v-if='index<3'
            ref='rankImg'>
          <span v-if='index>=3'
                class='rank-num'>{{index}}</span>
        </section>
        <div class='info-warper'>
          <h1 class='song-name' v-text='song.name'></h1>
          <h1 class='song-des'>{{getDestribute(song)}}</h1>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songList: {
      type: Array,
      default: null
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  methods: {
    getDestribute (song) {
      return `${song.singer}  (${song.album})`
    },
    songClick (song, index) {
      this.$emit('songSelect', song, index)
    },
    getImg (index) {
      const imgsrc = index === 0 ? '../assets/first@3x.png' : index === 1 ? '../assets/second@3x.png' : '../assets/third@3x.png'
      return imgsrc
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .songlist-root
    background-color: #eee

    .song-warper
      background-color: $color-white
      width: 100%
      height: 80px
      padding: 10px 0
      box-sizing: border-box
      display: flex

      .rank-warper
        width: 40px
        height: 100%
        margin-left: 10px
        vertical-align: middle

        .rank-img
          vertical-align: middle
          width: 30px
          margin-top: 15px
          height: 30px

        .rank-num
          font-weight: 800
          font-size: 22px
          line-height: 60px
          width: 30px
          display: inline-block
          text-align: center
          color: $color-theme

      .info-warper
        display: flex
        margin-left: 20px
        flex-direction: column
        justify-content: space-around

        .song-name
          font-size: 18px
          font-weight: 700
          color: $color-text

        .song-des
          margin-top: 10px
          font-size: 14px
          color: $color-text-l
</style>
