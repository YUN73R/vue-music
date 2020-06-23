<template>
    <div class="tabbar">
        <router-link tag="div" to="/index" class="item"><span>推荐</span></router-link>
        <router-link tag="div" to='/singer' class="item"><span>歌手</span></router-link>
        <router-link tag="div" to="/rank" class="item"><span>排行</span></router-link>
        <router-link tag="div" to="/search" class="item"><span>搜索</span></router-link>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped lang="stylus">
   .tabbar
        width 100%
        display flex
        position fixed
        top 50px
        left 0
        right 0
        z-index 99
        background-color #000000
        .item 
            flex 1
            color #b9b9b9
            line-height 30px
            text-align center
            font-size 15px
            &.router-link-exact-active
                span {
                    border-bottom 2px solid #6dbfb3
                    font-weight 700
                    color #6dbfb3
                }
            span {
                display table
                margin 0 auto 3px
            }
            
</style>