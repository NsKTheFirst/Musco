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
            owner: null,
            user: []
        }
    },
    methods: {
        getUser() {
            const url = "http://localhost:5000/api/v1/user/simple/";
            axios.get(url + this.owner).then(res => {
                console.log(res.data);
                this.user = res.data;
            }).catch(err => {
                console.log(err);
            });
            console.log(this.user);
        }
    },
    // mounted() {
    //     // this.getUser()
    //     this.$ebus.$on("owner", owner => {
    //         this.owner = owner;
    //         console.log(this.owner);
    //     });
    //     this.getUser();
    // },
    created() {
        this.$ebus.$on("owner", owner => {
            this.owner = owner;
            console.log(this.owner);
        });
        this.getUser();
    }
}
</script>

<style lang="scss" scoped>

</style>
