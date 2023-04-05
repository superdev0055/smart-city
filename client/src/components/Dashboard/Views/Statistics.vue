<template>
  <div class="content" >

    <div class="container-fluid">
      <div class="" style="display: flex ; flex-direction: column ; align-items: flex-end">

        <div class="col-xl-3 col-md-6 ">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Number of all Incidents</p>
              <h4 class="card-title">{{alerts.length}}</h4>
            </div>

          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">number of braquages</p>
              <h4 class="card-title">{{alerts.filter((a)=>a.type==="braquage").length}}</h4>
            </div>

          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">nember of all accidents</p>
              <h4 class="card-title">{{alerts.filter((a)=>a.type==="accident").length}}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon  text-primary"></i>
              <img style="width: 50px; height: 60px"
                src="https://cdn3.iconfinder.com/data/icons/risk-insurance-thick-version/33/property_theft__vandalism_insurance-512.png"/>
            </div>
            <div slot="content">
              <p class="card-category">number of all crimes</p>
              <h4 class="card-title">{{alerts.filter((a)=>a.type==="crime").length}}</h4>
            </div>

          </stats-card>
        </div>

      </div>

     <div style="position:relative; margin-top: -500px">
      <button style="position: relative;left:335px; " type="button" aria-hidden="true" class="btn" @click="valid2=!valid2" >Change chart</button>

      <div class="row" style="display: block">
        <div class="col-md-8">
          <chart-card style="position: relative;left: 50px;margin-top: 30px" :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions" v-if="valid2">
            <template slot="header">
              <h4 class="card-title">Statistics for last 3 years</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> braquage
                <i class="fa fa-circle text-danger"></i> accident
                <i class="fa fa-circle text-warning"></i> Crime
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>


      </div>
      <div >
       <button type="button" aria-hidden="true" class="btn" @click="to2016" >statistics for 2016 </button>
      <button type="button" aria-hidden="true" class="btn" @click="to2017" >statistics for 2017 </button>
      <button type="button" aria-hidden="true" class="btn" @click="to2018" >statistics for 2018 </button>
      </div>
      <div class="row">

        <div class="col-md-6" >

          <chart-card style="position: relative;left: 150px" v-if="valid==true"
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">statistics for {{year}}</h4>
              <p class="card-category"></p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> braquage
                <i class="fa fa-circle text-danger"></i> accident
                <i class="fa fa-circle text-warning"></i> crimes

              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>


      </div>

     </div>

    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import IncidentsService from "../../../services/IncidentsService";

  export default {
    components: {
      Card,
      ChartCard,
      StatsCard
    },
    data(){
      return{
        year : 2016,
        alerts : [],
valid2 : false,
        valid: false,
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 200,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [15, 16, 45, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]

            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        }

      }
    },

    beforeMount(){this.loadchart()},
    mounted () {
      this.getalerts(),
        this.loadchart()
    },

    methods : {
      async getalerts () {

  const response = await IncidentsService.getalerts()
   this.alerts=response.data
        console.log(this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 &&
          a.type==="braquage" && new Date(a.Date).getFullYear()===this.year ).length + 'test')
        this.barChart.data.series=
          [
            [
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length
            ],
            [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length],
            [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length]
          ]

      this.loadchart()
      },


      async senddatatochart(){
        console.log(this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length+'mee')
        this.barChart.data.series=
          [
            [
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length
            ],
            [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length],
            [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
              this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length]
          ]
        console.log(this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage" && new Date(a.Date).getFullYear()===this.year).length + "  forchart")
console.log(this.barChart.data.series)
      },
      uptodate(){
        var nbparanne = 0






        this.barChart.data.series=
        [
          [
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="braquage"&& new Date(a.Date).getFullYear()===this.year).length
          ],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="accident"&& new Date(a.Date).getFullYear()===this.year).length],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="crime"&& new Date(a.Date).getFullYear()===this.year).length]
        ]},
     to2017(){
       this.valid=!this.valid
this.year=2017
        this.barChart.data.series=    [
          [
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2017).length
          ],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="accident"&& new Date(a.Date).getFullYear()===2017).length],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="crime"&& new Date(a.Date).getFullYear()===2017).length]
        ]

     },
      to2016(){
        this.valid=!this.valid
this.year=2016
        this.barChart.data.series=    [
          [
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2016).length
          ],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="accident"&& new Date(a.Date).getFullYear()===2016).length],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="crime"&& new Date(a.Date).getFullYear()===2016).length]
        ]

      },
      to2018(){
        this.valid=!this.valid

        this.year=2018
        this.barChart.data.series=    [
          [
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="braquage"&& new Date(a.Date).getFullYear()===2018).length
          ],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="accident"&& new Date(a.Date).getFullYear()===2018).length],
          [this.alerts.filter((a)=>new Date(a.Date).getMonth()===0 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===1 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===2 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===3 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===4 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===5 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===6 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===7 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===8 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===9 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===10 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length,
            this.alerts.filter((a)=>new Date(a.Date).getMonth()===11 && a.type==="crime"&& new Date(a.Date).getFullYear()===2018).length]
        ]

      },
      loadchart(){
        console.log(this.alerts.length)
        this.lineChart.data.series=[
          [
          this.alerts.filter((a)=>new Date(a.Date).getHours()>9 && a.type==="braquage"&& new Date(a.Date).getHours()<12).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>12 && a.type==="braquage"&& new Date(a.Date).getHours()<15).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>15 && a.type==="braquage"&& new Date(a.Date).getHours()<18).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>18 && a.type==="braquage"&& new Date(a.Date).getHours()<21).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>21 && a.type==="braquage"&& new Date(a.Date).getHours()<24).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>0 && a.type==="braquage"&& new Date(a.Date).getHours()<3).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>3 && a.type==="braquage"&& new Date(a.Date).getHours()<6).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>6 && a.type==="braquage"&& new Date(a.Date).getHours()<9).length

        ],[
          this.alerts.filter((a)=>new Date(a.Date).getHours()>9 && a.type==="accident"&& new Date(a.Date).getHours()<12).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>12 && a.type==="accident"&& new Date(a.Date).getHours()<15).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>15 && a.type==="accident"&& new Date(a.Date).getHours()<18).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>18 && a.type==="accident"&& new Date(a.Date).getHours()<21).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>21 && a.type==="accident"&& new Date(a.Date).getHours()<24).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>0 && a.type==="accident"&& new Date(a.Date).getHours()<3).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>3 && a.type==="accident"&& new Date(a.Date).getHours()<6).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>6 && a.type==="accident"&& new Date(a.Date).getHours()<9).length

        ],[
          this.alerts.filter((a)=>new Date(a.Date).getHours()>9 && a.type==="crime"&& new Date(a.Date).getHours()<12).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>12 && a.type==="crime"&& new Date(a.Date).getHours()<15).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>15 && a.type==="crime"&& new Date(a.Date).getHours()<18).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>18 && a.type==="crime"&& new Date(a.Date).getHours()<21).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>21 && a.type==="crime"&& new Date(a.Date).getHours()<24).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>0 && a.type==="crime"&& new Date(a.Date).getHours()<3).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>3 && a.type==="crime"&& new Date(a.Date).getHours()<6).length,
          this.alerts.filter((a)=>new Date(a.Date).getHours()>6 && a.type==="crime"&& new Date(a.Date).getHours()<9).length
        ]]
      }


    }
  }

</script>
<style>

</style>
