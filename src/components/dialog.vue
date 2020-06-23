<template>
    <div class="dialog" v-show="dialog.dialogShow">
        {{ dialog.dialogText }}
    </div>
</template>

<script>
    export default {
        props: {
            dialog: {
                type: Object,
                default: {
                    dialogShow: false,
                    dialogText: '请稍后...'
                }
            }
            
        },
        created() {
        },
        watch: {
            dialog() {
                this.$nextTick(() => {
                    if(this.dialog.dialogShow) {
                        setTimeout(() => {
                            this.dialog.dialogShow = false
                        }, 2000)
                    }
                })
                
            }
        }
    }
</script>

<style lang="stylus">
    .dialog
        display: table;
        position: fixed;
        z-index: 119;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 5px 10px;
        background: rgba(0,0,0,.7);
        color: #FFFFFF;
        text-align: center;
        max-width: 280px;
        font-size: 15px;
        border-radius: 3px;
        animation: windowPop 0.2s cubic-bezier(0.21, 1.1, 1, 1);
</style>
