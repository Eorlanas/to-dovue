<template>
  <div class="tasklist" ref="taskcontainer">
    <label for="peoplelist">Persona:</label>
    <select v-model="selectedname" name="peoplelist">
      <option v-for="(person, index) in listofpeople" :key="index">{{ person }}</option>
    </select>
    <SingleTask v-for="(task, index) in taskstorender" :key="index" :task="task" :deletecallback="deletetask" :editcallback="edittask" :taskprop="task"/>
  </div>
</template>


<script>
  import SingleTask from '@/components/SingleTask.vue';
  export default{
    data(){
      return{
        selectedname: "",
        listofpeople: JSON.parse(localStorage.getItem("personlist")),
        taskstorender: this.gettaskstorender()
      }
    },
    methods:{
      gettaskstorender(){
        let taskarray = []
        this.listofpeople = JSON.parse(localStorage.getItem("personlist"))
        if(this.listofpeople == null){
          return
        }
        if (this.selectedname == undefined){
          this.listofpeople.forEach(person => {
            let persontasks = JSON.parse(localStorage.getItem(person))
            persontasks.forEach(task => {
              if(task.completed == true){
              taskarray.push(task)
              }
            })
          })
        }
        else {
          let persontasks = JSON.parse(localStorage.getItem(this.selectedname))
          persontasks.forEach(task => {
            if(task.completed == true){
              taskarray.push(task)
            }
          });
        }
        return taskarray
      },
      deletetask(task){
        this.taskstorender.splice(this.taskstorender.indexOf(task), this.taskstorender.indexOf(task)+1)
      },
      edittask(newtask, oldtask){
        this.taskstorender.splice(this.taskstorender.indexOf(oldtask), this.taskstorender.indexOf(oldtask)+1, newtask)
      }
    },
    components:{
      SingleTask
    }
  }
</script>