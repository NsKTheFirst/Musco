<template>
    <back-to-top bottom="200px" right="20px">
            <button type="button" class="btn btn-info btn-to-top"><i class="fas fa-chevron-up"></i></button>
    </back-to-top>
</template>

<script>
import BackToTop from 'vue-backtotop'
export default {
    components: {
        BackToTop
    }
}
</script>

<style lang="scss" scoped>
    .btn-to-top {
        width: 60px;
        height: 60px;
        color: #8833f8;
        background: #01dc0e;
        padding: 3px 8px;
        border-radius: 50%;
        font-size: 40px;
        line-height: 42px;
        box-shadow: 6px 6px 10px darkgrey;
        transition: 0.2s;
        opacity: 0.6;
        outline: none;


        &:hover {
            background: #8833f8;
            color: #01dc0e;
            // text-decoration: none;
            box-shadow: 8px 8px 10px darkgrey
        }
    }
</style>
