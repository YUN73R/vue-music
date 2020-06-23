<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="normal">
            <div class="normal_player" v-show="fullScreen">
                <div class="bg_wrap"><img :src="currentSong.image" /></div>
                <div class="player_top">
                    <div class="back" @click="back"></div>
                    <div class="info">
                        <p>{{ currentSong.songname }}</p>
                        <p>{{ currentSong.singer }}</p>
                    </div>
                </div>
                <div class="player_midd">
                    <div class="img"><img :src="currentSong.image" /></div>
                </div>
                <div class="player_ctrl">
                    <div class="tiao"></div>
                    <div class="turn_handle">
                        <div class="item">
                            <span></span>
                        </div>
                        <div class="item">
                            <span @click="prev"></span>
                        </div>
                        <div class="item">
                            <span :class="playIcon" @click="setCtrlPlayHandle"></span>
                        </div>
                        <div class="item">
                            <span @click="next"></span>
                        </div>
                        <div class="item">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini_player" v-show="!fullScreen" @click="open">
                <div class="mini_bg" :style="{ background: `url(${currentSong.image})` }"></div>
                <div class="left">
                    <div class="img"><img :src="currentSong.image" /></div>
                    <div class="text">
                        <p>{{ currentSong.songname }}</p>
                        <p>{{ currentSong.singer }}</p>
                    </div>
                </div>
                <div class="midd"></div>
                <div class="right">
                    <div class="ctrl" :class="playIcon" @click.stop="setCtrlPlayHandle"></div>
                    <div class="list_icon"></div>
                </div>
            </div>
        </transition>
        <audio ref="audio" loop :src="currentSong.songurl"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getNewMusicUrl } from 'api/request';
export default {
    props: {},
    computed: {
        playIcon() {
            return this.playing ? 'icon_play' : ''
        },
        ...mapGetters(['fullScreen', 'playlist', 'currentSong', 'playing'])
    },
    methods: {
        back() {
            this.setFullScreen(false);
        },
        open() {
            this.setFullScreen(true);
        },
        setCtrlPlayHandle(e) {
            this.setPlayingState(!this.playing)
        },
        prev() {
            
        },
        next() {
            
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE'
        })
    },
    watch: {
        currentSong() {
            this.$nextTick(() => {
                this.$refs.audio.play()
            })
            
        },
        playing(newPlaying) {
            const audio = this.$refs.audio
            this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause()
            })
            
        }
    }
};
</script>

<style lang="stylus">
@keyframes picroll
    from
        transform rotate(0deg)
    to
        transform rotate(360deg)
.normal-enter-active, .normal-leave-active
    transition all 0.3s ease
    .player_top, .player_midd
        transition all 0.3s cubic-bezier(0, 0.67, 0.74, 1.18)
.normal-enter, .normal-leave-to
    opacity 0
    .player_top
        transform translate3d(0, -100px, 0)
    .player_midd
        transform translate3d(0, 100px, 0)
.player
    .normal_player
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 111
        background #000000
        .bg_wrap
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            z-index -1
            opacity 0.6
            -webkit-filter blur(20px)
            filter blur(20px)
            img
                width 100%
                height 100%
        .player_top
            width 100%
            height 50px
            position relative
            .back
                position absolute
                top 0
                left 10px
                width 50px
                height 50px
                background url('../../static/ico/fanhui.png') center no-repeat
                background-size 60%
                transform rotate(-90deg)
            .info
                text-align center
                padding-top 10px
                p
                    font-size 15px
                    line-height 30px
                    text-shadow 1px 1px 1px #2b2b2b
                    &:first-child
                        font-size 16px
        .player_midd
            width 100%
            .img
                border 8px solid rgba(0, 0, 0, 0.22)
                border-radius 50%
                overflow hidden
                width 4rem
                max-width 300px
                max-height 300px
                height 4rem
                margin 50px auto
                animation picroll 16s linear infinite
                img
                    width 100%
        .player_ctrl
            padding 20px
            
            .turn_handle
                display flex
                .item
                    flex 1
                    span
                        display block
                        width 35px
                        height 35px
                        margin 0 auto
                        background-position center !important
                        background-size 80% !important
                        background-repeat no-repeat !important
                        &.icon_play
                            background url(../../static/ico/stop.png) !important
                        
                    &:nth-child(1) span{
                        background url(../../static/ico/danqu.png)
                    }
                    &:nth-child(2) span{
                        background url(../../static/ico/turn.png)
                    }
                    &:nth-child(3) span{
                        background url(../../static/ico/play.png)
                        background-size 100% !important
                    }
                    &:nth-child(4) span{
                        background url(../../static/ico/turn.png)
                        transform rotate(180deg)
                    }
                    &:nth-child(5) span{
                        background url(../../static/ico/weixihuan.png)
                    }
    .mini_player
        width 100%
        padding 10px 0
        position fixed
        left 0
        bottom 0
        z-index 111
        display flex
        background #131124
        overflow hidden
        .mini_bg
            width 100%
            position absolute
            bottom 0
            left 0
            right 0
            height 100%
            background-position center !important
            background-repeat no-repeat !important
            background-size 100% !important
            filter brightness(0.6) blur(15px)
            z-index -1
        .left
            display flex
            div
                width 50px
            .img
                height 50px
                border-radius 50%
                overflow hidden
                margin-left 10px
                animation picroll 15s linear infinite
                img
                    width 100%
            .text
                 padding-left 10px
                 width 2rem
                p
                    font-size 15px
                    width 2rem
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis
                    &:last-child
                        font-size 12px
                        line-height 30px
         .midd
            flex 1
        .right
            display flex
            div
                width 50px
            .ctrl
                width 50px
                height 50px
                background url(../../static/ico/play.png) center no-repeat
                background-size 80%
                &.icon_play
                    background url(../../static/ico/stop.png) center no-repeat
                    background-size 71%
            .list_icon
                width 50px
                height 50px
                background url(../../static/ico/gedan.png) center no-repeat
                background-size 80%
</style>
