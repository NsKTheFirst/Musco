<template>
    <div>
        <figure id="picture">
            <img src="@/assets/Images/photo_header.jpg" alt="Studio">
        </figure>
        <Presentation/>
        <!-- <News/> -->
        <MyNews/>
    </div>
</template>

<script>
import Presentation from '@/components/Presentation'
// import News from '@/components/News.vue'
import MyNews from '@/components/MyNews'
export default {
    components: {
        Presentation,
        // News,
        MyNews
    }
}
</script>

<style scoped lang='scss'>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box
    }
    
    img {
        width: 100%;
    }
    
</style>
