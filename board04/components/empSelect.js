let template = `
<div>
  <table id="list">
    <tr>
      <td v-for="info in headerInfo">{{ info }}</td>
    </tr>
    <template v-for="empInfo in currentData">
      <router-link tag="tr" v-bind:to="{ name : 'empRead', params : { empId : empInfo.employee_id } }">
        <td v-for="info in headerInfo">{{ empInfo[info] }}</td>
      </router-link>
    </template>
  </table>
  <!-- 페이지네이션 -->
  <nav aria-label="Page navigation example">
  <ul class="pagination" style="place-content: center;">
  <li v-for="page in PagingInfo.totalPage" v-on:click="currentPage = page" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
  </ul>
  </nav>
  
  <router-link class="btn btn-primary" tag="button" v-bind:to="{name:'empCreate', params:{emp : emp}}" style="float:right;">직원등록</router-link>
  </div>
</div>
`

const empSelect = {
  template : template,
  data : function(){
    return {
      headerInfo : ['employee_id','first_name','last_name','email','job_id'],
      empList : [],
      currentPage : 1,
    }
  },

  
  created : function(){
    const component = this;
    $.ajax({
      url: 'http://192.168.0.29/myserver/empSelect',
      dataType: 'json',
      success: function (data) {
        if(data != null){
          console.log(this);
          component.empList = data;
        }
      },error: function (reject) {
        console.log(reject);
      }
    });
  },

  computed: {
    //data 속성을 필요에 따라서 산출해서 또 다른 프로퍼티가 되도록하는 거 -> 읽기 전용
    //연동된 data속성에 값이 변경될 때만 실행된다.

    // 페이징 관련 totalPage
    PagingInfo: function () {
      let perData = 10; //한 페이지에 보여줄 데이터 수
      let totalPage = Math.ceil(this.empList.length / perData); //totalPage는 오림으로 정의

      let totalPageArray = []; //for돌리기 때문에 배열로 만들어 준다
      for (let i = 1; i <= totalPage; i++) {
        totalPageArray.push(i);
      }

      return {
        perData: perData,
        totalPage: totalPageArray,
      };
    },

    //현재 페이지에 따라 출력될 데이터를 갖고 와야한다.
    currentData: function () {
      let firstIndex = (this.currentPage - 1) * this.PagingInfo.perData;
      let lastIndex = firstIndex + this.PagingInfo.perData - 1;

      return this.empList.filter((empList, index) => {
        return index >= firstIndex ? (index <= lastIndex ? true : false) : false;
      });
    },
  },

}

export { empSelect}