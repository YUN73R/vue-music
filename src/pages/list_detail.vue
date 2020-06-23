<template>
    <div class="detail">
        <!--    <nav-bar :title="navBarTitle" :bgUrl="bgUrl"></nav-bar> -->
    </div>
</template>

<script>
    import navBar from '@/components/navbar'
    import { getSonglistDetail } from 'api/request'
    export default {
        components: {
            navBar
        },
        data() {
            return {
                navBarTitle: '',
                bgUrl: ''
            }
        },
        created() {
           this._getSonglisDetail()
        },
        methods: {
            _getSonglisDetail() {
                getSonglistDetail(this.$route.params.id).then(res => {
                    if(res.code === 0) {
                        console.log(res);
                    };
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
</style>
