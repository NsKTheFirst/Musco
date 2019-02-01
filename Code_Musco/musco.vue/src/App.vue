<template>
  <v-app id="app">
    <!-- <MyNav/>
    <router-view/>
    <MyFooter/> -->
    <Navbar/>
    <v-content>
      <router-view></router-view>
      <FormLogin/>
      <FormRegister/>
    </v-content>
    <MyFooter2/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import MyFooter2 from '@/components/MyFooter2'
import FormLogin from '@/components/Forms/FormLogin.vue'
import FormRegister from '@/components/Forms/FormRegister.vue'
export default {
  components: {
    // MyNav,
    // MyFooter
    Navbar,
    MyFooter2,
    FormLogin,
    FormRegister
  }
}
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    appearance: scrollbarbutton-up;
  }

  .leaflet-container {
    overflow: visible;
    margin-bottom: 300px
  }
  
</style>
