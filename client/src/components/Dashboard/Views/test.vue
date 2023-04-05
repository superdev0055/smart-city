<template>
  <div>
    <h1>Example component</h1>
    <button class="btn btn-default" @click="showAlert">Click to use vue-alert</button>
  </div>
</template>

<script>

  export default {
    methods: {
      showAlert () {
        this.$alert.show({
          message: 'Clicked the button!'
        })
      }
    }
  }
</script>
