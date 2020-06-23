<template>
    <div class="recomm">
        <div>
            <swiper :options="IndexswiperOption">
                <template v-for="(item, index) in sliderData">
                    <swiper-slide :key="index">
                        <a :href="item.linkUrl" target="_blank"><img :src="item.picUrl" alt="" /></a>
                    </swiper-slide>
                </template>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="song_list">
                <h4>🎼热门歌单推荐</h4>
                <div class="hot_v">
                    <template v-for="(item, index) in songList">
                        <router-link :to="{ path: '/songlist/' + item.dissid}" :key="index" class="hot_v_item">
                            <div class="hot_cover"><img v-lazy="item.imgurl" /></div>
                            <div class="hot_username">
                                <p v-text="item.dissname"></p>
                            </div>
                        </router-link>
                    </template>
                </div>
                <Loading :isShow="Loading" :top="'50%'"></Loading>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/components/loading'
import scrollView from '~/scroll-view';
import { getRecommend, getSongList } from 'api/request';
import { ERR_OK } from 'api/config.js';
export default {
    components: {
        scrollView,
        Loading
    },
    data() {
        return {
            Loading: true,
            songList: [],
            sliderData: [],
            IndexswiperOption: {
                slidesPerdiv: 1,
                autoplay: {
                    delay: 4000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                loop: true
            }
        };
    },
    created() {
        this._getRecommendData();
        this._getDiscList();
    },
    methods: {
        _getRecommendData() {
            getRecommend()
                .then(res => {
                    if (res.code == ERR_OK) {
                        this.sliderData = res.data.slider;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        _getDiscList() {
            getSongList().then(res => {
                if (res.code === ERR_OK) {
                    this.songList = res.data.list;
                    this.Loading = false
                }
            });
        }
    }
};
</script>
<style scoped lang="stylus">
.recomm
    width 100%
    .swiper-container
        img
            width 100%
    .song_list
        padding-top 10px
        position relative
        h4
            font-size 17px
            color #FAC653
            line-height 45px
            text-align center
        .hot_v
            display flex
            flex-flow row wrap
            padding 10px
            .hot_v_item
                flex 0 1 32%
                margin 0 2% 15px 0
                &:nth-child(3n)
                    margin-right 0
                .hot_cover
                    width 100%
                    height 200upx
                    img
                        width 100%
                        height 100%
                        border-radius 5px
                        overflow hidden
                .hot_username
                    padding 10px
                    >p
                        font-size 14px
                        display block
                        overflow hidden
                        height 40px
                        color #fac653
</style>
