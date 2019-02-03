<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout wrap>
            <v-flex>
                <h1 class="titre">Mon profil</h1>
                <figure>
                    <img :src="getAvatar(user.avatar)" :alt="user.pseudo">
                </figure>
                <h2 class="titre2">{{ user.pseudo }}</h2>
                <div class="boutons">
                    <form ref="uploader" enctype="multipart/form-data" @submit="$event.preventDefault()">
                        <input type="file" id="file_picker" ref="filePicker" @change="getLocalFiles($event.target.files)">
                        <i v-if="!user.avatar" class="fas fa-plus-square fa-3x" @click="addImg"></i>
                        <i v-if="user.avatar" class="fas fa-pen-square fa-3x" @click="addImg"></i>
                    </form>
                </div>
                <v-layout wrap>
                    <v-flex xs12>
                        <div>
                            <h2 class="titre2">Ma présentation</h2>
                        </div>
                        <div class="pres" v-if="user.presentation">
                            <div class="preText">{{ user.presentation }}</div>
                        </div>
                        <div class="boutons">
                            <i v-if="!user.presentation" class="fas fa-plus-square fa-3x" @click="addPres(user)"></i>
                            <i v-if="user.presentation" class="fas fa-pen-square fa-3x" @click="editPres(user)"></i>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout wrap>
                    <v-flex xs12>
                        <div>
                            <h2 class="titre2 prods">Mes productions</h2>
                        </div>
                        <div>
                            <h3 class="titre3 sound">Soundcloud</h3>
                        </div>
                        <div class="soundcloud">
                            <span v-html="user.soundcloud"></span>
                        </div>
                        <div class="soundBtns">
                            <span class="add"><i v-if="!user.soundcloud" class="fas fa-plus-square fa-3x" @click="addSound(user)"></i></span>
                            <span class="edit"><i v-if="user.soundcloud" class="fas fa-pen-square fa-3x" @click="editSound(user)"></i></span>
                        </div>
                        <div>
                            <h3 class="titre3 yout">Youtube</h3>
                        </div>
                        <div class="youtube">
                            <span v-html="user.youtube"></span>
                        </div>
                        <div class="youBtns">
                            <span class="add"><i v-if="!user.youtube" class="fas fa-plus-square fa-3x" @click="addYout(user)"></i></span>
                            <span class="edit"><i v-if="user.youtube" class="fas fa-pen-square fa-3x" @click="editYout(user)"></i></span>
                        </div>
                        <div>
                            <h2 class="titre2">Mon Facebook</h2>
                        </div>
                        <div class="facebook" v-if="user.facebook">
                            <i class="fab fa-facebook-square fa-4x" :to="user.facebook"></i>
                        </div>
                        <div class="faceBtns">
                            <span class="add"><i v-if="!user.facebook" class="fas fa-plus-square fa-3x" @click="addFace(user)"></i></span>
                            <span class="edit"><i v-if="user.facebook" class="fas fa-pen-square fa-3x" @click="editFace(user)"></i></span>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout> 
        <BackToTop/>
        <EditUser/> 
    </v-container>
</template>

<script>
import axios from 'axios'
import EditUser from '@/components/Forms/EditUser'
import BackToTop from '@/components/BackToTop'
export default {
    components: {
        EditUser,
        BackToTop
    },
    
    data() {
        return {
            userId: null,
            user: [],
            mimes: [
                'image/jpeg',
                'image/png'
            ],
            files: []
        }
    },
    methods: {
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },

        getUser() {
            const url = "http://localhost:5000/api/v1/user/simple/";
            axios.get(url + this.userId).then(res => {
                this.user = res.data[0];
                console.log(this.user);
                console.log(this.user.id_user);
            }).catch(err => {
                console.log(err);
            })
        },

        addPres(user) {
            this.$ebus.$emit("addPres");
            this.$ebus.$emit("user", user)
        },

        editPres(user) {
            this.$ebus.$emit("editPres");
            this.$ebus.$emit("user", user);
        },

        addSound(user) {
            this.$ebus.$emit("addSound");
            this.$ebus.$emit("user", user);
        },

        editSound(user) {
            this.$ebus.$emit("editSound");
            this.$ebus.$emit("user", user);
        },

        addYout(user) {
            this.$ebus.$emit("addYout");
            this.$ebus.$emit("user", user);
        },

        editYout(user) {
            this.$ebus.$emit("editYout");
            this.$ebus.$emit("user", user);
        },

        addFace(user) {
            this.$ebus.$emit("addFace");
            this.$ebus.$emit("user", user);
        },

        editFace(user) {
            this.$ebus.$emit("editFace")
            this.$ebus.$emit("user", user);
        },

        // editedUser() {
        //     this.getUser();
        // },

// ************ Upload d'images ************
        addImg() {
            this.$refs.filePicker.click();
        },

        checkFilesExtensions([...files]) {
            var errors = 0;
            const log = [];
            files.forEach(file => {
                if (!this.mimes.includes(file.type)) {
                    errors += 1;
                    if (!log.includes(file.type)) {
                        log.push(file.type);
                    }
                }
            });
            return {
                errors: errors !== 0,
                log: log
            };
        },

        getLocalFiles(files) {
            // console.log("files", files);
            const check = this.checkFilesExtensions(files);
            if (!check.errors) {
                this.files = files;
                const fd = new FormData();
                Array.from(files).forEach(f => {
                    fd.append("uploader", f, f.name);
                });
            axios.post("http://localhost:5000/upload/", fd).then(result => {
                console.log(result);
            }).catch(err => {
                console.error(err);
            });
            this.updateAvatar(); 
            } else {
                console.error("file-type not allowed >", check.log);
                alert("Type de fichier non autorisé (seulement .jpg et .png)")
            }
        },

        updateAvatar() {
            this.user.avatar = this.files[0].name;
            console.log(this.user);
            const url = "http://localhost:5000/api/v1/user";
            axios.patch(url, this.user).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
            this.getAvatar();
        }

    // *******************************************************************
    },

    // updated() {
    //     this.$ebus.$on("editedUser", this.editedUser)
    // },

    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.userId = this.infos.id_user;
        // this.user.id_user = this.infos.id_user;
        // this.user.pseudo = this.infos.pseudo;
        // this.user.avatar = this.infos.avatar;
        // this.user.presentation = this.infos.presentation;
        // this.user.facebook = this.infos.facebook;
        // this.user.soundcloud = this.infos.soundcloud;
        // this.user.youtube = this.infos.youtube;
        // console.log(this.user);
        this.getUser();
        
    }
}
</script>

