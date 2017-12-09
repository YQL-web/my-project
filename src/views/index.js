/**
 * Created by encore on 2017/3/11.
 */
import app from './index.vue'
import main from '../main.js'

import './../assets/styles/base.css'
import './../assets/styles/veinDevice.css'
import './../assets/styles/schoolData.css'

import veindevice from './pages/veinDevice.vue'
import schooldata from './pages/schoolData.vue'
const routes = [
  {
    path:'/',
    component:veindevice
  },
  {
    path:'/schooldata',
    component:schooldata
  }
]
main.init(app,routes);
