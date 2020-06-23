<template>
    <div class="navbar" :style="{ background: `url(${bgUrl})` }">
        <div class="back" @click="onBackHistoryHandle"></div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '详情'
            },
            bgUrl: {
                type: String,
                default: ''
            }
        },
        methods: {
            onBackHistoryHandle() {
                history.back(-1)
            }
        }
    }
</script>

<style lang="stylus">
    .navbar
        width 100%
        height 52px
        position fixed
        z-index 100
        top 0
        left 0
        background-repeat no-repeat !important
        background-position top !important
        background-size 100% !important
        // box-shadow -2px -1px 3px rgba(0,0,0,0.21)
        .back
                position absolute
                width 50px
                height 50px
                top 50%
                left 3px
                transform translateY(-50%)
                background url(../../static/ico/fanhui.png) center no-repeat
                background-size 60%
                z-index 101
        .title
            display table
            position absolute
            width 80%
            top 50%
            left 50%
            line-height 50px
            padding 0 10%
            text-align center
            transform translate(-50%, -50%)
            text-shadow 1px 1px 1px #2B2B2B
</style>
