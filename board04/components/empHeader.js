let template =  `
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <router-link :to="{ name : 'empSelect' }" class="navbar-brand">사원정보목록</router-link>
  </div>
</nav>`

export default {
  template : template
}