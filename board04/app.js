import router from './router/router.js'
import empHeader from './components/empHeader.js'

let template = `
 <div>
  <emp-header></emp-header>
  <router-view></router-view>
 </div>
`

new Vue({
 el : '#app',
 router,
 template : template,
 components : {
  empHeader
 }
})