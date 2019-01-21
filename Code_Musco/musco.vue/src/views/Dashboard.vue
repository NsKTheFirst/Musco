<template>
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
          Toggle
        </v-btn>
      </v-layout>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      absolute
      dark
      temporary
    >
      <v-list class="pa-1">
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
      </v-list>
    </v-navigation-drawer>
  </v-layout> -->

  <section id="dashboard" class="page dashboard">
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
          to="/dashboard/manage-users"
        >
          <span>manage users</span>
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
  </section>
</template>

<script>
import auth from "@/utils/auth.js"
export default {
   data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
      }
    },
  
  methods: {
    logout() {
      auth.logUserOut(this);
    }
  }
};
</script>

<style lang="scss" scoped>
#dashboard {
  display: grid;
  grid-template-columns: 160px repeat(5, 1fr);
  grid-template-rows: 32px repeat(2, 1fr);
}
#nav_dashboard {
  grid-column: 1 / 2;
  margin-top: 30px;

  .list {
    margin: 0;
    align-items: flex-start;
    flex-direction: column;

    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
#title {
  margin: 0;
  line-height: 32px;
  grid-column: 2 / 7;
  grid-row: 1 / 2;
}
#dashboard_content {
  grid-column: 2 / 7;
  grid-row: 2;
}
</style>
