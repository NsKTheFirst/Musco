<template>
  <section>
      <v-toolbar-title>
        <v-btn class="dashBtn" icon @click="drawer = !drawer">
          <v-icon id="dashIcon">dashboard</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-navigation-drawer
        v-model="drawer"
        app
        absolute
        dark
        temporary
      >
        <v-list class="pa-1">
          <v-list-tile v-for="(link, i) in links" :key="i" :to="link.to" :active-class="color" class="v-list-item">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text"/>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    <router-view id="dashboard_content"/>
    <BackToTop/>
  </section>
</template>

<script>
import auth from "@/utils/auth.js"
import BackToTop from '@/components/BackToTop'
export default {
  components: {
    BackToTop
  },
  data () {
    return {
      links: [
        {
          to: '/dashboard/me',
          icon: 'person',
          text: 'Mon profil'
        },
        {
          to: '/dashboard/annonces',
          icon: 'announcement',
          text: 'Mes annonces'
        },
        {
          to: '/dashboard/messages',
          icon: 'email',
          text: 'Mes messages'
        },
        {
          to: '/dashboard/suivis',
          icon: 'people',
          text: 'Mes suivis'
        },
        {
          to: '/dashboard/prods',
          icon: 'library_music',
          text: 'Mes produtions',
        },
      ],
      responsive: false,
      color: "green",
      drawer: null,
        // mobil: null,
        // items: [
        //   { title: 'Home', icon: 'dashboard' },
        //   { title: 'About', icon: 'question_answer' }
        // ],
      mini: false,
      right: null
    }
  },

  // computed: {
    // ...mapState(['setDrawer', 'toggleDrawer']),
    // inputValue: {
    //   get() {
    //     return this.$store.drawer
    //   },
    //   set(val) {
    //     this.setDrawer(val)
    //   }
    // }
  // },
  
  methods: {
    // ...mapMutations(['setDrawer', 'toggleDrawer']),
    onClickBtn() {
      this.mobil = !null;
      this.drawer= !null;
    },
    logout() {
      auth.logUserOut(this);
    },
    onResponsiveInverted() {
      if (window.innerWidth < 1264) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInerted)
  }
};
</script>

<style lang="scss" scoped>
#dashboard_content {
  width: 80%;
  margin: auto;
  padding: 0% 10%
}
.dashBtn {
  color: #01dc0e;
  &:hover {
    color: #8833f8
  }
  #dashIcon {
    transition: none
  }
}
#dashboard {
  .v-list-item {
    // color: white;
    padding: 10px;
    border-radius: 4px
  }
}
.green {
  background: #01dc0e
}

// #dashboard {
//   display: grid;
//   grid-template-columns: 160px repeat(5, 1fr);
//   grid-template-rows: 32px repeat(2, 1fr);
// }
// #nav_dashboard {
//   grid-column: 1 / 2;
//   margin-top: 30px;

//   .list {
//     margin: 0;
//     align-items: flex-start;
//     flex-direction: column;

//     .item {
//       width: 100%;
//       display: flex;
//       justify-content: space-between;
//     }
//   }
// }
// #title {
//   margin: 0;
//   line-height: 32px;
//   grid-column: 2 / 7;
//   grid-row: 1 / 2;
// }
// #dashboard_content {
//   grid-column: 2 / 7;
//   grid-row: 2;
// }
</style>
