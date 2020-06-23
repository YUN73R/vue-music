<template>
    <div ref="scroll" class="scroll">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            }
        },
        mounted() {
           setTimeout(() => {
               this.initScroll()
           }, 20)  
        },
        methods: {
            initScroll() {
                if(!this.$refs.scroll) return;
                this.scroll = new BScroll(this.$refs.scroll, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }
        },
        watch: {
            data() {
               setTimeout(() => {
                   this.refresh()
               }, 20)   
            }
        }
    }
</script>

<style>
</style>
