let template = `
  <div>
    <form id="info" onsubmit="return false">
      <template v-for="info in infos">
        <div>
          <label v-bind:for="info">{{ info }}</label>
          <input type="text" v-bind:id="info" v-bind:name="info" v-model="empInfo[info]">
        </div>
      </template>
    </form>
    <div>
      <button v-on:click="updateMode ? updateContent() : uploadContent()">저장</button>
      <router-link tag="button" v-bind:to="{ name : 'empSelect' }">취소</router-link>
    </div>
  </div>`

  export default {
    template : template,
    props : ['empId'],
    data : function(){
      return {
        infos : ['employee_id','first_name','last_name','email','job_id'],
        // 등록시 필요한 정보
        empInfo : {
          employee_id : '',
          first_name : '',
          last_name : '',
          email : '',
          job_id : ''
        },
        // 수정시 추가로 필요한 정보
        updateInfo : {},
        // 모든 전환용 정보
        updateMode : ''
      }
    },
    created : function(){
      if(this.empId > 0){
        this.empId = Number(this.empId);

        const component = this;
        $.ajax({
          url: 'http://192.168.0.29/myserver/empFind',
          type: 'get',
          data : {employee_id : component.empId},
          success: function (data) {
            console.log(data);
            if(data != null) {
              // updateInfo = 임시 보관용
              component.updateInfo = data;
              // empInfo = 뿌려주기용
              component.empInfo = component.updateInfo;
              component.updateMode = true;
            }
          },
          error: function (reject) {
            console.log(reject);
          }
        });
      }
    },
    methods : {
      uploadContent : function(){
        const component = this;
          $.ajax({
            url : 'http://192.168.0.29/myserver/empInsert',
            type : 'post',
            data : component.empInfo,
            success : function(data){
              if(data != null){
                component.$router.push({ name : 'empSelect'});
              }
            },
            error : function(reject){
              console.log(reject);
            }
          });
        },
        updateContent : function(){
          const component = this;
          $.ajax({
            url : 'http://192.168.0.29/myserver/empInsert',
            type : 'post',
            data : component.empInfo,
            success : function(data){
              if(data != null){
                component.$router.push({ name : 'empSelect'});
              }
            },
            error : function(reject){
              console.log(reject);
            }
          });
        }
    }
  }