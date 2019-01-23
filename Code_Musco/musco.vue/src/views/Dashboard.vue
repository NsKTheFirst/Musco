<template>
  <!-- <section>
    <div>
      <v-toolbar-title>
        <v-btn v-if="responsive" class="dashBtn" icon @click="onClickBtn">
          <v-icon>dashboard</v-icon>
        </v-btn>
      </v-toolbar-title>
    </div>
    <v-navigation-drawer id="dashboard" app dark v-model="drawer" value="mobil" mobile-break-point="1264" width="260">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile v-for="(link, i) in links" :key="i" :to="link.to" :active-class="color" class="v-list-item">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text"/>
        </v-list-tile>
      </v-layout>
    </v-navigation-drawer>
    <router-view id="dashboard_content"/>
  </section> -->

<!-- ***Vuetify navigation drawer**** -->
  <section>
  <!-- <v-layout
    wrap
    style="height: 200px;"
  >
    <v-container>
      <v-layout justify-center>
        <v-btn
          color="pink"
          dark
          @click.stop="drawer = !drawer"
        >
          <v-icon>dashboard</v-icon>
        </v-btn>
      </v-layout>
    </v-container> -->
  <!-- <v-layout
    wrap
    style="height: 200px;"
  > -->
    <v-toolbar-title>
        <v-btn class="dashBtn" icon @click="drawer = !drawer">
          <v-icon id="dashIcon">dashboard</v-icon>
        </v-btn>
      </v-toolbar-title>
  <!-- </v-layout> -->
    <v-navigation-drawer
      v-model="drawer"
      
      app
      absolute
      dark
      temporary
    
    >

      <!-- <v-layout class="fill-height" tag="v-list" column> -->
      <v-list class="pa-1">
        <v-list-tile v-for="(link, i) in links" :key="i" :to="link.to" :active-class="color" class="v-list-item">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text"/>
        </v-list-tile>
      </v-list>
      <!-- </v-layout> -->
      <!-- <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
    </v-navigation-drawer>
  <!-- </v-layout> -->
  <router-view id="dashboard_content"/>
  </section>


  <!-- *** Gui dashboard *** -->
  <!-- <section id="dashboard" class="page dashboard">
    <h1 id="title" class="title">Dashboard</h1>

    <nav id="nav_dashboard" class="nav">
      <ul class="list">
        <router-link
          exact-active-class="is-selected"
          class="clickable item"
          tag="li"
          to="/dashboard/me"
        >
          <span>infos</span>
        </router-link>

        <router-link
          exact-active-class="is-selected"
          class="clickable item"
          tag="li"
          to="/dashboard/annonces"
        >
          <span>Mes annonces</span>
        </router-link>

        <router-link
          exact-active-class="is-selected"
          class="clickable item"
          tag="li"
          to="/dashboard/manage-products"
        >
          <span>manage products</span>
        </router-link>
        <li class="clickable" @click="logout">logout</li>
      </ul>
    </nav>

    <router-view id="dashboard_content"/>
  </section> -->
</template>

<script>
import auth from "@/utils/auth.js"
// import mapMutations from 'vuex'
// import mapState from 'vuex'
export default {
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
            to: 'dashboard/suivis',
            icon: 'people',
            text: 'Mes suivis'
          },
          {
            to: 'dashboard/prods',
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
