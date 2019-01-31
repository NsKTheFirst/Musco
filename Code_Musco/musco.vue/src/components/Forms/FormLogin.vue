<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span id="titreLog">Se connecter</span>
                </v-card-title>
                <ul id="logs">
                    <li v-for="(log, k) in logs" :key="k">{{log}}</li>
                </ul>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Email*" type="mail" v-model="user.mail"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Password*" type="password" v-model="user.mdp"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Champs obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#8833f8" flat @click="dialog = false">Annuler</v-btn>
                    <v-btn color="#01dc0e" flat @click="login($event)">Se connecter</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {    
            dialog: false,
            logs: {},
            passwordPattern: {
            regex: null,
            hint:
                "8 caractère minimum dont au moins 1 majuscule, 1 nombre et 1 caractère spécial"
        },
      user: {
        mail: "nico@owlab.io",    //nico@owlab.io
        mdp: "12345678"       //12345678
      }
        }
    },
    created() {
        this.$ebus.$on("openFormLog", this.openFormLog)
    },
    methods: {
        openFormLog() {
            this.dialog = true
        },

        checkLogin() {
            const checkMail = function checkMail(mail) {
            const res = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            mail);
            if (!res) {
                this.logs["mailFormat"] = "Veuillez entrer une adresse mail valide";
                alert(this.logs.mailFormat);
                } else {
                return res;
                }
            };

            const checkPass = function checkPass(mdp) {
            // const res = ta regex ici :D;
            const res = true;
            if (!res)
                this.logs["passwordFormat"] = `Format de mot de passe requis: ${
                this.passwordPattern.hint
                }`;
            return res;
            };

            const runTestsSuite = function runTestsSuite(acc, fn) {
            acc += fn() ? 0 : 1;
            return acc;
            };

            const tests = [
            checkMail.bind(this, this.user.mail),
            checkPass.bind(this, this.user.mdp)
            ];

            const errors = tests.reduce(runTestsSuite, 0);

            console.log("@checkLogin", errors, this.logs);

            // const closeFormLog = function closeFormLog() {
            //     console.log(checkMail());
            //     // if(this.checkMail.res && this.checkPass.res) {
            //         // this.dialog = false;
            //         // console.log("good");
            //     // }
            // };
            return errors === 0;
        },
        login(evt) {
            const status = this.checkLogin();
            if (status) {
                this.$store
                .dispatch("user/login", this.user)
                .then(res => {
                    this.$router.push({ path: `/dashboard/me` });
                    this.dialog = false;
                    this.$ebus.$emit("logged")
                })
                .catch(err => {
                    console.error(err);
                    alert("Veuillez vérifier vos identifiants")
                });
               
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #titreLog {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 25px;
        margin: auto
    }
</style>

