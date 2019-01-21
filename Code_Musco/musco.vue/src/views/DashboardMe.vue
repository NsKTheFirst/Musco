<template>
    <div>
        <h1 class="titre">Mon profil</h1>
        {{ infos }}
        <figure>
            <img :src="getAvatar(infos.avatar)" :alt="infos.pseudo">
        </figure>
        <h2 class="titre2">{{ infos.pseudo }}</h2>
        <div id="boutons">
            <i class="fas fa-plus-square fa-3x"></i>
            <i class="fas fa-pen-square fa-3x"></i>
        </div>
        <h2 class="titre2">Présentation</h2>
        <div class="pres" v-if="infos.presentation">{{ infos.presentation }}</div>
        <div id="boutons">
            <i v-if="!infos.presentation" class="fas fa-plus-square fa-3x"></i>
            <i class="fas fa-pen-square fa-3x"></i>
        </div>
    </div>
</template>

<script>

export default {
    // computed: {
    //     infos() {
    //         return this.$store.getters["user/current"]
    //     }
    // },
    methods: {
        getAvatar(url) {
            console.log(url);
            return url ? require(`@/assets/Avatars/${url}`) : require("@/assets/Avatars/avatar_par_defaut.jpg");
        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'))
    }
}
</script>

<style lang="scss" scoped>
    .titre {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 50px;
        margin-bottom: 30px
    }
    figure {
        display: flex;
        justify-content: center;
    
        img {
            border-radius: 50%;
            border: solid 5px #8833f8;
            margin: auto  
        }
    }

    .titre2 {
        text-align: center;
        font-family: 'Shrikhand', cursive;
        font-size: 30px;
        margin-bottom: 10px
    }
    #boutons {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 30px;

        .fa-plus-square {
            margin-right: 30px;
            color: #8833f8;
            &:hover {
                cursor: pointer;
            }
        }

        .fa-pen-square {
            margin-left: 30px;
            color: #01dc0e;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .pres {
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        font-size: 18px
    }


</style>
