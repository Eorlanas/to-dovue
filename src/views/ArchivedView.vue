<template>
  <div class="tasklist" ref="taskcontainer">
    <label for="peoplelist">Persona:</label>
    <select v-model="selectedname" name="peoplelist">
      <option v-for="(person, index) in listofpeople" :key="index">{{ person }}</option>
    </select>
    <SingleTask v-for="(task, index) in taskstorender" :key="index" :task="task" :taskprop="task"/>
  </div>
</template>


<script>
  import SingleTask from '@/components/SingleTask.vue';
  export default{
    data(){
      return{
        selectedname: "",
        listofpeople: JSON.parse(localStorage.getItem("personlist")),
      }
    },
    computed:{
      taskstorender(){
        return this.$store.state.tasklist.filter(task => task.completed)
      }
    },
    methods:{
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