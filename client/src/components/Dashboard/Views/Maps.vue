<template>
  <div class="content">
    <div class="container-fluid">
      <h2 class="table-wrap">Heatmap</h2>
      <hr>
      <div class="row">
        <div class="col-md-7">
          <!-- <vue-google-heatmap :points="points" /> -->
          <!-- :width="600" :height="600" -->
          <gmap-map
            id="map"
            :center="center"
            :zoom="13"
            :options="options"
            style="height: 1000px"
            map-type-id="roadmap"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in points"
              :position="m.position"
              :icon="{url:'https://i.imgur.com/uJtyOlv.png'}"

              :clickable="true"
              :draggable="false"
              @click="cente(m.position,m.id)"
            >
              <!-- <gmap-info-window :opened="tab">
                    Title : <b>{{title}}</b><i class="fa fa-map-marker"></i>{{place}}<br><br>
                    Description : {{description}}
                </gmap-info-window> -->
            </gmap-marker>
          </gmap-map>
        </div>
        <div class="col-md-5">
          <!-- <card>
            <template slot="header">
              <h5 class="title">Nearest incidents</h5>
              <p class="category">Incidents near to that place</p>
            </template> -->


          <div class="feedbacks">
            <div class="search-wrapper">
              <h5 class="table-wrap">Search by title or type<br>
                <input type="text" style="width:45%" v-model="search" placeholder="Search title.."/>
                <select v-model="selected" placeholder="Type" style="width:45%">
                  <option value="" disabled selected>Type alert</option>
                  <option >accident</option>
                  <option >Braquage</option>
                  <option></option>
                </select>
              </h5>
            </div>
            <hr>
            <h5 class="table-wrap">Search by Date<br>
              <input type="date" style="width:45%" v-model="mydate" /> <input type="date" style="width:45%" v-model="mydate2" />
            </h5>
            <hr>
            <h5 class="table-wrap">Nearest alerts to your position
              <!-- <toggle-button :value="false" @change="updateValue"/>  -->
            </h5>
            <div>
              <vue-slider ref="slider" v-model="value"></vue-slider>
            </div>
            <hr>
            <div v-if="incidents.length > 0">
              <card v-for="i in filteredList" style="height:135px">
                <template slot="header">
                  <h4 class="card-title"><router-link v-bind:to="{ name: 'incident Detail', params: { id: i._id } }">{{i.Title}} </router-link> <i class="fa fa-arrows-h"></i> {{i.distance}} </h4>
                  <p class="card-category">{{i.date}}</p>
                </template>
                <div class="typo-line">
                  <p class="category">Description :</p>
                  <p class="text-muted">
                    {{i.Description}}
                  </p>
                </div>
              </card>
            </div>
          </div>
          <!-- <table>
            <tr>
              <td> nearest alerts to your</td>
              <td>current position</td>
              <td><toggle-button
            :value="false"
            @change="updateValue"/>
</td>

            </tr>
            <tr v-for="i in filteredList">
              <td><router-link v-bind:to="{ name: 'incident Detail', params: { id: i._id } }">{{i.Title}}</router-link></td>
              <td>{{ i.Description }}</td>
              <td>{{ i.distance }} km</td>
            </tr>
          </table> -->


          <!-- <div class="footer">
            <hr>
            <div class="stats">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </div>
        </card> -->
        </div>
        <!-- <div class="feedbacks">
          <h1 class="table-wrap">Feedback</h1>
          <div v-if="incidents.length > 0" class="table-wrap">
            <table>
              <tr>
                <td width="300">Title</td>
                <td width="650">Description</td>
              </tr>
              <tr v-for="i in incidents">
                <td>{{i.Title}} </td>
                <td>{{ i.Description }}</td>
              </tr>
            </table>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  // import {API_KEY} from './Maps/API_KEY'
  import Vue from 'vue'
  //   import VueGoogleHeatmap from 'vue-google-heatmap'
  //  Vue.use(VueGoogleHeatmap, {
  //   apiKey: API_KEY
  // })
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import axios from 'axios'
  import VueGoogleHeatmapVue from 'vue-google-heatmap/src/VueGoogleHeatmap.vue'
  import IncidentsService from '@/services/IncidentsService'
  import {API_KEY} from './Maps/API_KEY'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import vueSlider from 'vue-slider-component'


  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })

  export default {
    name: 'HelloWorld',
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
      vueSlider
    },
    data () {
      return {
        mydate: '',
        mydate2: new Date(),
        value: 0,
        tab : false,
        points: [
          // {lat: response.data[i].address.coordinates[0], lng: response.data[i].address.coordinates[1]}
          // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.447), weight: 0.5},
          // {lat: 37.800886, lng: -122.435959}
        ],

        incidents: [],
        selected: '',
        search: '',
        token: localStorage.getItem("token"),
        id : '',
        center: {
          lat: 36.900,
          lng: 10.186
        },
        markers: [],
        title:'',
        description:'',
        place:'',
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
    mounted () {
      this.getNearest()
    },
    computed: {
      appointments() {
        return this.incidents.slice(0).sort((a, b) => a.distance > b.distance ? this.sorting : -this.sorting )
      },
      filteredList() {



        if (this.selected != '') {
          return this.incidents.filter(post => {
            return post.type.toLowerCase().includes(this.selected.toLowerCase())
          })
        }
        if (this.search != '') {
          return this.incidents.filter(post => {
            return post.Title.toLowerCase().includes(this.search.toLowerCase())
          })
        }
        if (this.value >= 1) {
          return this.incidents.filter(post => {
            return post.distance<this.value
          })
        }
        if (this.mydate !='' && this.mydate2 != '') {
          return this.incidents.filter(post => {
            return post.date<this.mydate2 && post.date>this.mydate
          })
        }
        return this.incidents.filter(post => {
          return post.type.toLowerCase().includes(this.selected.toLowerCase())
        })
      }
    },
    methods: {
      cente (l,id) {
        this.center = l
        //  this.$router.go({
        //   path: '/#/myalerts'
        // })
      },
      async getNearest () {
    const response = await IncidentsService.getNearestInidents()
    this.incidents = response.data
  },
  updateValue (event) {
    // console.log(event.value)
    if (event.value ==true) {
      this.incidents.sort((a, b) => a.distance > b.distance)
      console.log("true")
    }else{
      this.incidents.sort((a, b) => a.distance < b.distance)
      console.log("false")
    }
    // event.value - is a current state of the component (true/false)
  }
  },
  created () {
    axios.get(`http://localhost:8001/incident`)
      .then(response => {
      // JSON responses are automatically parsed.
      // console.log(response.data[0].address)
      for (let i = 0; i < response.data.length; i++) {
      // console.log(response.data[i].address.coordinates[0])
      this.points.push({position: {lat: response.data[i].address.coordinates[0], lng: response.data[i].address.coordinates[1]-0.00003},id: response.data[i]._id})
    }
    // console.log(this.points.length)
  })
  .catch(e => {
      this.errors.push(e)
  })
  }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .table-wrap {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    alignment: center;
  }
  table th, table tr {
    text-align: left;
  }
  table thead {
    background: #f2f2f2;
  }
  table tr td {
    padding: 10px;
  }
  table tr:nth-child(odd) {
    background: #f2f2f2;
  }
  table tr:nth-child(1) {
    background: #4d7ef7;
    color: #fff;
  }
  a {
    color: #4d7ef7;
    text-decoration: none;
  }
  a.add_post_link {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
</style>

