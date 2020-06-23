<template>
    <transition name="detail">
    <div class="detail">
        <Loading :isShow="loading" />
        <Dialog :dialog="dialog" />
        <nav-bar :title="topDetail.topinfo.ListName" :bgUrl="topDetail.topinfo.pic_v12"></nav-bar>
        <div class="top_info_pic"><img :src="topDetail.topinfo.pic_v12" /></div>
        <div class="top_info_text">
            <p>{{ topDetail.topinfo.ListName }}</p>
            <p>{{ topDetail.topinfo.ListName }} 第{{ topDetail.day_of_year == '' ? period : topDetail.day_of_year }}{{ topDetail.day_of_year == '' ? '周' : '天' }}</p>
            <p>更新时间：{{ topDetail.update_time }}</p>
        </div>
        <div class="player_btn" @click="playFirst(firstUrl.songmid)"><div class="arrow"></div></div>
        <div class="top_list">
        	<p>排行榜  共{{ topDetail.total_song_num }}首</p>
        	<div class="list_item" v-for="(item,index) in topDetail.songlist" :key="index">
        		<div @click="toSongpage(item, index)">
        			<div class="songname"><p :class="index > 2 ? '' : 'redname'">{{ index + 1 }}</p><p>{{ item.data.songname }}</p></div>
        			<div class="singername">
        				<div class="line"></div>
        				<p>{{ item.in_count }}</p>
        				<p>
        					<p v-for="(singer,index) in item.data.singer" :key="index">{{ singer.name }}</p>{{ item.data.albumdesc == '' ? '' : ' · ' }}{{ item.data.albumdesc }}
        				</p>
        			</div>
        		</div>
        	</div>
        </div>
        <div class="toplist_info">
        	<div>榜单简介</div>
        	<div class="rich_info" v-html="topDetail.topinfo.info"></div>
        </div>
    </div>
    </transition>
</template>

<script>
import { getRankDetail } from 'api/request';
import Loading from '@/components/loading';
import navBar from '@/components/navbar';
import Dialog from '@/components/dialog'
import { getSingerDetail, getNewMusicUrl } from 'api/request';
import { mapActions } from 'vuex';
import { createSong } from 'common/js/song';
export default {
    components: {
        Loading,
        navBar,
        Dialog
    },
    data() {
        return {
            loading: true,
            dialog: {},
            topDetail: {},
            period: null,
            songDetailShow: false,
            firstUrl: null,
            songs: []
        };
    },
    created() {
        this._getRankDetailHandle();
    },
    methods: {
        _getRankDetailHandle() {
            getRankDetail(this.$route.params.id).then(res => {
                if (res.code === 0) {
                    this.loading = false;
                    this.topDetail = res;
                    this.firstUrl = res.songlist[0].data;
                    this.period = res.date.slice(5);
                    this.songs = this._normalizeSongs(res.songlist)
                }
            });
        },
        playFirst(id){
        	console.log(id);
        },
        _normalizeSongs(list) {
            let ret = [];
            list.forEach(item => {
                let { data } = item;
                if (data.songmid && data.albumid) {
                    ret.push(createSong(data));
                }
            });
            return ret;
        },
        toSongpage(item, index) {
            let songs = this.songs
            var songurl = ''
            getNewMusicUrl(item.data.songmid).then(res => {
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
.detail-enter-active
    transition all 0.3s cubic-bezier(0, 0.67, 0.74, 1.18)
.detail-leave-active
    transition all .2s linear
.detail-enter, .slide-leave-to
    transform translate3d(0, 200px, 0)
    opacity 0
.detail
    padding 70px 20px 50px
    background #f8fffd
    .top_info_pic
        width 180px
        height 180px
        border-radius 18px
        margin 0 auto
        overflow hidden
        box-shadow 0 7px 13px rgba(0, 0, 0, 0.21)
        img
            width 100%
            height 100%
    .top_info_text
        width 100%
        margin-top 20px
        text-align center
        p
            display block
            line-height 30px
            color #2B2B2B
            &:nth-child(1)
                font-size 18px
                font-weight 600
                color #22d59c
            &:nth-child(2)
                font-size 15px
            &:nth-child(3)
                font-size 12px
                color grey
    .player_btn
        width 200px
        height 42px
        margin 10px auto
        border-radius 30px
        box-shadow 0 6px 32px rgba(24, 213, 156, 0.5)
        background-color #22d59c
        display -webkit-box
        -webkit-box-align center
        -webkit-box-pack center
        .arrow
            width 0
            height 0
            border-width 0px 11px 19px 11px
            border-style solid
            border-color transparent transparent white
            transform rotate(90deg)
            border-radius 3px           
    .top_list
        padding: 0 12px
        color #2B2B2B
        >p
            font-size 14px
            color grey
        .list_item
            padding 5px 0 10px
            border-bottom 1px solid #ffffff
            .songname
                width 100%
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
                display flex
                p
                    font-size 15px
                    margin-right 15px		
                .redname
                    color #ff0101
            .singername
                width 100%
                margin-top 5px
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
                display flex
                font-size 14px
                .line
                    width 20px
                    height 20px
                    background url('../../static/ico/qushi.png') no-repeat center
                    background-size 100%    			
                >p
                    line-height 20px
                    margin-right 8px
                    &:nth-child(2)
                        font-size 12px
                        color grey
                        margin 0 5px !important				
                    &:nth-child(3)
                        font-size 12px
                        color #9b9b9b
                        p
                            margin-right 10px
    .toplist_info
        width 100%
        >div
            font-size 16px
            margin 15px 0
        
        .rich_info
            font-size 14px
            color #9b9b9b
</style>
