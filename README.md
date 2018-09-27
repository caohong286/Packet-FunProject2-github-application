# github-application

> A application for Github

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

npm install -g vue-cli
vue init webpack github-application

 Command vue init requires a global addon to be installed.
  Please run npm install -g @vue/cli-init and try again.



D:\StudyJs\vuejs\Fun Projects with Vue 2>npm install -g @vue/cli-init
npm WARN deprecated coffee-script@1.12.7: CoffeeScript on NPM has moved to "coffeescript" (no hyphen)
+ @vue/cli-init@3.0.2
added 249 packages in 58.585s

npm install
npm install --save axios vue-router vue-material
npm install --save-dev sass-loader node-sass

D:\StudyJs\vuejs\Fun Projects with Vue 2\github-application\src\assets\sass\app.scss

04_Setting Up axios
参考：https://api.github.com/users/petervmeijgaard

//--------------------------bootstrap.js add----------------------------
import Axios from 'axios';
Axios.defaults.baseURL=process.env.API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json';

Object.defineProperty(Vue.prototype,'$http',{
  get(){
    return Axios;
  }
});
//--------------------------prod.env.js add----------------------------
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_LOCATION:'"https://api.github.com/"'
}

//--------------------------App.vue add----------------------------
export default {
  name: 'app',
  router,
  data(){
    return {
      user:null
    }
  },

  methods:{
    fetchUser(username){
      this.$http.get(`https://api.github.com/users/${username}`)
        .then((res) => {
          // console.log(res)
          this.user = res.data
        });
    }
  },
  mounted(){
    this.fetchUser('petervmeijgaard');
  }
}


05_Setting Up Vue Material
https://vuematerial.github.io
https://vue-material-old.netlify.com
https://vuematerial.io/

npm install --save material-design-icons

//--------------------------App.vue add----------------------------
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
            this.repositories = data
          });
      }
      // ,toggleSidenav() {
      //   this.$refs.sidenav.toggle();
      // }
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
