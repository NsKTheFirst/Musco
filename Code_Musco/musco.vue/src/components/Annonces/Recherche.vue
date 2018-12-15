<template>
    <section>
        <h2>Rechercher</h2>
        <form>
            <select name="categorie" id="cat" placeholder="Catégorie">
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="instruments">Instruments</option>
            </select>
            <select name="audioSkills" id="audioSkills" placeholder="Audio skills">
                <option value="mixage">Mixage</option>
                <option value="beat making">Beat making</option>
                <option value="composition">Composition</option>
            </select>
            <select name="videoSkills" id="videoSkills" placeholder="Video skills">
                <option value="realisation">Réalisation</option>
                <option value="post production">Post production</option>

            </select>
            <select name="instruments" id="instruments">
                <option value="cuivres">Cuivres</option>
                <option value="cordes">Cordes</option>
                <option value="vent">Instruments à vent</option>
                <option value="percussion">Percussions</option>
                <option value="autres">Autres</option>
            </select>
            <span>Autour de moi</span>
        </form>
    </section>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
    section {
        width: 100%;
        height: 200px;
        background: #8833f8;
        h2 {
            font-family: 'Shrikland', cursive;
            text-align: center;
            color: white
        }
        form {
            display: flex;
            justify-content: space-around
        }
    }
</style>

