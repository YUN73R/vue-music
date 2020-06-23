<template>
    <div class="loading" :style="{ top: top }" v-show="isShow">
        <div class="loading_dh"></div>
        <p>加载中...</p>
    </div>
</template>

<script>
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: true
            },
            top: {
                type: String,
                default: '50%'
            }
        }
    }
</script>

<style lang="stylus">
.loading
    position fixed
    z-index 96;
    left 50%
    transform translate(-50%, -50%) 
    .loading_dh
        
        width 100%
        height 100%
        width 30px
        height 30px
        border-radius 100%
        border 3px #F5FCFF solid
        border-right-color #00B26A
        border-top-color #00B26A
        border-bottom-color #00B26A
        margin 250px auto 20px
        animation loading 2s linear infinite
    p
        display block
        font-size 15px
        text-align center
        color #00B26A
@keyframes loading
    0%
        transform rotate(0deg)
    100%
        transform rotate(360deg)
</style>
