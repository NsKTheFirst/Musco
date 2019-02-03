<template>
    <main>
        <div id="titre">
            <h1>Mes annonces</h1>
        </div>
        <div id="ajout">
            <span id="btnAjout">
                <i class="fas fa-plus-circle fa-4x" @click="ajoutAnnonce(infos.id_user)" id="plus"></i>
            </span>
            <span id="ajann">Ajouter une annonce</span>
        </div>
        <article class="annonce" v-for="(annonce, a) in annonces" :key="a">
            <div class="titreAnn">
                <h3 class="numAnnonce">Annonce n° {{ annonce.id_annonce }}</h3>
            </div>
            <div class="infos">
                <h4>Catégorie: {{ annonce.categorie }}</h4>
                <h4>Skill: {{ annonce.skill }}</h4>
                <h4>Date : {{ annonce.date }}</h4>
            </div>
            <div class="textAnn">
                <div class="texte">
                    <p>{{ annonce.annonce }}</p>
                </div>
            </div>
            <div class="boutons">
                <i class="fas fa-edit fa-2x pen" @click='editAnnonce(annonce.id_annonce, annonce)'></i>
                <i class="fas fa-trash-alt fa-2x trash" @click='delAnnonce(annonce.id_annonce)'></i>
            </div>
        </article>
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
                // console.log(res.data);
                this.annonces = res.data;
                // console.log("yep");
            }).catch(err => {
                // console.log(err);
            });
        },

        // editValidate() {
        //     // this.$ebus.$on("editValidate");
        //     this.getAnnonce();
        // },

        annonceSent() {
            // console.log("yep");
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
            // console.log(id);
            confirm("Voulez vous supprimer cette annonce?");
            const url ="http://localhost:5000/api/v1/annonces";
            axios.delete(url, { data: { id_annonce: id } }).then(res => {
                // console.log(res.data);
                const url2 = "http://localhost:5000/api/v1/annonce_needs_skills";
                axios.delete(url2, { data: { id_annonce_skill: id } }).then(res => {
                    // console.log(res.data);
                }).catch(err => {
                    // console.log(err);
                });
                this.getAnnonce();
                // console.log(this.annonces);
            }).catch(err => {
                // console.log(err);
            });

        },

        ajoutAnnonce(annId) {
            // console.log(annId);
            this.$ebus.$emit("annId", annId);
            this.$ebus.$emit("ajoutAnnonce");
        },

        yep() {
            console.log("yep");
        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getAnnonce();
        // this.editableAnnonce();
    },
    updated() {
        this.$ebus.$on("editValidate", this.getAnnonce);
        this.$ebus.$on("annonceSent", this.getAnnonce);
        // this.getAnnonce();
    },
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width:959px) {
        #titre {
            h1 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 50px;
                margin-bottom: 30px
            }
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

        .annonce {
            width: 80%;
            height: auto;
            margin: auto;
            padding: 10px;
            border: solid 5px #8833f8;
            border-radius: 10px;
            box-shadow: 8px 8px 10px darkgrey;
            margin-top: 30px;
            font-family: 'Montserrat', sans-serif;

            .titreAnn {
                width: 100%;
                height: auto;

                .numAnnonce {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 20px;
                    margin-bottom: 10px
                }
            }

            .infos {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-around;
                // margin-bottom: 10px;

                h4 {
                    font-size: 16px
                }
            }

            .textAnn {
                width: 100%;
                height: auto;
                margin: 10px;

                .texte{
                        width: 100%;
                        height: auto;
                        p {
                            font-size: 16px;
                            flex-wrap: wrap
                        }
                    }
            }

            .boutons {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-around;

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
            }

        }
    }

    @media screen and (min-width:768px) and (max-width:959px) {
        #titre {
            h1 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 50px;
                margin-bottom: 30px
            }
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

        .annonce {
            width: 100%;
            height: auto;
            margin: auto;
            padding: 10px;
            border: solid 5px #8833f8;
            border-radius: 10px;
            box-shadow: 8px 8px 10px darkgrey;
            margin-top: 30px;
            font-family: 'Montserrat', sans-serif;

            .titreAnn {
                width: 100%;
                height: auto;

                .numAnnonce {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 22px;
                    margin-bottom: 10px
                }
            }

            .infos {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                text-align: center;
                // margin-bottom: 10px;

                h4 {
                    font-size: 18px
                }
            }

            .textAnn {
                width: 100%;
                height: auto;
                margin: 10px;

                .texte{
                        width: 100%;
                        height: auto;
                        p {
                            font-size: 18px;
                            flex-wrap: wrap
                        }
                    }
            }

            .boutons {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-around;

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
            }

        }
    }

    @media screen and (max-width:767px) {
        #titre {
            h1 {
                text-align: center;
                font-family: 'Shrikhand', cursive;
                font-size: 35px;
                margin-bottom: 20px
            }
        }

        #ajout {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            text-align: center;
            margin: 80px 0px;

            #btnAjout {
                // margin: auto;
                display: block;
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

        .annonce {
            width: 100%;
            height: auto;
            margin: auto;
            padding: 10px;
            border: solid 5px #8833f8;
            border-radius: 10px;
            box-shadow: 8px 8px 10px darkgrey;
            margin-top: 30px;
            font-family: 'Montserrat', sans-serif;
            // display: flex;
            // flex-direction: column;

            .titreAnn {
                width: 100%;
                height: auto;

                .numAnnonce {
                    text-align: center;
                    font-family: 'Shrikhand', cursive;
                    font-size: 22px;
                    margin-bottom: 10px
                }
            }

            .infos {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                text-align: center;
                margin-bottom: 10px;

                h4 {
                    font-size: 17px
                }
            }

            .textAnn {
                width: 100%;
                height: auto;
                display: block;
                display: flex;
                align-content: center;

                .texte{
                        width: 100%;
                        height: auto;
                        p {
                            font-size: 17px;
                            flex-wrap: wrap
                        }
                    }
            }

            .boutons {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-around;

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
            }

        }
    }
</style>
