<template>
    <div class="game-list"
        :style="{height: height}"
    >
        <div class="left"><span class="iconfont">&#xe661;</span></div>
        <div class="right"><span class="iconfont">&#xe662;</span></div>
        <div class="list-item" v-for="n in 9" :keys="n"></div>
    </div>
</template>
<script>
  export default {
    name: 'gameList',
    data() {
      return {}
    },
    props: {
      height: String
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss">
.game-list{
  background: rgba(255,0,255, .2);
  font-size: 0;
  white-space: nowrap;
  padding: 0 25px;
  position: relative;
  .left, .right{
    width: 25px;
    height: 100%;
    border:1px solid rgba(0,0,0,0.05);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    cursor: pointer;
    background: white;
  }
  .left{
    left: 0;
  }
  .right{
    right: 0;
  }
  .list-item{
    width: 220px;
    border:1px solid rgba(0,0,0,0.1);
    display: inline-block;
    height: 100%;
  }
}
</style>
