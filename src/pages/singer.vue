<template>
    <transition name="singer">
        <div class="singer">
            <loading :isShow="Loading"></loading>
            <router-view />
            <div class="search" ref="search"><input type="text" placeholder="输入歌手名称搜索" /></div>
            <ul>
                <router-link tag="li" :to="{ path: '/singer/' + item.Fsinger_mid }" v-for="item in singerList">
                    <div class="avatar"><img v-lazy="`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`" alt="" /></div>
                    <div class="name">{{ item.Fsinger_name }}</div>
                </router-link>
            </ul>
        </div>
    </transition>
</template>
<script>
import Loading from '@/components/loading';
import { getSingerData } from 'api/request';
import { ERR_OK } from '../api/config';
export default {
    components: {
        Loading
    },
    data() {
        return {
            Loading: true,
            singerList: []
        };
    },
    created() {
        this._getSingeList();
        // window.addEventListener('scroll', this.getScrollTop);
        // this.getScrollTop();
    },
    methods: {
        _getSingeList() {
            getSingerData().then(res => {
                if (res.code === ERR_OK) {
                    this.singerList = res.data.list;
                    this.Loading = false;
                }
            });
        },
        getScrollTop() {
            setTimeout(() => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 80) {
                    this.$refs.search.style.transform = 'translate3d(-50%, 45px, 0)';
                    this.$refs.search.style.position = 'fixed';
                } else {
                    this.$refs.search.style.transform = 'translate3d(-50%, 0, 0)';
                    this.$refs.search.style.position = 'absolute';
                }
            }, 20);
        }
    },

    destroyed() {
        // window.addEventListener('scroll', this.getScrollTop);
    }
};
</script>
<style scoped lang="stylus">
.singer-enter-active
    transition all 0.3s cubic-bezier(0, 0.67, 0.74, 1.18)
.singer-enter
    transform translate3d(0, -200px, 0)
    opacity 0
.singer
    padding 20px 10px 0
    position relative
    .search
        width 90%
        background #131124
        z-index 95
        margin 0 auto 20px
        animation all 0.3s linear
        input
            width 95%
            padding-left 5%
            line-height 28px
            border-radius 5px
            border 1px solid #6C757D
            color #F5F5F5
    ul
        width 100%
        li
            display flex
            align-items center
            justify-content center
            justify-items center
            padding 10px
            .avatar
                width 50px
                height 50px
                overflow hidden
                border-radius 50%
                img
                    width 100%
            .name
                flex 1
                padding-left 20px
                font-size 14px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
</style>
