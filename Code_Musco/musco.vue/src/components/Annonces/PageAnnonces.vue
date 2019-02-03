<template>
    <div id="glob">
        <figure id="picture">
            <img src="@/assets/Images/photo_header.jpg" alt="Studio">
        </figure>
        <Recherche/>
        <Map/>
        <h2>Les Annonces</h2>
        <div class="annonces" v-for="(annonce, a) in annonces" :key="a" @click="detailAnnonce($event,annonce)">
            <div class="profil">
                    <figure>
                        <img :src="getAvatar(annonce.avatar)" :alt="annonce.pseudo" @click="toProfil($event, annonce.annonce_owner)">
                    </figure>
                <h3 class="pseudo">{{ annonce.pseudo }}</h3>
            </div>
            <article>
                <div class="numero">
                    <h4>Annonce n°{{ annonce.id_annonce }}</h4>
                </div>
                <div class="infos">
                    <h4 id="date">{{ annonce.date }}</h4>
                    <h4 id="cat">Categorie: {{ annonce.categorie }}</h4>
                    <h4 id="skill">Skill: {{ annonce.skill }}</h4>
                </div>
                <div class="texte">
                    <p>{{ annonce.annonce }}</p>
                </div>
            </article>
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
            skill: "",
            annoncesMemory: [],
            event: null
        };
    },
    methods: {
        getAvatar(url) {
            // console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },

        getAnnonce() {
            return new Promise((resolve, reject) => {
                const url = "http://localhost:5000/api/v1/annonces";
                axios.get(url).then(res => {
                    this.annonces = res.data;
                    this.annoncesMemory = this.annonces;
                    this.$ebus.$emit("annonces", this.annonces);
                    // console.log(this.annonces);
                    return resolve(); 
                }).catch(err => {
                    // console.log(err);
                    reject()
                });
            })
        },
        detailAnnonce(evt, annonce) {
            this.$ebus.$emit("detailAnnonce");
            this.$ebus.$emit("emitAnnonce", annonce);
            this.event = evt;  //Met l'event de click sur l'annonce dans data pour pouvoir faire une comparaison avec l'event de click sur l'avatar
        },
        toProfil(evt, owner) {
            if (evt.target !== this.event) {
                this.dialog = false;
                this.$router.push({ path: `/profil/${owner}`});
            }
        }
        
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getAnnonce().then(annonces => {
            this.$ebus.$on("emitCat", cat => {
                // console.log("annonces okay", this.annonces)
                this.categorie = cat;
                // console.log(this.categorie);
                this.annonces = this.annoncesMemory.filter(annonce => {
                    // console.log(this.annoncesMemory);
                    return annonce.categorie === this.categorie.toLowerCase()
                })
            });
            this.$ebus.$on("emitSkill", skill => {
                this.skill = skill;
                // console.log(this.skill);
                this.annonces = this.annoncesMemory.filter(annonce => {
                    if (!annonce.skill) return false;
                    return annonce.skill.toLowerCase() === this.skill.toLowerCase()
                })
            });
        }).catch(err => {
            // console.error(err);
        });
    },
}
</script>

