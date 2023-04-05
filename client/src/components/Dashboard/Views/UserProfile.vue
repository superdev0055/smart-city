<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 ">
          <card>
    <h4 slot="header" class="card-title">Login</h4>
    <hr>
    <h5 class="table-wrap" style="text-align: center">Sign in with your google account<GoogleLogin client-id="355541983809-imn5j4sg8u5s7eo71r41e0hnln5qhono.apps.googleusercontent.com" v-bind:onsuccess="onSign" v-bind:onerror="onError"></GoogleLogin></h5>
<hr>
    <form id="loginform" @submit.prevent="onSubmit">
      

      <div class="row">
        <div class="col-md-6">
          <fg-input 
                    label="Email"
                    placeholder="Email"
                    type="email" id="email" 
                     v-model="email">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input  type="password" id="password"
                    label="Password"
                    placeholder="Password"
                     v-model="password">
          </fg-input>
        </div>
      </div>

      

      

      
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right">
          Login
        </button>

      </div>
      <div class="clearfix"></div>
    </form>
  </card>
        </div>
        <!-- <GoogleLogin client-id="355541983809-imn5j4sg8u5s7eo71r41e0hnln5qhono.apps.googleusercontent.com" v-bind:onsuccess="onSignIn" v-bind:onerror="onError"></GoogleLogin>
    <GoogleLogout client-id="355541983809-imn5j4sg8u5s7eo71r41e0hnln5qhono.apps.googleusercontent.com" v-bind:logout="logout">Logout</GoogleLogout> -->

      </div>

    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
    import Card from 'src/components/UIComponents/Cards/Card.vue'
    import axios from 'axios'
    import GoogleLogin from './google-login/google-login'
import GoogleLogout from './google-logout/google-logout'


  export default {
    name: 'login',
    components: {
      EditProfileForm,
      UserCard,
      Card,
      GoogleLogin,
      GoogleLogout
    },
    
  data () {
    return {
      email: '',
      password: '',
      nom: '',
      email: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('token') !== null) {
      next({ path: '/' })
    } else {
      next()
    }
  },
  methods: {
    async onSign (googleUser) {
      const profile = googleUser.getBasicProfile()
      this.msg = `Welcome, ${profile.getName()}, to Our Vue.js App`
      console.log(`ID: ${profile.getId()}`)
      console.log(`Name: ${profile.getName()}`)
      console.log(`Image URL: ${profile.getImageUrl()}`)
      console.log(`Email: ${profile.getEmail()}`)
      console.log(`ID Token: ${googleUser.getAuthResponse().id_token}`)
      localStorage.setItem('nom', `${profile.getName()}`)
      localStorage.setItem('email', `${profile.getEmail()}`)
      const BASE_URL = 'http://localhost:8001/user/login'
      axios.post(BASE_URL , {
      Email: `${profile.getEmail()}`,
      password: 'googleauthentication'
    })
        .then(response => {
          //console.log(response.data.tokens[response.data.tokens.length - 1].token)
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('id', response.data._id)
            console.log(response.data)
          // localStorage.setItem('token', response.data.tokens[data.tokens.length - 1].token)
           localStorage.setItem('token',response.data.tokens[response.data.tokens.length - 1].token)
           this.$router.go({
          path: '/maps'
        })
        })
        // .then(data => {
        //   localStorage.setItem('user', JSON.stringify(data))
        //   localStorage.setItem('token', data.tokens[data.tokens.length - 1].token)
        //   console.log(data)
        //    this.$router.push('/')
        // })
        .catch(error => {
          this.onSignIn(googleUser)
          console.log(error)
        })
    },
    async onSignIn (googleUser) {
      const profile = googleUser.getBasicProfile()
      this.msg = `Welcome, ${profile.getName()}, to Our Vue.js App`
      console.log(`ID: ${profile.getId()}`)
      console.log(`Name: ${profile.getName()}`)
      console.log(`Image URL: ${profile.getImageUrl()}`)
      console.log(`Email: ${profile.getEmail()}`)
      console.log(`ID Token: ${googleUser.getAuthResponse().id_token}`)
      localStorage.setItem('nom', `${profile.getName()}`)
      localStorage.setItem('email', `${profile.getEmail()}`)
      this.nom = localStorage.getItem('nom')
      this.email = localStorage.getItem('email')
      const BASE_URL = 'http://localhost:8001/user'
      
      axios.post(BASE_URL , {
      Email: `${profile.getEmail()}`,
        password: 'googleauthentication',
        firstName: `${profile.getName()}`
        
    })
        .then(response => {
          this.onSign(googleUser)
           this.$router.go({
          path: '/maps'
        })
        })
        // .then(data => {
        //   localStorage.setItem('user', JSON.stringify(data))
        //   localStorage.setItem('token', data.tokens[data.tokens.length - 1].token)
        //   console.log(data)
        //    this.$router.push('/')
        // })
        .catch(error => {
          console.log(error)
        })
    },
    async onError (error) {
      console.log(error)
    },
    async logout () {
      this.msg = 'Good Bye from Your Vue.js App'
      localStorage.setItem('nom', '')
      localStorage.setItem('email', '')
      this.nom = ''
      this.email = ''
    },
    onSubmit () {
      const formData = {
        Email: this.email,
        password: this.password
      }
      const BASE_URL = 'http://localhost:8001/user/login'
      
      axios.post(BASE_URL , {
      Email: this.email,
        password: this.password
    })
        .then(response => {
          //console.log(response.data.tokens[response.data.tokens.length - 1].token)
            localStorage.setItem('user', JSON.stringify(response.data))
            
          // localStorage.setItem('token', response.data.tokens[data.tokens.length - 1].token)
           localStorage.setItem('token',response.data.tokens[response.data.tokens.length - 1].token)
           this.$router.go({
          path: '/maps'
        })
        })
        // .then(data => {
        //   localStorage.setItem('user', JSON.stringify(data))
        //   localStorage.setItem('token', data.tokens[data.tokens.length - 1].token)
        //   console.log(data)
        //    this.$router.push('/')
        // })
        .catch(error => {
          console.log(error)
        })
    }
  }
  }

</script>
<style>

</style>
