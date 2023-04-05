<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <table class="table border">

            <tr v-for="alert in alerts">
              <td><button type="button" aria-hidden="true" class="close"@click="showdelegation(alert)">{{alert}}  </button>
              </td></tr>
          </table>
        </div>
        <div class="col-md-2">
          <table class="table border">

            <tr v-for="delegation in delegations">
         <td><div>
           <button type="button" aria-hidden="true" class="close" @click="showalerts(delegation)" >{{delegation}} </button>
         </div></td>


            </tr>
          </table>
        </div>
        <div class="col-md-4">
          <table class="table border">
            <tr v-if="alertsbydelegation.length > 0" class="table-success"> <td>{{alertsbydelegation.length}}</td>
           </tr>
            <tr v-for="alert in alertsbydelegation">
              <td>{{alert.Title}}  </td></tr>
          </table>

        </div>

        <div class="col-md-3" v-if="alertsbydelegation.length > 0">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">

            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> braquage<br/>
                <i class="fa fa-circle text-danger"></i> accident<br/>
                <i class="fa fa-circle text-warning"></i> crime
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Incidents depending delegation <br/>
                <router-link v-bind:to="{ name: 'statistics' }" class=""><button class="btn">show more statistics
                </button></router-link>
                <router-link v-bind:to="{ name: 'prediction' , params: { id: deg  } }" class="">  <button class="btn">show predictions
                </button></router-link>
              </div>
            </template>
          </chart-card>
        </div>

      </div>

    </div>
  </div>

</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'

  import IncidentsService from "../../../services/IncidentsService";

  export default {
    components: {
      LTable,
      Card,
      ChartCard
    },
    name: 'alerts',

    data () {
      return {
        deg : 'aa' ,
        alerts : [],
        delegations : [],
        alertsbydelegation : [],
        pieChart: {
          data: {
            labels: [50+ '%', 30 + '%', 50 + '%'],
            series: [20,30, 50]
          }
        }
      }
    },
    mounted () {
      this.getgovernerats()

    },
    methods: {
      async getgovernerats () {
        const response = await IncidentsService.getgouvernerat()
        this.alerts = response.data
        console.log(response.data[0] + 'data')
      },
      async showdelegation(alert){
        const response = await IncidentsService.getdelegation(alert)
        this.delegations = response.data
      },
      async showalerts(delegation){
     this.deg = delegation
        const response = await IncidentsService.getalertsbydelegation(delegation)
        this.alertsbydelegation = response.data
        var aa = (this.alertsbydelegation.filter((a)=>a.type == "braquage").length*100)/this.alertsbydelegation.length
        this.pieChart.data.labels=[aa.toFixed(2)+'%'
          ,((this.alertsbydelegation.filter((a)=>a.type == "accident").length*100)/this.alertsbydelegation.length).toFixed(2)+'%',
          ((this.alertsbydelegation.filter((a)=>a.type == "crime").length*100)/this.alertsbydelegation.length).toFixed(2)+'%']
        this.pieChart.data.series=[
          (this.alertsbydelegation.filter((a)=>a.type == "braquage").length*100)/this.alertsbydelegation.length,
          (this.alertsbydelegation.filter((a)=>a.type == "accident").length*100)/this.alertsbydelegation.length,
          (this.alertsbydelegation.filter((a)=>a.type == "crime").length*100)/this.alertsbydelegation.length]
      },
    }
  }
</script>
<style>
</style>
