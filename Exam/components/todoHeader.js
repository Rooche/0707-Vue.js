let template = `
<div id="myDIV" class="header">
    <h2 style="margin:5px">My To Do List</h2>
    <input type="text" v-model="title" placeholder="Title...">
    <span v-on:click="addItem" class="addBtn">Add</span>
</div>
`

export default {
    template : template,
    data : function(){
        return {
            title : ''
        }
    },
    methods : {
        addItem : function(){
           let id = '21';
           let title = this.title;
           $.ajax({
                url : "http://192.168.0.29/myserver/todoInsert",
                data : {
                    id : id,
                    contents : title
                },
                success:function(){
                    history.go(0);
                },error:function(){

                }
           })
        }
    }

}