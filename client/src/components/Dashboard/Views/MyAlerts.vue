<template>
<div class="content" ref="test">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
              <div class="feedbacks">
                <h1 class="table-wrap">My alerts</h1>
                <div v-if="incidents.length > 0">
                  <card v-for="i in incidents">
                            <template slot="header">
                            <h4 class="card-title">{{i.Title}} <i class="fa fa-map-marker"></i> {{i.address.city}}</h4>
                            <p class="card-category">{{i.Date}}</p>
                            </template>
                            <div class="typo-line">
                          <p class="category">Description :</p>
                          <p class="text-muted">
                              {{i.Description}}
                          </p>
                        </div>
                            <div class="typo-line">
                            <button type="button" aria-hidden="true" class="close" @click="changeMArker(i)"> View </button>
                            <button type="button" aria-hidden="true" class="close" @click="deleteAlert(i._id)"> Delete | </button>
                            </div>
                  </card>
    </div>
  </div>
            </div>
            <div class="col-md-6">
                <gmap-map
                    id="map"
                    :center="center"
                    :zoom="14"
                    :options="options"
                    style="height: 800px"
                    map-type-id="roadmap"
                >
                    <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    

                    :clickable="true"
                    :draggable="false"
                    @click="center = m.position"
                    >
                      <gmap-info-window>
                          Title : <b>{{title}}</b><i class="fa fa-map-marker"></i>{{place}}<br><br>
                          Description : {{description}}
                      </gmap-info-window>
            </gmap-marker>
                    
                </gmap-map>
            </div>
            id : {{id}}
        </div></div></div>
</template>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import IncidentsService from "@/services/IncidentsService";
import { API_KEY } from "./Maps/API_KEY";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY
  }
});
export default {
  components: {
    Card
  },
  name: "feedbacks",
  data() {
    return {
      //         icon: {
      // url: 'https://www.google.tn/search?q=circle+png&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiS_suE5LDaAhVKaxQKHTXwAZsQ_AUoAXoECAAQAw#imgrc=zJcif-TCHUMWaM:',
      //     size: {width: 46, height: 46, f: 'px', b: 'px'},
      //     scaledSize: {width: 23, height: 23, f: 'px', b: 'px'}
      //         },
      incidents: [],

      id: localStorage.getItem("id"),
      center: {
        lat: 36.9,
        lng: 10.186
      },
      title: "",
      description: "",
      place: "",
      markers: [],
      lat: "",
      lng: "",
      options: {
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }
    };
  },
  mounted() {
    this.getMyIncidents();
  },
  methods: {
    async getMyIncidents() {
      //console.log(localStorage.getItem("userId"));
      // this.id = localStorage.getItem("id");
      const response = await IncidentsService.fetchByUser({id:this.id})
      this.incidents = response.data;
      console.log(response.data);
    },
    async changeMArker(lat) {
      this.markers = [];
      this.markers.push({
        position: {
          lat: lat.address.coordinates[0],
          lng: lat.address.coordinates[1]
        }
      });
      this.title = lat.Title;
      this.description = lat.Description;
      this.place = lat.address.place;
      this.center = {
        lat: lat.address.coordinates[0],
        lng: lat.address.coordinates[1]
      };
    },

    async deleteAlert(id) {
      const $this = this;
      $this
        .$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(function(res) {
          if (res.dismiss !== "cancel") {
            IncidentsService.deleteAlertById(id);
          }
          $this.$router.go({
            path: "/maps"
          });
        });
    }
  }
};
</script>





<style type="text/css">
.table-wrap {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  alignment: center;
}
table th,
table tr {
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
