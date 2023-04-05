<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="token != null">
            <a class="nav-link" href="#">
              Account
            </a>
          </li>

          <li class="nav-item" v-if="token != null">
            <router-link v-bind:to="{ name: 'Overview' }" ><a  @click="onLogout" class="nav-link">
              Log out
            </a></router-link>
          </li>
          <li class="nav-item" v-if="token ===null">
            <router-link v-bind:to="{ name: 'User' }"><a   class="nav-link">
              Login
            </a></router-link>
          </li>
          <li class="nav-item" v-if="token != null">
            <a href="/#/myalerts" class="nav-link">
              My alerts
            </a>
          </li>

          <li class="nav-item" v-if="token != null">
            <router-link v-bind:to="{ name: 'MyFeedback' }"><a   class="nav-link">
              My feedbacks
            </a></router-link>
          </li>


        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import axios from 'axios'

  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        activeNotifications: false
      }
    },
    methods: {
      onLogout () {
        const BASE_URL = 'http://localhost:8001'
        const url = `${BASE_URL}/user/logout`
        axios.delete(url, {headers: {Authorization: localStorage.getItem('token')}}).then((response) => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          this.$router.go({
            path: 'user'
          })
        }).catch(error => {
          console.log(error)
        })
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
