<template>
    <section>
        <h1 id="titre">Mes suivis</h1>
        <div class="carte" v-for(suivi, s) in suivis :key="s">
            <div class="avatPseudo">
                <figure>
<!-- ******************** Revoir la requête de get ufu pour avoir l'avatar de l'user suivi ********************* -->
                    <img src="" alt="">
                </figure>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            suivis: []
        }
    },
    methods: {
        getUfu() {
            const url = "http://localhost:5000/api/v1/ufu/";
            axios.get(url + this.infos.id_user).then(res => {
                console.log(res.data);
                this.suivis = res.data;
            }).catch(err => {
                console.log(err);
            });
            console.log(this.suivis);
        },
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        },
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getUfu();
    }
}
</script>

<style lang="scss" scoped>
    .carte {
        width: 80%;
        height: auto
    }
</style>
