<template>
    <div id="app">
        <div v-if="$route.meta.show" class="pull"></div>
        <Header v-if="$route.meta.show" />
        <keep-alive>
            <router-view v-if="$route.meta.show" />
        </keep-alive>
        <router-view v-if="!$route.meta.show" />
        <Tabbar v-if="$route.meta.show" />
        <div v-if="$route.meta.show" class="pull"></div>
        <player />
    </div>
</template>

<script>
import player from '@/components/player'
import Header from '~/header';
import Tabbar from '~/tabbar';
export default {
    name: 'App',
    components: {
        Header,
        Tabbar,
        player
    },
    watch: {
        $route(from, to) {
            window.scrollTo(0, 0);
        }
    }
};
</script>

<style lang="stylus">
@import './stylus/basic'
</style>
