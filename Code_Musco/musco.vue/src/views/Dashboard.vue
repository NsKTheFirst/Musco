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
      ],
      responsive: false,
      color: "green",
      drawer: null,
      mobil: false
    }
  },

  methods: {
    onClickBtn() {
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
  @media screen and (min-width:959px) {
    #dashboard_content {
      width: 80%;
      margin: auto;
      padding: 0% 10%
    }
    .dashBtn {
      color: #01dc0e;
    
      #dashIcon {
        transition: none
      }
    }
    #dashboard {
      .v-list-item {
        padding: 10px;
        border-radius: 4px
      }
    }
  }
  @media screen and (min-width:768px) and (max-width:959px) {
    #dashboard_content {
      width: 90%;
      margin: auto;
      padding: 0% 10%
    }

    .dashBtn {
      color: #01dc0e;

        #dashIcon {
          transition: none
        }
    }

    #dashboard {
      .v-list-item {
        padding: 10px;
        border-radius: 4px
      }
    }
  }

  @media screen and (max-width:767px) {
    #dashboard_content {
      width: 90%;
      margin: auto;
      padding: 0% 10%
    }

    .dashBtn {
      color: #01dc0e;
    
      #dashIcon {
        transition: none
      }
    }
    #dashboard {
      .v-list-item {
        padding: 10px;
        border-radius: 4px
      }
    }
  }
</style>
