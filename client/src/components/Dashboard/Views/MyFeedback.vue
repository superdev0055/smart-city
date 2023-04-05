<template>
  <div class="feedbacks">
    <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px ">
      <img src="../../../../static/img/myfeedback.jpg">
    </div>
    <div v-if="feedbacks.length > 0" class="table-wrap">
      <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px ">
        <router-link v-bind:to="{ name: 'New Feedback' }" class="add_post_link">Add Feedback</router-link>
      </div>


      <table style="margin-top: 30px">
        <tr>
          <td width="300">Title</td>
          <td width="650">Description</td>
          <td width="200" align="center">Action</td>
        </tr>
        <tr v-for="feedback in feedbacks" v-if="user._id === feedback.user._id" >

          <td v-bind:class="[feedback.status === status ? disabledClass :  enabledClass]" >
            <router-link style="color: white" v-bind:to="{ name: 'Feedback Detail', params: { id: feedback._id } }">{{feedback.title}}
            </router-link>
          </td>
          <td v-bind:class="[feedback.status === status ? disabledClass :  enabledClass]">{{ feedback.description }}</td>
          <td  v-bind:class="[feedback.status === status ? disabledClass :  enabledClass]" >

            <div v-if="feedback.status !== status " >

              <button type="button" class="btn btn-info">
                <router-link v-bind:to="{ name: 'Edit Feedback', params: { id: feedback._id } }"><i
                  class="fa fa-edit"></i>
                </router-link>
              </button>

              <button type="button" class="btn btn-danger" @click="deleteFeedback(feedback._id)">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div v-else style="display: flex;justify-content: center;">Deleted</div>

          </td>
        </tr>
      </table>
    </div>
    <div class="table-wrap" v-else>
      There are no feedbacks . Lets add one now <br/><br/>
      <router-link v-bind:to="{ name: 'New Feedback' }" class="add_post_link">Add Feedback</router-link>
    </div>
  </div>
</template>

<script>
  import FeedbacksService from '@/services/FeedbacksService'

  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'



  export default {
    components: {
      StatsCard
    },
    name: 'feedbacks',
    data() {
      return {
        feedbacks: [],
        lastFeedback: '',
        mostCommentedFeedback: '',
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        status: "disabled",
        enabledClass:'alert alert-info',
        disabledClass:'alert alert-dark',
      }
    },
    mounted() {
      this.getFeedbacks(),
        this.getLastFeedback()
    },
    methods: {
      async getFeedbacks()
  {
    const response = await
    FeedbacksService.fetchFeedbacks()
    this.feedbacks = response.data.feedbacks
    var mostCommentedFeedback = this.feedbacks[0]
    for (var i = 1; i < this.feedbacks.length; i++) {
      if (this.feedbacks[i].comments.length > mostCommentedFeedback.comments.length)
        mostCommentedFeedback = this.feedbacks[i]
    }
    this.mostCommentedFeedback = mostCommentedFeedback
  }
  ,
  async
  getLastFeedback()
  {
    const response = await
    FeedbacksService.fetchLastFeedback()
    this.lastFeedback = response.data.feedbacks[0]
  }
  ,
  async
  deleteFeedback(id)
  {
    const $this = this
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
        FeedbacksService.deleteFeedbackById(id)
      }
      $this.$router.go({
        path: '/feedbacks'
      })
    })
  }
  }
  }
</script>


<style type="text/css">

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
