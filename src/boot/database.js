import Vue from 'vue'
import Localbase from 'localbase'
const db = new Localbase('whats-direct')

Vue.prototype.$db = db

export default {
    db
}
