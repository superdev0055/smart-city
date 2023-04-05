import Api from '@/services/Api'

export default {
  fetchNotess () {
    return Api().get('note')
  },

  addnote (params) {
    return Api().post('note', params)
  }
}
