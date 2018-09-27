<template>
  <div>
  <md-toolbar class="md-medium">
    <md-button
      class="md-icon-button"
     @click="showNavigation = true"
    >
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title">GitHub</h2>
    <md-field style="flex: 1">
        <md-input placeholder="Search username"
        v-model="username"
        ></md-input>
    </md-field>
  </md-toolbar>

  <md-drawer class="md-left" :md-active.sync="showNavigation" >
    <md-toolbar class="md-medium">
      <md-button
        class="md-icon-button"
         @click="showNavigation = false"
      >
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">GitHub</h2>
    </md-toolbar>
    <md-list>
      <md-list-item>
          <router-link :to="{name:'repositories'}">
            Repositories
          </router-link>
      </md-list-item>
      <md-list-item>
          <router-link :to="{name:'user'}">
            User
          </router-link>
      </md-list-item>
    </md-list>
  </md-drawer>

  <div class="main-content">
    <md-content>
      <router-view></router-view>
    </md-content>
  </div>
</div>
</template>

<script>
  import _ from 'lodash';
  import { router } from './bootstrap';

  export default {
    name: 'app',
    router,
    data(){
      return {
        showNavigation:false,
        user:null,
        username:null,
        repositories:[]
      }
    },
    watch:{
      username(value){
        // console.log(value);
        this.setUsername(value);
      }
    },
    methods:{
      fetchUser(username){
        this.$http.get(`users/${username}`)
          .then(({data}) => {
            // console.log(res)
            this.user = data
          });
      }
      ,fetchRepositories(username){
        this.$http.get(`users/${username}/repos`)
          .then(({data}) => {
            // console.log(data);
            this.repositories = data;
          });
      }
      // ,toggleSidenav() {
      //   this.$refs.sidenav.toggle();
      // }
      ,closeSidenav(){
        this.showNavigation = false;
      }
      ,setUsername:_.debounce(function(username){
        if(username){
          this.fetchUser(username);
          this.fetchRepositories(username);
        }else{
          this.user=null;
          this.repositories=[];
        }
      },500)
    }
  //   ,mounted(){
  //     this.fetchUser('petervmeijgaard');
  //   }
  }
</script>


<style lang="scss" scope>
  // $background:green;
  @import './assets/sass/app.scss';
  @import '../node_modules/vue-material/dist/vue-material.min.css';
  @import '../node_modules/vue-material/dist/theme/black-green-light.css'; // This line here
  @import '../node_modules/material-design-icons/iconfont/material-icons.css';



  body{
    background: $background;
  }

</style>
