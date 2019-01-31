<template>
    <div>
        <section>
            <h2>Rechercher</h2>
            <v-container grid-list-xl id:="container">
                <v-layout wrap justify-center>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="cat" label="Catégorie" solo menu-props="offset-y" class="field" v-model="newCat" @change="emitCat(newCat)"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="audioskill" label="Audio skills" solo menu-props="offset-y" class="field" v-model="newAudioSkill" @change="emitSkill(newAudioSkill)"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="videoskill" label="Video skills" solo menu-props="offset-y" class="field" v-model="newVideoSkill" @change="emitSkill(newVideoSkill)"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                     <v-select :items="instruments" label="Instruments" solo menu-props="offset-y" class="field" v-model="newInstrument" @change="emitSkill(newInstrument)"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2 d-flex>
                        <span @click="runGeoloc">Autour de moi</span>
                    </v-flex>
                </v-layout>
            </v-container>
        
        </section>
    </div>
</template>

<script>
export default {
    name: "Recherche",
    data() {
        return {
            cat: ['Audio', 'Video', 'Instruments'],
            audioskill: ['Mixage', 'Beat making', 'Composition'],
            videoskill: ['Réalisation', 'Post production'],
            instruments: ['Cuivres', 'Cordes', 'Clavier/Piano', 'Instruments à vent', 'Percussions', 'Chant'],
            newCat: null,
            newAudioSkill: null,
            newVideoSkill: null,
            newInstrument: null
            // map: null,
            // userlat: null,
            // userlon: null,
            // macarte: {}
        }
    },

    methods: {
        runGeoloc() {
            this.$ebus.$emit("runGeoloc");
        },
        emitCat(cat) {
            this.$ebus.$emit('emitCat', cat);
            if (cat === "Audio") {
                this.newVideoSkill === null;
                this.newInstrument === null;
            } else if (cat === "Video") {
                this.newAudioSkill === null;
                this.newInstrument === null;
            } else if (cat === "Instruments") {
                this.newAudioSkill === null;
                this.newVideoSkill === null;
            } else if (this.newAudioSkill) {
                this.cat === 'Audio';
                this.newVideoSkill === null;
                this.newInstrument === null;
            } else if (this.newVideoSkill) {
                this.cat === 'Video';
                this.newAudioSkill === null;
                this.newInstrument === null;
            } else if (this.newInstrument) {
                this.cat === 'Instruments';
                this.newAudioSkill === null;
                this.newVideoSkill === null;
            }
        },
        emitSkill(skill) {
            this.$ebus.$emit('emitSkill', skill);
            if (this.newAudioSkill) {
                this.newCat === 'Audio';
                this.newVideoSkill === null;
                this.newInstrument === null;
            } else if (this.newVideoSkill) {
                this.newCat === 'Video';
                this.newAudioSkill === null;
                this.newInstrument === null;
            } else if (this.newInstrument) {
                this.newCat = 'Instruments';
                this.newAudioSkill === null;
                this.newVideoSkill === null;
            } else if (newCat === "Audio") {
                this.newVideoSkill === null;
                this.newInstrument === null;
            } else if (newCat === "Video") {
                this.newAudioSkill === null;
                this.newInstrument === null;
            } else if (newCat === "Instruments") {
                this.newAudioSkill === null;
                this.newVideoSkill === null;
            }
        }
    },
}
</script>

<style scoped lang="scss">
    section {
        width: 100%;
        height: auto;
        background: #8833f8;
        padding: 20px 0px;

        h2 {
            font-family: 'Shrikhand', cursive;
            text-align: center;
            color: white;
            font-size: 30px;
            letter-spacing: 3px
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
            height: 32px;
            margin-top: 10px;
            user-select: none;
            
            &:hover {
                box-shadow: 4px 4px 8px rgb(66, 66, 66);
                cursor: pointer;
            }
        }
    }
</style>

