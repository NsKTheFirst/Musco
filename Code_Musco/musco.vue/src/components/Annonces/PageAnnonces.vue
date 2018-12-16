<template>
    <div>
        <figure>
            <img src="@/assets/Images/photo_header.jpg" alt="Studio">
        </figure>
        <Recherche/>
    </div>
</template>

<script>
import Recherche from '@/components/Annonces/Recherche.vue'
export default {
    components: {
        Recherche
    }
}
</script>

<style scoped lang="scss">
    img {
        width: 100%;
        height: 100%
    }
</style>