<style scoped lang="scss">  
@media screen and (min-width:959px) {
    #glob {
        width: 100%;
        height: auto;
    
        #picture {
            margin-bottom: -6px;
    
            img {
                width: 100%;
                // margin-top: 70px
            }
        }

        h2 {
            font-Family: 'Shrikhand', cursive;
            font-size: 40px;
            text-align: center;
            margin: 30px 0px
        }
    
        .annonces {
            width: 60%;
            height: auto;
            border: solid 5px #01dc0e;
            border-radius: 10px;
            font-family: 'Montserrat', sans-serif;
            margin: auto;
            margin-bottom: 30px;
            display: flex;
            padding: 1rem;
            box-shadow: 8px 8px 10px darkgrey;
            transition: 0.2s;
            
            &:hover {
                box-shadow: 12px 12px 10px darkgrey;
                border: solid 5px #8833f8;
                cursor: pointer
            }
            .profil{
                width: 20%;
                height: 100%;
                // display: block;
                display: flex;
                flex-direction: column;

                
                figure {
                    width: 100%;
                    height: 100%;
                    // line-height: 115px;

                    img {
                        height: 70px;
                        width: 70px;
                        display: block;
                        margin: auto;
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
                    font-family: 'Shrikhand', cursive;
                    font-size: 16px
                }
            }

            article {
                width: 80%;
                height: auto;
                
                .numero {
                    width: 100%;
                    height: auto;
                    margin-bottom: 10px;

                    h4 {
                        font-size: 20px;
                        font-family: 'Shrikhand', cursive;
                        margin-left: 30%
                    }
                }

                .infos {
                    height: auto;
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 10px;

                    h4 {
                        font-size: 17px;
                        text-align: center
                    }
                }

                .texte {
                    width: 100%;
                    height: auto;
                    p {
                        font-size: 16px;
                        flex-wrap: wrap
                    }
                }
                    
            }
        }
        
    }
    }

    @media screen and (min-width:768px) and (max-width:959px) {
        #glob {
            width: 100%;
            height: auto;

            #picture {
                margin-bottom: -6px;
    
                img {
                    width: 100%;
                }
            }

            h2 {
                font-Family: 'Shrikhand', cursive;
                    font-size: 40px;
                text-align: center;
                margin: 30px 0px
            }
        
            .annonces {
                width: 80%;
                height: auto;
                border: solid 5px #01dc0e;
                border-radius: 10px;
                font-family: 'Montserrat', sans-serif;
                margin: auto;
                margin-bottom: 30px;
                display: flex;
                padding: 1rem;
                box-shadow: 8px 8px 10px darkgrey;
                transition: 0.2s;
            
                &:hover {
                    box-shadow: 12px 12px 10px darkgrey;
                    border: solid 5px #8833f8;
                    cursor: pointer
                }
        
                .profil{
                    height: 100%;
                    width: 20%;
                    display: block;
                    display: flex;
                    flex-direction: column;

                
                    figure {
                        width: 100%;
                        height: 100%;
                        line-height: 115px;

                        img {
                            height: 70px;
                            width: 70px;
                            display: block;
                            margin: auto;
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
                        font-family: 'Shrikhand', cursive;
                        font-size: 12px
                    }
                }  
                article {
                    height: auto;
                    width: 80%;

                    .numero {
                        width: 100%;
                        height: auto;
                        margin-bottom: 10px;

                        h4 {
                            font-size: 18px;
                            font-family: 'Shrikhand', cursive;
                            text-align: center
                        }
                    }

                    .infos {
                        height: 20%;
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 10px;

                        h4 {
                            font-size: 16px
                        }
                    }

                    .texte{
                        width: 100%;
                        height: auto;
                        p {
                            font-size: 16px;
                            flex-wrap: wrap
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width:767px) {
        #glob {
            width: 100%;
            height: auto;

            #picture {
                margin-bottom: -6px;
    
                img {
                    width: 100%;
                }
            }

            h2 {
                font-Family: 'Shrikhand', cursive;
                font-size: 35px;
                text-align: center;
                margin: 30px 0px
            }

            .annonces {
                width: 80%;
                height: auto;
                border: solid 5px #01dc0e;
                border-radius: 10px;
                font-family: 'Montserrat', sans-serif;
                margin: auto;
                margin-bottom: 30px;
                display: flex;
                padding: 8px;
                box-shadow: 8px 8px 10px darkgrey;
                transition: 0.2s;
            
                &:hover {
                    box-shadow: 12px 12px 10px darkgrey;
                    border: solid 5px #8833f8;
                    cursor: pointer
                }

                .profil{
                    height: 100%;
                    width: 30%;
                    display: flex;
                    flex-direction: column;
                    align-content: center;

                
                    figure {
                        width: 100%;
                        height: 100%;

                        img {
                            height: 50px;
                            width: 50px;
                            display: block;
                            margin: auto;
                            border: solid 2px #8833f8;
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
                        font-family: 'Shrikhand', cursive;
                        font-size: 10px;
                        height: auto
                    }
                }

                article {
                    height: auto;
                    width: 70%;
                    display: flex;
                    flex-direction: column;

                    .numero {
                        width: 100%;
                        height: auto;
                        margin-bottom: 10px;

                        h4 {
                            font-size: 16px;
                            font-family: 'Shrikhand', cursive;
                            margin-left: 20%
                        }
                    }
                    
                    .infos {
                        height: auto;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        margin-bottom: 10px;

                        h4 {
                            font-size: 13px;
                        }
                    }

                    .texte{
                        width: 100%;
                        height: auto;
                        p {
                            font-size: 13px;
                            flex-wrap: wrap
                        }
                    }
                }
            }
        }    
    }
</style>
