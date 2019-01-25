<template>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            messages: []
        }
    },
   
    methods: {
        getMessages() {
            const url = "http://localhost:5000/api/v1/messages/owned/";
            axios.get(url + this.infos.id_user).then(res => {
                console.log(res.data);
                this.messages = res.data;
            }).catch(err => {
                console.log(err);
            });
        }
    },
    created() {
        this.infos = JSON.parse(window.localStorage.getItem('user'));
        this.getMessages();
    }
}
</script>

<style lang="scss" scoped>

</style>
