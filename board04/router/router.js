import empRead from '../components/empRead.js'
import {empSelect} from '../components/empSelect.js'
import empWrite from '../components/empWrite.js'


export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'empSelect',
      component: empSelect
    },
    {
      path : '/empRead/:empId',
      name : 'empRead',
      component : empRead,
      props : true
    },
    {
      path : '/empWrite/:empId',
      name : 'empWrite',
      component : empWrite,
      props : true
    },
    { // 지정한 경로가 아닌것이 들어오면 루트로 보냄.
      path : '*',
      redirect : '/'
    }
  ]
})