<template>
    <div class="header">
        <h3>Jiu.Shu_</h3>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="stylus">
    @keyframes pageUp {
        0% {
            color #FAC653
        }
        50% {
            color #6a60bf
        }
        100% {
            color #FAC653
        }
    }
    .header
        position fixed
        width 100%
        top 0
        height 50px
        background-color #181531
        box-shadow -1px 1px 3px 0px #000000
        z-index 99
        h3
            color #FAC653
            text-align center
            font-size 17px
            font-weight 700
            line-height 50px
            animation pageUp 5s linear infinite
            
</style>
