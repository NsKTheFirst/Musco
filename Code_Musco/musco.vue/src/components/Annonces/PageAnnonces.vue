<template>
    <div id="glob">
        <figure id="picture">
            <img src="@/assets/Images/photo_header.jpg" alt="Studio">
        </figure>
        <Recherche/>
        <Map/>
        
        <div class="annonces" v-for="(annonce, a) in annonces" :key="a" @click="detailAnnonce(annonce)">
            <!-- <router-link
            :to="{
                path: `/annonces/${annonce.id}/`,
                name: 'annonceDetail',
                params: {id: annonce.id_annonce, annonce: annonce.annonce, annonce_owner: annonce.annonce_owner, date: annonce.date, avatar: annonce.avatar, pseudo: annonce.pseudo, categorie: annonce.categorie, skill: annonce.skil}
            }"> -->
            <div class="profil">
                <!-- <router-link>    -->
                    <figure>
                        <img :src="getAvatar(annonce.avatar)" :alt="annonce.pseudo" :to="{
                                path: '/profil',
                                name: 'profil'
                        }">
                    </figure>
                <!-- </router-link>  -->
                <h3 id="pseudo">{{ annonce.pseudo }}</h3>
            </div>
            <article>
                <div>
                    <h4 id="date">{{ annonce.date }}</h4>
                    <h4 id="cat">Categorie: {{ annonce.categorie }}</h4>
                    <h4 id="skill">Skill: {{ annonce.skill }}</h4>
                </div>
                <p id="annonce">{{ annonce.annonce }}</p>
            </article>
            <!-- </router-link> -->
        </div>
        <BackToTop/>
        <DetailAnnonce/>
    </div>   
</template>

<script>
import Recherche from '@/components/Annonces/Recherche.vue'
import Map from '@/components/Map.vue'
import BackToTop from '@/components/BackToTop.vue'
import DetailAnnonce from '@/components/Forms/DetailAnnonce'
import axios from 'axios'
export default {
    name: "PageAnnonces",
    components: {
        Recherche,
        Map,
        BackToTop,
        DetailAnnonce
    },
    data () {
        return {
            annonces: [],
            categorie: "",
            audioSkill: "",
            videoSkill: "",
            instrument: ""
        };
    },
    methods: {
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },

        getAnnonce() {
            const url = "http://localhost:5000/api/v1/annonces";
            axios.get(url).then(res => {
                this.annonces = res.data;
                console.log(this.annonces);   
            }).catch(err => {
                console.log(err);
            });
            // console.log(this.annonces);
        },
        getCat() {
            const url = "http://localhost:5000/api/v1/annonces/categorie/";
            axios.get(url + this.categorie).then(res => {
                this.annonces = res.data;
                console.log(this.annonces);
            }).catch(err => {
                console.log(err);
            });
        },
        detailAnnonce(annonce) {
            this.$ebus.$emit("detailAnnonce");
            this.$ebus.$emit("emitAnnonce", annonce);
        }
        // filteredAnnonces: function() {
        //     if (this.categorie) {
        //         this.getCat();
        //     }
        // }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getAnnonce();
        this.$ebus.$on("emitCat", cat => {
            this.categorie = cat;
            console.log(this.categorie);
            this.getCat();
        });
        this.$ebus.$on("emitAudioSkill", audioSkill => {
            this.audioSkill = audioSkill;
            console.log(this.audioSkill);
        });
        this.$ebus.$on("emitVideoSkill", videoSkill => {
            this.videoSkill = videoSkill;
            console.log(this.videoSkill);
        });
        this.$ebus.$on("instrument", instrument => {
            this.instrument = instrument;
            console.log(this.instrument);
        });
        // if (this.categorie) {
        //     this.getCat();
        // };
    },
    // computed: {
    //     filteredAnnonces: function() {
    //         if (this.categorie) {
    //             this.getCat();
    //         }
    //     }
    // },
    // updated() {
    //     this.filteredAnnonces()
    // }
}
</script>

<style scoped lang="scss">
    // #glob {
    //     position: relative;
    // }
    
    #picture {
        margin-bottom: -6px
    }
    
    img {
        width: 100%;
        // margin-top: 70px
    }
    
    .annonces {
        width: 50%;
        height: auto;
        border: solid 5px #01dc0e;
        border-radius: 10px;
        font-family: 'Montserrat', sans-serif;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
        display: flex;
        padding: 1rem;
        box-shadow: 8px 8px 10px darkgrey;
        transition: 0.2s;
        user-select: none;
            
        &:hover {
            box-shadow: 12px 12px 10px darkgrey;
            border: solid 5px #8833f8;
            cursor: pointer
            // img {
            //     border: solid 3px #01dc0e
            // }
        }
        .profil{
            height: 100%;
            width: 20%;
                
            figure {
                width: 70px;
                height: 70px;
                line-height: 115px;
                margin: auto;

                img {
                    height: 100%;
                    width: 100%;
                    border: solid 3px #8833f8;
                    border-radius: 50%;
                    &:hover {
                        cursor: pointer;
                        box-shadow: 3px 3px 8px grey;
                        border: solid 3px #01dc0e
                    }
                    
                }
            }
            h3 {
                text-align: center;
                line-height: 50px;
                font-family: 'Shrikhand', cursive
            }
        }

        article {
            height: 100%;
            width: 80%;
            text-align: center;
            display: flex;
            flex-direction: column;

            div {
                height: 20%;
                display: flex;
                justify-content: space-around;
                margin-bottom: 10px
            }

            p {
                font-size: 12px;
            }
        }
    }
</style>