<style lang="scss" scoped>
    // @media screen and (min-width:959px) {
        .titre {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 50px;
            margin-bottom: 50px
        }
        figure {
            // display: block;
            // margin: auto;
        
            // display: flex;
            // justify-content: center;
    
            img {
                display: block;
                margin: auto;
                border-radius: 50%;
                border: solid 5px #8833f8;
                width: 250px;
                height: 250px;
                margin-bottom: 20px  
            }
        }

        .titre2 {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 30px;
            margin-bottom: 10px;
            margin-top: 50px
        }

        #file_picker {
            display: none;
        }

        .boutons {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 30px;

            .fa-plus-square {
                color: #8833f8;
                &:hover {
                    cursor: pointer;
                }
            }

            .fa-pen-square {
                color: #01dc0e;
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .soundBtns, .youBtns {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 30px;

            .fa-plus-square {
                color: #8833f8;
                &:hover {
                    cursor: pointer;
                }
            }

            .fa-pen-square {
                color: #01dc0e;
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .titre3 {
            font-family: 'Shrikhand', cursive;
            font-size: 25px;
            text-align: center;
            margin: 30px 0px
        }

        .pres {
            // margin: auto;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            width: 100%;
            height: auto;
            display: flex;
            // flex-wrap: wrap;
            justify-content: center;

            .presText {
                // margin: auto;
                width: 100%;
                flex-wrap: wrap
            }
        }

        .soundcloud {
            width: 100%;
            height: auto;

            span {
                width: 560px;
                height: auto;
                display: block;
                margin: auto
            }
        }

        .youtube {
            width: 100%;
            height: auto;

            span {
                width: 560px;
                height: auto;
                display: block;
                margin: auto;
            }
        }

        .facebook {
            width: 100%;
            height: auto;
            text-align: center;
            margin-top: 30px;

            i {
                color: #3B5998;

                &:hover {
                    color: #8833f8;
                    cursor: pointer
                }
            }
        }

        .faceBtns {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 30px;

            .fa-plus-square {
                color: #8833f8;
                &:hover {
                    cursor: pointer;
                }
            }

            .fa-pen-square {
                color: #01dc0e;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    // }
    // @media screen and (min-width:768px) and (max-width:959px) {

    // }

    @media screen and (max-width:767px) {
        .titre {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 35px;
            margin-bottom: 30px
        }

        figure {
        // display: flex;
        // justify-content: center;
    
            img {
                display: block;
                margin: auto;
                border-radius: 50%;
                border: solid 5px #8833f8;
                margin: auto;
                width: 125px;
                height: 125px  
            }
        }

        .titre2 {
            text-align: center;
            font-family: 'Shrikhand', cursive;
            font-size: 25px;
            margin-bottom: 10px
        }

        .pres {
        // margin: auto;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            width: 100%;
            height: auto;
            display: flex;
            // flex-wrap: wrap;
            justify-content: center;

            .presText {
                // margin: auto;
                width: 100%;
                flex-wrap: wrap
            }
        }

        .soundcloud, .youtube, .youBtns, .soundBtns, .prods, .sound, .yout {
            display: none
        }
    }
</style>