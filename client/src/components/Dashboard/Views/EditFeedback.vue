<template>
  <div class="feedback">
    <div class="form">
      <h1>Edit feedback</h1>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      <p v-for="error in errors">{{ error }}</p>


      <div>
        <input type="text" name="title" placeholder="TITLE" v-model="title">


        <div style=" width: 500px ;height: 70px;margin: auto;margin-top: 20px">

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
      </div>

      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <button class="app_post_btn" @click="updateFeedback">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
  import FeedbacksService from '@/services/FeedbacksService'
  export default {
    name: 'EditPost',
    data () {
      return {
        title: '',
        description: '',
        smile : '',
        errors: []
      }
    },
    mounted () {
      this.getFeedback()
    },
    methods: {
      async getFeedback () {
    const response = await FeedbacksService.getFeedbackById({
      id: this.$route.params.id
    })
    this.title = response.data.title
    this.description = response.data.description
    this.smile = response.data.degree
  },
  async updateFeedback () {
    this.errors = []
    if (!this.title) this.errors.push('Title required.')
    if (!this.description) this.errors.push('Description required.')
    if (this.errors.length <= 0) {
      await FeedbacksService.updateFeedbackById({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        degree : this.smile
      })
      this.$swal(
        'Great!',
        `Your feedback has been updated!`,
        'success'
      )
      this.$router.push({name: 'Feedbacks'})
      this.$router.push('feedbacks')
    }
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
  .form div {
    margin: 20px;
  }
  .form{
    text-align: center;
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
  .smile {
    width: 50px;
    height: 50px;
    margin-right: 55px;
    margin-left: 55px;

  }

  input[type="radio"] {
    width: 50px;
  }
</style>
