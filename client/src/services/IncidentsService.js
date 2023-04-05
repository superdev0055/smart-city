import Api from '@/services/Api'

export default {
  fetchIncidents () {
    return Api().get('incidents/getAllIncidents')
  },
  getalerts () {
    return Api().get('alerts/')
  },
  getgouvernerat () {
    return Api().get('alerts/Gouvernerat')
  },
  getdelegation (params) {
    return Api().get('alerts/delegation/' + params)
  },
  getalertsbydelegation (params) {
    return Api().get('alerts/alerts/' + params)
  },
  fetchIncidentByTitle (title) {
    return Api().get('incidents/getIncidentByTitle/'+title)
  },
  getInidents () {
    return Api().get('incident')
  },
  getNearestInidents () {
    return Api().get('incident/nearest')
  },
  getIncidentById (params) {
    return Api().get('incident/current/' + params.id)
  },
  fetchByUser (params) {
    console.log("id for pass"+params.id)
    return Api().get('incident/own/'+params.id)
  },
  deleteAlertById (id) {
    return Api().delete('incident/delete/' + id)
  }


}
