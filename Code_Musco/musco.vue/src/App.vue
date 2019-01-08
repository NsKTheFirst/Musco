<template>
  <v-app id="app">
    <!-- <MyNav/>
    <router-view/>
    <MyFooter/> -->
    <Navbar/>
    <v-content>
      <router-view></router-view>
      <FormLogin/>
    </v-content>
    <MyFooter2/>
  </v-app>
</template>

<script>
// import MyNav from '@/components/MyNav.vue'
// import MyFooter from '@/components/MyFooter.vue'
import Navbar from '@/components/Navbar'
import MyFooter2 from '@/components/MyFooter2'
import FormLogin from '@/components/Forms/FormLogin.vue'
export default {
  components: {
    // MyNav,
    // MyFooter
    Navbar,
    MyFooter2,
    FormLogin
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    appearance: scrollbarbutton-up ;
  }

  .leaflet-container {
    overflow: visible;
    margin-bottom: 300px
  }
  
</style>
