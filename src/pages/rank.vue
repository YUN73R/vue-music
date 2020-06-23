<template>
    <transition name="rank">
    <div class="rank">
        <div v-for="(item, index) in rankList" class="list">
            <div @click="toDetails(item.id)" class="top_item clearfix">
                <div class="top_pic"><img :src="item.picUrl" /></div>
                <div class="top_music">
                    <div class="top_name">{{ item.topTitle }}</div>
                    <div class="music_name" v-for="(name, index) in item.songList" :key="index">
                        <p>{{ index + 1 }}</p>
                        <p>{{ name.songname }}--{{ name.singername }}</p>
                    </div>
                    <div class="arrow_ico"></div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
import { getRankData } from 'api/request';
export default {
    data() {
        return {
            rankList: []
        };
    },
    created() {
        this._getRankDataHandle();
    },
    methods: {
        _getRankDataHandle() {
            getRankData().then(res => {
                console.log(res);
                if (res.code === 0) this.rankList = res.data.topList;
            });
        },
        toDetails(id) {
            this.$router.push({
                name: 'rankd',
                params: {
                    id: id
                }
            })
        }
    }
};
</script>
<style scoped lang="stylus">
.rank-enter-active
    transition all 0.3s cubic-bezier(0, 0.67, 0.74, 1.18)
.rank-enter
    transform translate3d(0, -200px, 0)
    opacity 0
.rank
    padding 20px 10px
    .list
        padding 5px 0
        .top_item
            display flex
            width 100%
            .top_pic
                width 100px
                overflow hidden
                img
                    width 100%
            .top_music
                flex 1
                margin-left 20px
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                .top_name
                    font-size 16px
                    font-weight 600
                .music_name
                    font-size 14px
                    display flex
                    padding 4.5px 0
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    p
                        &:nth-child(1)
                            width 20px
</style>
