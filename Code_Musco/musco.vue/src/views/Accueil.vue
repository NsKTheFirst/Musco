<template>
    <div>
        <figure id="picture">
            <img src="@/assets/Images/photo_header.jpg" alt="Studio">
        </figure>
        <Presentation/>
        <Infos/>
        <MyNews/>
    </div>
</template>

<script>
import Presentation from '@/components/Presentation'
import Infos from '@/components/Infos.vue'
import MyNews from '@/components/MyNews'
export default {
    components: {
        Presentation,
        Infos,
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
