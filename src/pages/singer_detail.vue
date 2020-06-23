<template>
    <transition name="slide">
        <div class="singer_detaill">
            <Loading :isShow="Loading" />
            <Dialog :dialog="dialog" />
            <nav-bar :bgUrl="bgurl" :title="singerDetail.singer_name"></nav-bar>
            <div class="singer">
                <img :src="bgurl" />
                <div class="play">
                    <div class="sanjiao"></div>
                    <p>开始播放</p>
                </div>
            </div>
            <div class="songlist">
                <ul>
                    <li v-for="(item, index) in singerDetail.list" @click="selectIetm(item, index)">
                        <p>
                            {{ item.musicData.songname }}
                            <span v-for="singer in item.musicData.singer">{{ item.musicData.singer.length > 1 ? '-' + singer.name : '' }}</span>
                        </p>
                        <p>{{ item.musicData.albumname }}{{ item.musicData.albumdesc ? '-' + item.musicData.albumdesc : '' }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
import navBar from '@/components/navbar';
import Loading from '@/components/loading'
import Dialog from '@/components/dialog'
import { getSingerDetail, getNewMusicUrl } from 'api/request';
import { mapActions } from 'vuex';
import { createSong } from 'common/js/song.js';
export default {
    components: {
        navBar,
        Loading,
        Dialog
    },
    data() {
        return {
            Loading: true,
            dialog: {},
            singerDetail: [],
            thisSong: [],
            bgurl: '',
            songs: [],
            songurls: [],
            songid: null
        };
    },
    created() {
        this._getSingerDetail(this.$route.params.id);
    },
    methods: {
        _getSingerDetail(id) {
            getSingerDetail(id).then(res => {
                if (res.code === 0) {
                    this.singerDetail = res.data;
                    this.bgurl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`;
                    this.songs = this._normalizeSongs(res.data.list)
                    this.Loading = false
                }
            });
        },
        _normalizeSongs(list) {
            let ret = [];
            list.forEach(item => {
                let { musicData } = item;
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        },
        selectIetm(item, index) {
            let songs = this.songs
            var songurl = ''
            let url = ''
            getNewMusicUrl(item.musicData.songmid).then(res => {
                if (res.code === 0) {
                    if(!res.req_0.data.midurlinfo[0].purl) {
                        this.dialog = {
                            dialogShow: true,
                            dialogText: '此歌曲需要VIP或无版权'
                        }
                        return;
                    }
                    songurl = res.req_0.data.sip[1] + res.req_0.data.midurlinfo[0].purl
                }
                songs.forEach((it, n) => {
                    it['songurl'] = songurl
                })
                this.selectPlay({
                    list: songs,
                    index
                });
            });
            
        },
        ...mapActions(['selectPlay'])
    }
};
</script>

<style scoped lang="stylus">
.slide-enter-active
    transition all 0.3s cubic-bezier(0, 0.67, 0.74, 1.18)
.slide-leave-active
    transition all .2s linear
.slide-enter, .slide-leave-to
    transform translate3d(0, 200px, 0)
    opacity 0
.singer_detaill
    width 100%
    z-index 100
    .singer
        width 100%
        height 7.5rem
        position fixed
        top 0
        left 0
        z-index 92
        img
            width 100%
        .play
            position fixed
            top 5rem
            left 50%
            display table
            padding 8px 40px
            border-radius 30px
            box-shadow 0 6px 32px rgba(24, 213, 156, 0.5)
            background-color #22d59c
            transform translateX(-50%)
            p
                font-size 15px
                color #FFFFFF
                float left
            .sanjiao
                float left
                width 0
                height 0
                border-width 0px 10px 14px 10px
                border-style solid
                border-color transparent transparent white
                transform rotate(90deg)
                border-radius 3px
                margin 3px 3px 0 0
    .songlist
        position absolute
        width 100%
        z-index 93
        top 7rem
        background #131124
        border-top-left-radius 30px
        border-top-right-radius 30px
        ul
            padding 20px
            li
                padding 10px 0
                border-bottom 1px solid #2d2d2d
                &:last-child
                    border-bottom none
                p
                    font-size 15px
                    color #F5F5F5
                    &:last-child
                        font-size 13px
                        line-height 30px
                        color #C0C0C0
                        white-space nowrap
                        overflow hidden
                        text-overflow ellipsis
</style>
