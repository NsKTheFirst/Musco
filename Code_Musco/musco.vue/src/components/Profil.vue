<template>
    <div>
        {{ user }}
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            // id: [],
            user: []
        }
    },
    methods: {
        getUser() {
            // console.log(this.id);
            const url = "http://localhost:5000/api/v1/user/simple/";
            axios.get(url + this.$route.params.id).then(res => {
                console.log(res.data);
                this.user = res.data;
            }).catch(err => {
                console.log(err);
            });
            console.log(this.user);
        }
    },
    mounted() {
        // console.log(this.path);
        this.getUser()
    //     this.$ebus.$on("owner", owner => {
    //         this.owner = owner;
    //         console.log(this.owner);
    //     });
    //     this.getUser();
    },
    created() {
        this.getUser();
    }
}
</script>

<style lang="scss" scoped>

</style>
