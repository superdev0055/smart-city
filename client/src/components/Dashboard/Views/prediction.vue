<template>
  <div class="content">



    <div class='chart'>
      <table align="right" style="z-index: 100;position: relative" >
        <tr v-if="verifnote"><div class="alert alert-info"><span>Do you agree with this predictions :</span></div>
        </tr>
        <tr align="left" v-if="verifnote">
          <td class="btn-round">yes : <input type="radio" name="note" value="1" v-model="note" class="btn-round">
          </td>
        </tr>
        <tr align="left" v-if="verifnote">
          <td class="btn-round">NO : <input type="radio" name="note" value="0" v-model="note">
          </td>
        </tr>
        <tr align="center" v-if="verifnote">
          <button @click="addnote" class="btn">save</button>
        </tr>
<tr>
  <br>
  <div class="alert alert-success"><span>number of positive votes : {{   nbrnotes}}
</span></div>
</tr>

        <tr>
          <br>
          <div class="alert alert-danger"><span>number of negative   votes : {{   nbrnotesf}}
</span></div>
        </tr>
      </table>

      <!-- import font awesome for legend icons -->
      <div class="alert alert-info col-md-6"><span>prediction depending feedbacks in {{$route.params.id}}</span></div>


      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

      <!--
        Both the :data and :config properties are deeply reactive so any changes
        to these will cause the chart to update.
      -->
      <chart-pie :data='chartData' :config='chartConfig'></chart-pie>
    </div>
    <div class="row" style="display: block ; margin-top: 55px" >
      <div>
        <div class="alert alert-info col-md-7" ><span>choose month to see predictions for today in {{$route.params.id}}
        </span><select name="mounth" id="mounth" v-model="mounth" @click="onloade" class="custom-select-sm btn">
          <option value="0" class="btn">JAN</option>
          <option value="1" class="btn">FEV</option>
          <option value="2" class="btn">MAR</option>
          <option value="3" class="btn">AVR</option>
          <option value="4" class="btn">MAY</option>
          <option value="5" class="btn">JUI</option>
          <option value="6" class="btn">JUILLY</option>
          <option value="7" class="btn">AUGUST</option>
          <option value="8" class="btn"> SEP</option>
          <option value="9" class="btn">OCT</option>
          <option value="10" class="btn">NOV</option>
          <option value="11" class="btn">DEC</option>

        </select>
        </div>
      </div>


      <div class="col-md-8">
        <chart-card :chart-data="lineChart.data"
                    :chart-options="lineChart.options"
                    :responsive-options="lineChart.responsiveOptions" v-if="valid===true">
          <template slot="header">
            <div class="alert alert-info"><span>prediction for {{$route.params.id}} for {{new Date(2007,mounth,4).get}} </span></div>
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
    <br><br><br><br>
    <VueGoodshare></VueGoodshare>

  </div>

