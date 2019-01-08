<template>
    <div :class="{active: notActive}">
        wesh
    </div>
</template>

<script>
export default {
    data() {
        return {    
            notActive: true
        }
    },
    created() {
        this.$ebus.$on("openFormLog", this.openFormLog)
    },
    methods: {
        openFormLog() {
            this.notActive = false
        }
    }
}
</script>

<style scoped lang="scss">
    div {
        display: block;
        background: white;
        padding: 5px;
        width: 100px;
        border: solid 2px black;
        border-radius: 5px;
        text-align: center;
        margin: auto
    }
    .active {
        display: none
    }
</style>
