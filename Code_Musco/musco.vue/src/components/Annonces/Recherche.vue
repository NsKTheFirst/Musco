<template>
    <section>
        <h2>Rechercher</h2>
        <v-container fluid grid-list-xl id:="container">
            <v-layout wrap align-center>
            <!-- <select name="categorie" id="cat">
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
            </select> -->
                <v-flex sm2 d-flex>
                    <v-select :items="cat" label="Catégorie" outline offset-y background-color="white" id="cat"></v-select>
                </v-flex>
                <v-flex sm2 d-flex>
                    <v-select :items="audioskill" label="Audio skills" outline offset-y background-color="white"></v-select>
                </v-flex>
                <v-flex sm2 d-flex>
                    <v-select :items="videoskill" label="Video skills" outline offset-y background-color="white"></v-select>
                </v-flex>
                <v-flex sm2 d-flex>
                    <v-select :items="instruments" label="Instruments" outline offset-y background-color="white"></v-select>
                </v-flex>
                <v-flex sm1 d-flex>
                    <span>Autour de moi</span>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
export default {
    data() {
        return {
            cat: ['Audio', 'Video', 'Instruments'],
            audioskill: ['Mixage', 'Beat making', 'Composition'],
            videoskill: ['Réalisation', 'Post-produciton'],
            instruments: ['Cuivres', 'Cordes', 'Instruments à vent', 'Percussions', 'Chant', 'Autres']
        }
    }
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
        span {
            border: 1px solid #01dc0e;
            padding: 5px;
            text-align: center;
            border-radius: 5px;
            background: #01dc0e;
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            transition: 0.1s;
            &:hover {
                box-shadow: 4px 4px 8px rgb(66, 66, 66);
                cursor: pointer;
            }
        }
    }
</style>