</template>
<script>
  import VueGoodshare from 'vue-goodshare'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import IncidentsService from "../../../services/IncidentsService"
  import note from "../../../services/note"
  import FeedbacksService from "../../../services/FeedbacksService"
  import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import {ChartPie} from 'vue-d2b'

  export default {
    components: {
      Card,
      ChartCard,
      StatsCard,
      ChartPie,
      VueGoodshareFacebook,
      VueGoodshare
    },
    data() {
      return {
        alerts: [],
        note: 1,
        nbrnotes : 0 ,
        nbrnotesf : 0,
        valid: false,
        mounth: 3,
        verifnote : true ,
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
            high: 20,
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
                labelInterpolationFnc(value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        braquage: 'azer',
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        },
        chartData: [
          {label: 'braquage', value: 23},
          {label: 'accedints', value: 31},
          {label: 'crime', value: 80}
        ],

        // The chart config property is a callback function that is executed
        // any time the chart undergoes an update. The function receives the
        // d2b chart generator as an argument and can be configured as described
        // as described by the d2bjs.org docs.
        chartConfig(chart) {
          chart.donutRatio(0.5)
        },
        user: JSON.parse(localStorage.getItem('user'))

      }
    },
    beforeUpdate(){
this.getnotes()
    }
    ,
    mounted() {
      this.loadcharpie(),
        this.getnotes(),
        this.onloade()
    },
    methods: {
      notifyVue(verticalAlign, horizontalAlign) {
        const notification = {
          template: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`
        }

        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            component: notification,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      },

      async onloade() {
        this.valid = !this.valid
        const response = await IncidentsService.getalertsbydelegation(this.$route.params.id)
        this.alerts = response.data
        this.lineChart.data.series = [
          [
            this.alerts.filter((a) => new Date(a.Date).getHours() > 9 && a.type === "braquage" && new Date(a.Date).getHours() < 12 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 12 && a.type === "braquage" && new Date(a.Date).getHours() < 15 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 15 && a.type === "braquage" && new Date(a.Date).getHours() < 18 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 18 && a.type === "braquage" && new Date(a.Date).getHours() < 21 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 21 && a.type === "braquage" && new Date(a.Date).getHours() < 24 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 0 && a.type === "braquage" && new Date(a.Date).getHours() < 3 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 3 && a.type === "braquage" && new Date(a.Date).getHours() < 6 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 6 && a.type === "braquage" && new Date(a.Date).getHours() < 9 && new Date(a.Date).getMonth() === this.mounth).length

          ], [
            this.alerts.filter((a) => new Date(a.Date).getHours() > 9 && a.type === "accident" && new Date(a.Date).getHours() < 12 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 12 && a.type === "accident" && new Date(a.Date).getHours() < 15 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 15 && a.type === "accident" && new Date(a.Date).getHours() < 18 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 18 && a.type === "accident" && new Date(a.Date).getHours() < 21 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 21 && a.type === "accident" && new Date(a.Date).getHours() < 24 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 0 && a.type === "accident" && new Date(a.Date).getHours() < 3 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 3 && a.type === "accident" && new Date(a.Date).getHours() < 6 && new Date(a.Date).getMonth() === this.mounth).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 6 && a.type === "accident" && new Date(a.Date).getHours() < 9 && new Date(a.Date).getMonth() === this.mounth).length

          ], [
            this.alerts.filter((a) => new Date(a.Date).getHours() > 9 && a.type === "crime" && new Date(a.Date).getHours() < 12).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 12 && a.type === "crime" && new Date(a.Date).getHours() < 15).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 15 && a.type === "crime" && new Date(a.Date).getHours() < 18).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 18 && a.type === "crime" && new Date(a.Date).getHours() < 21).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 21 && a.type === "crime" && new Date(a.Date).getHours() < 24).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 0 && a.type === "crime" && new Date(a.Date).getHours() < 3).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 3 && a.type === "crime" && new Date(a.Date).getHours() < 6).length,
            this.alerts.filter((a) => new Date(a.Date).getHours() > 6 && a.type === "crime" && new Date(a.Date).getHours() < 9).length
          ]]
          console.log(this.lineChart.data.series)
      },

      async loadcharpie() {
        console.log('ddddd')
        const response = await FeedbacksService.fetchFeedbacks()
        this.chartData = [
          {
            label: 'braquage',
            value: response.data.feedbacks.filter((a) => a.degree > 0 && a.incident.type === "braquage" && a.incident.address.place===this.$route.params.id ).length
          },
          {
            label: 'accedints',
            value: response.data.feedbacks.filter((a) => a.degree > 0 && a.incident.type === "accident" && a.incident.address.place===this.$route.params.id).length
          },
          {
            label: 'crime',
            value: response.data.feedbacks.filter((a) => a.degree > 0 && a.incident.type === "crime" && a.incident.address.place===this.$route.params.id).length
          }

        ]
      },
      async addnote() {
        await
          note.addnote({
            delegation : this.$route.params.id,
            user: this.user._id,
            status : this.note
          })
        this.$swal(
          'Great!',
          `Your Note has been added!`,
          'success'
        )
      },
      async getnotes(){
        const responce = await note.fetchNotess()
        this.nbrnotes= responce.data.Notes.filter((a)=>a.status===1 && a.delegation=== this.$route.params.id).length
        this.nbrnotesf= responce.data.Notes.filter((a)=>a.status===0 && a.delegation=== this.$route.params.id).length

if (responce.data.Notes.filter((a)=>a.delegation=== this.$route.params.id).length >0)
{this.verifnote= false}
        console.log(responce.data.Notes.filter((a)=>a.delegation=== this.$route.params.id).length + 'testici')

      }

    }
  }

</script>
<style lang="scss">
  .chart {
    height: 500px;
  }
</style>
