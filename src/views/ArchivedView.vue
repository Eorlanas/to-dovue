<template>
  <div>
    <v-sheet class="d-flex py-3 justify-center align-center" style="background-color: #4DB6AC;">
      <label for="peoplelist">Persona:</label>
      <v-select style="max-width: 10%;" :items="listofpeople" v-model="selectedname"></v-select>
      <v-icon class="ml-5">mdi-magnify</v-icon>
      <input class="ml-2" style="border-radius: 1px; border-color: black; border-style: solid;" type="text" id="searchbox" v-model="searchtext">
    </v-sheet>
    <v-container class="d-flex px-15">
      <v-row class="d-flex justify-center align-start">
          <SingleTask v-for="(task) in taskstorender" :key="task.id" :taskprop="task"/>
      </v-row>
    </v-container>
  </div>
</template>


<script>
  import SingleTask from '@/components/SingleTask.vue';

  export default{
    data(){
      return{
        selectedname: "",
        listofpeople: this.getpeoplelist(),
        searchtext: ""
      }
    },
    computed:{
      taskstorender(){
        let completedtasks = this.$store.state.tasklist.filter(task => task.completed)
        if(this.selectedname != ""){
          completedtasks = completedtasks.filter(task => this.nameselect(task))
        }
        if(this.searchtext != ""){
          completedtasks = completedtasks.filter(task => this.searchselect(task))
        }
        return completedtasks
        }
      },
    methods:{
      getpeoplelist(){
        let startarray = this.$store.state.personlist
        if (startarray[0] != ""){
          startarray.splice(0, 0, "")
        }
        return startarray
      },
      searchselect(task){
        if(task.person.includes(this.searchtext) == true || task.task.includes(this.searchtext) == true){
          return true
        }
        else{
          return false
        }
      },
      nameselect(task){
        return this.selectedname == task.person
      }
    },
    components:{
      SingleTask
    }
  }

</script>