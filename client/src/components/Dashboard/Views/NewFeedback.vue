<template>
  <div class="feedback">
    <div class="form">
      <h1>Add Feedback</h1>

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      <p v-for="error in errors">{{ error }}</p>


      <div>
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>


        <div style=" width: 500px ;height: 200px;margin: auto"  >

          <tr>
            <td><img class="smile" src="https://res.cloudinary.com/turdlife/image/upload/v1492864443/sad_bj1tuj.svg"/>
            </td>
            <td><img class="smile" src="https://res.cloudinary.com/turdlife/image/upload/v1492864443/neutral_t3q8hz.svg"/>
            </td>
            <td><img class="smile" src="https://res.cloudinary.com/turdlife/image/upload/v1492864443/happy_ampvnc.svg"/>
            </td>
          </tr>


          <tr>
            <td><input type="radio" name="smiley" value="1" v-model="smile" >
            </td>
            <td><input type="radio" name="smiley" value="2" checked="checked" v-model="smile">
            </td>
            <td><input type="radio" name="smiley" value="3" v-model="smile"  >
            </td>
          </tr>

        </div>


        <select v-model="selected" style="width:48%">
          <option v-for="(incident, index) in incidents" v-bind:selected="index === 0">{{incident.Title}}</option>
        </select>
      </div>


      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description" name="description"></textarea>
      </div>


    </div>
    <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px ">
      <gmap-map v-if="center.lat != 0 || center.lng != 0" style="width: 70%"
                id="map"
                :center="center"
                :zoom="13"
                :options="options"
                map-type-id="roadmap"
      >
        <gmap-marker :position="center">
        </gmap-marker>
      </gmap-map>

    </div>

    <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px ">
      <button class="app_post_btn" @click="addFeedback">Add</button>
    </div>

  </div>

</template>

<script>
  import FeedbacksService from '@/services/FeedbacksService'
  import IncidentsService from '@/services/IncidentsService'
  import {API_KEY} from './Maps/API_KEY'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import BootstrapVue from 'bootstrap-vue'


  Vue.use(BootstrapVue);
  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })
  export default {
    name: 'NewFeedback',
    data() {
      return {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        title: '',
        description: '',
        smile : '2',
        errors: [],
        incidents: [],
        selected: '',
        center: {
          lat: '',
          lng: ''
        },
        options: {
          styles: [{
            'featureType': 'water',
            'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#808080'}, {'lightness': 54}]
          }, {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ece2d9'}]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ccdca1'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{'color': '#767676'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [{'color': '#ffffff'}]
          }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
            'featureType': 'landscape.natural',
            'elementType': 'geometry.fill',
            'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
          }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.sports_complex',
            'stylers': [{'visibility': 'on'}]
          }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.business',
            'stylers': [{'visibility': 'simplified'}]
          }]
        }
      }
    },
    mounted() {
      this.getAllIncidents()
    },
    beforeUpdate() {
      if (this.selected != "")
        this.updateMap()
    },
    methods: {
      async addFeedback()
  {
    this.errors = []
    if (!this.title) this.errors.push('Title required.')
    if (!this.description) this.errors.push('Description required.')
    if (!this.selected) this.errors.push('Incident subject required.')
    if (this.errors.length > 0)
      this.$swal(
        'Erreur!',
        `you need to fill all blanks!`,
        'error'
      )
    if (this.errors.length <= 0) {
      await
      FeedbacksService.addFeedback({
        title: this.title,
        description: this.description,
        incident: this.selected,
        user: this.user,
        degree : this.smile
      })
      this.$swal(
        'Great!',
        `Your feedback has been added!`,
        'success'
      )
      this.$router.push({name: 'Feedbacks'})
      this.$router.push('feedbacks')
    }
  }
  ,
  async
  getAllIncidents()
  {
    this.incidents = []
    const response = await
    IncidentsService.fetchIncidents()
    this.incidents = response.data.incidents
  }
  ,
  async
  updateMap()
  {
    const response = await
    IncidentsService.fetchIncidentByTitle(this.selected)
    const responseFeedbackIncidentPlace = await
    FeedbacksService.getFeedbackIncidentLatLong(response.data.incident.address.place)
    this.center.lat = responseFeedbackIncidentPlace.data.latitude
    this.center.lng = responseFeedbackIncidentPlace.data.longitude
    console.log(response.data.incident.address.place + " : the place is " + this.center.lat + "" + this.center.lng)
  }

  }
  }
</script>

<style type="text/css">
  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }

  .form {
    text-align: center;
  }

  .form div {
    margin: 20px;
  }

  .app_post_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }

  #map {
    min-height: calc(100vh - 123px);
  }

  .smile {
    width: 50px;
    height: 50px;
    margin: 50px;
  }

  input[type="radio"] {
    width: 50px;
  }

</style>
