<template>
    <main id="conteneur">
        <h1>Mes annonces</h1>
        <div class="annonce" v-for="(annonce, a) in annonces" :key="a">
            <!-- <div class="annCont"> -->
                <h3 class="numAnnonce">Annonce n° {{ annonce.id_annonce }}</h3>
                <div class="infos">
                    <h4>Catégorie: {{ annonce.categorie }}</h4>
                    <h4>Skill: {{ annonce.skill }}</h4>
                    <h4>Date : {{ annonce.date }}</h4>
                </div>
                <article>
                    <p>{{ annonce.annonce }}</p>
                </article>
                <div id="boutons">
                    <i class="far fa-trash-alt fa-2x" @click='delAnnonce(annonce.id_annonce)'></i>
                    <i class="fas fa-pen-square fa-2x" @click='editAnnonce(annonce.id_annonce, annonce)'></i>
                </div>
            <!-- </div> -->
        </div>
        <EditAnnonce/>
    </main>
</template>

<script>
import axios from 'axios'
import EditAnnonce from '@/components/Forms/EditAnnonce'
export default {
    components: {
        EditAnnonce
    },
    data () {
        return {
            annonces: []
        }
    },
    methods: {
        getAnnonce() {
            const url = "http://localhost:5000/api/v1/annonces/owner/";
            axios.get(url + this.infos.id_user).then(res => {
                console.log(res.data);
                this.annonces = res.data;
            }).catch(err => {
                console.log(err);
            });
        },

        editAnnonce(id, annonce) {
            // console.log(id);
            this.$ebus.$emit("id", id);
            this.$ebus.$emit("editAnnonce");
            this.$ebus.$emit("annonce", annonce);

        },

        delAnnonce(id) {
            console.log(id);
            const url ="http://localhost:5000/api/v1/annonces";
            axios.delete(url, { data: { id_annonce: id } }).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });

        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getAnnonce()
    }
    // updated() {
    //     this.getAnnonce();
    // }
}
</script>

<style lang="scss" scoped>
    #conteneur {
        width: 80%;
        height: 100%;
        margin: auto;
        padding: 80px;
        display: flex;
        // flex-direction: column;
        justify-content: center;

        h1 {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 50px;
            margin-bottom: 30px
        }

        .annonce {
            width: 80%;
            height: auto;
            border: solid 5px #8833f8
        }
    }
</style>
