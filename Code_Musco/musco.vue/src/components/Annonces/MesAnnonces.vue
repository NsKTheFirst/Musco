<template>
    <main>
        <h1>Mes annonces</h1>
        <div id="ajout">
            <span id="btnAjout">
                <i class="fas fa-plus-circle fa-4x" @click="ajoutAnnonce(infos.id_user)" id="plus"></i>
            </span>
            <span id="ajann">Ajouter une annonce</span>
        </div>
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
                <div class="boutons">
                    <i class="fas fa-trash-alt fa-2x trash" @click='delAnnonce(annonce.id_annonce)'></i>
                    <i class="fas fa-edit fa-2x pen" @click='editAnnonce(annonce.id_annonce, annonce)'></i>
                </div>
            <!-- </div> -->
        </div>
        <EditAnnonce/>
        <AjoutAnnonce/>
    </main>
</template>

<script>
import axios from 'axios'
import EditAnnonce from '@/components/Forms/EditAnnonce'
import AjoutAnnonce from '@/components/Forms/AjoutAnnonce'
export default {
    components: {
        EditAnnonce,
        AjoutAnnonce
    },

    // props: [
    //     "annonces"
    // ],
    data () {
        return {
            annonces: [],
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

        editValidate() {
            // this.$ebus.$on("editValidate");
            this.getAnnonce();
        },

        editAnnonce(id, annonce) {
            // console.log(id);
            this.$ebus.$emit("id", id);
            this.$ebus.$emit("editAnnonce");
            this.$ebus.$emit("annonce", annonce);

        },
        // editAnnonce(id, editableAnn) {
        //     // console.log(id);
        //     this.$ebus.$emit("id", id);
        //     this.$ebus.$emit("editAnnonce");
        //     this.$ebus.$emit("annonce", editableAnn);

        // },

        delAnnonce(id) {
            console.log(id);
            const url ="http://localhost:5000/api/v1/annonces";
            axios.delete(url, { data: { id_annonce: id } }).then(res => {
                console.log(res.data);
                const url2 = "http://localhost:5000/api/v1/annonce_needs_skills";
                axios.delete(url2, { data: { id_annonce_skill: id } }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
                this.getAnnonce();
                console.log(this.annonces);
            }).catch(err => {
                console.log(err);
            });

        },

        ajoutAnnonce(annId) {
            console.log(annId);
            this.$ebus.$emit("annId", annId);
            this.$ebus.$emit("ajoutAnnonce");
        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getAnnonce();
        // this.editableAnnonce();
    },
    computed: {
        refresh: function() {
            this.$ebus.$on("editValidate");
            this.editValidate();
        }
    },

// ****************************************************    
    // updated() {
    //     refresh() {
    //         this.$ebus.$on("editValidate");
    //         this.editValidate();
    //     },
    //     // this.getAnnonce();
    // }
}
</script>

<style lang="scss" scoped>
    // #conteneur {
    //     width: 80%;
    //     height: 100%;
    //     margin: auto;
    //     padding: 80px;
    //     display: flex;
    //     // flex-direction: column;
    //     justify-content: center;

        h1 {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 50px;
            margin-bottom: 30px
        }

        .annonce {
            width: 80%;
            height: auto;
            margin: auto;
            border: solid 5px #8833f8;
            border-radius: 10px
        }

        #ajout {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            margin: 80px 0 100px;

            #btnAjout {
                // margin: auto;
                display: block;
                margin-right: 20px;
                color: #01dc0e;
                &:hover {
                    cursor: pointer
                }
            }

            #ajann {
                    display: block;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 50px
            }
        }

        .pen {
            color: #01dc0e;
            &:hover {
                cursor: pointer
            }
        }

        .trash {
            color: #8833f8;
            &:hover {
                cursor:pointer
            }
        }
    // }
</style>
