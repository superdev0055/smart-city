<template>
  <div class="content">

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <p class="card-category" style='display:inline;'>Title :  <h4 style='display:inline;' class="card-title">
              {{feedback.title}}</h4>
              <div style="margin-top: 10px"><p class="card-category" style='display:inline;'>Published by : <h5
                style='display:inline'>{{feedback.user.firstName}} {{feedback.user.lastName}}</h5></div>

              <p class="card-category" style="margin-top: 10px"> {{feedback.date}}</p>
              <div v-if="feedback.degree === 1"><p class="card-category" style='display:inline'>Degree</p><img
                class="smile" src="https://res.cloudinary.com/turdlife/image/upload/v1492864443/sad_bj1tuj.svg"/></div>
              <div v-if="feedback.degree === 2"><p class="card-category" style='display:inline'>Degree</p><img
                class="smile" src="https://res.cloudinary.com/turdlife/image/upload/v1492864443/neutral_t3q8hz.svg"/>
              </div>
              <div v-if="feedback.degree === 3"><p class="card-category" style='display:inline'>Degree</p><img
                class="smile" src="https://res.cloudinary.com/turdlife/image/upload/v1492864443/happy_ampvnc.svg"/>
              </div>


            </template>
            <div class="typo-line">
              <h3><p class="category">Incident</p>{{feedback.incident.Title}}</h3>
            </div>

            <div class="typo-line">
              <h3><p class="category">Description</p>{{feedback.description}}</h3>
            </div>

            <div v-if="user !=null" class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Your opinion</label>
                  <textarea class="form-control border-input"
                            placeholder="Write a comment" v-model="comment">
              </textarea>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button v-if="user !=null" type="submit" class="btn btn-info btn-fill float-right" @click="addComment">
                Comment it
              </button>
            </div>

            <div class="row col-md-12">
              <div class="col-md-12">
                <h5>Comments</h5>

                <div v-if="user !=null">

                  <div v-for="commentt in comments">
                    <div v-bind:class="[commentt.user._id === user._id ? userCommentClass :  alluserCommentClass]"
                         :title="commentt.date">
                      <td style="color: #0e0e0e">By : {{commentt.user.firstName}} {{commentt.user.lastName}}</td>
                      <span>{{commentt.content}}</span>
                      <td style="position: absolute;right:20px;top:20px;" v-if="commentt.user._id === user._id">
                        <button type="button" class="btn-simple btn btn-xs btn-danger" @click="updateC(commentt._id)">
                          <i class="fa fa-edit"></i>
                        </button>
                        <button type="button" class="btn-simple btn btn-xs btn-danger" @click="deleteC(commentt._id)">
                          <i class="fa fa-times"></i>
                        </button>
                      </td>
                    </div>
                  </div>
                </div>
                <div v-if="user ===null">
                  <div v-for="commentt in comments">
                    <div class="alert alert-danger">
                      <span>{{commentt.content}}</span>

                    </div>
                  </div>
                </div>


              </div>
            </div>


            <gmap-map
              id="map"
              :center="center"
              :zoom="13"
              :options="options"
              map-type-id="terrain"
            >
              <gmap-marker :position="center">
              </gmap-marker>
            </gmap-map>

          </card>

        </div>

      </div>

    </div>

  </div>


</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import FeedbacksService from '@/services/FeedbacksService'
  import {API_KEY} from './Maps/API_KEY'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'

  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })
  export default {
    components: {
      Card
    },
    name: 'Feedback Detail',
    data() {
      return {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        userCommentClass: 'alert alert-info',
        alluserCommentClass: 'alert alert-danger',
        feedback: '',
        comment: '',
        comments: [],
        addCommentControl: [],
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
      this.getFeedback(),
        this.getComments()
    },
    methods: {
      async getFeedback()
  {
    const response = await
    FeedbacksService.getFeedbackById({
      id: this.$route.params.id
    })
    this.feedback = response.data
    const responseFeedbackIncidentPlace = await
    FeedbacksService.getFeedbackIncidentLatLong(this.feedback.incident.address.place)
    this.center.lat = responseFeedbackIncidentPlace.data.latitude
    this.center.lng = responseFeedbackIncidentPlace.data.longitude
  }
  ,
  async
  addComment()
  {
    const $this = this
    this.addCommentControl = []
    if (!this.comment) this.addCommentControl.push('Comment content required.')

    if (this.addCommentControl.length <= 0) {
      await
      FeedbacksService.addCommentToFeedback(this.$route.params.id,
        {
          content: this.comment,
          user: this.user
        }
      )
      $this.$swal(
        'Great!',
        `Your comment has been added!`,
        'success'
      )
      this.comment = ""
      $this.comments = []
      $this.getComments()
    }
    else {
      $this.$swal({
        type: 'error',
        title: 'Oops...',
        text: 'Can not add an empty comment!'
      })
    }
  }
  ,
  async
  getComments()
  {
    const response = await
    FeedbacksService.getFeedbackById({
      id: this.$route.params.id
    })
    this.comments = response.data.comments
  }
  ,
  async
  deleteC(idComment)
  {
    const $this = this
    const idFeedBack = this.$route.params.id;
    $this.$swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function (res) {
      if (res.dismiss !== 'cancel') {

        FeedbacksService.deleteComment(idComment, idFeedBack);
        $this.comments = []
        $this.getComments()
      }

    })
  }
  ,
  async
  updateC(idComment)
  {
    const idFeedBack = this.$route.params.id;
    const response = await
    FeedbacksService.getCommentFromFeedback(idComment, idFeedBack)
    var commentC = response.data.comment.content

    const $this = this
    $this.$swal({
      title: 'Update your comment',
      input: 'textarea',
      inputValue: commentC,
      showCancelButton: true
    }).then(function (result) {
      if (result) {
        if (result.dismiss !== 'cancel')
          if (result.value === "") {
            $this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Can not update an empty comment!',
            })
          }

          else {
            FeedbacksService.updateComment(idComment, idFeedBack, result.value)
          }

      }
         $this.comments = []
        $this.getComments()

    });
  }


  }
  }

</script>
<style>
  #map {
    min-height: calc(100vh - 123px);
  }

  .smile {
    width: 50px;
    height: 50px;
    margin: 10px;
  }
</style>
