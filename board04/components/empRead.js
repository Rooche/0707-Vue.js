let template = `
<div>
    <div>
    <template v-for="info in infos">
      <div>
        <span>
          {{ info }}
        </span>
        <span>
          {{ empInfo[info] }}
        </span>
      </div>
    </template>
  </div>
  <div>
    <router-link tag="button" v-bind:to="{name : 'empWrite', params : {empId : empInfo.employee_id }}">
      수정
    </router-link>
    <button @click="deleteData">삭제</button>
  </div>
</div>
`

export default{
  template : template,
  props : ['empId'],
  data : function(){
    return {
      infos : ['employee_id','first_name','last_name','email','job_id'],
      empInfo : {}
    }
  },
  // created  = 컴포넌트를 호출하면 무조건 실행이 되어야 하는 것들
  created : function(){
    const component = this;

    $.ajax({
      url: 'http://192.168.0.29/myserver/empFind',
      type: 'get',
      data : {employee_id : component.empId},
      success: function (data) {
        if(data != null) {
          component.empInfo = data;
        }
      },
      error: function (reject) {
        console.log(reject);
      }
    });
  },
  methods : {
    deleteData : function(){

      const component = this;

      $.ajax({
        url: 'http://192.168.0.29/myserver/empDelete',
        type: 'post',
        data : {employee_id : component.empInfo.employee_id},
        success: function (data) {
          if(data != null) {
            component.$router.push({name : 'empSelect'});
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      });

    }
  }
}