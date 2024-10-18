<template>
  <div>
    <div class="d-flex flex-column align-center justify-space-between pa-10 no-gutters" style="height: auto" v-if="loginstate">
      <v-sheet style="border-color: black; border-radius: 1px ; border-style: outset;" class="pt-1">
        <v-text-field type="text" class="pt-0" persistent-hint hint="Inserire task qui" ref="taskinitializer" v-model="tasktext"></v-text-field>
        <v-btn :disabled="tasktext.length==0" color="green" @click="addtask()">Premi per aggiungere task!</v-btn >
        <v-btn color="red" @click="logout()">Logout</v-btn >
      </v-sheet>
      <v-container class="d-flex px-15">
        <v-row class="d-flex justify-center align-start" ref="taskcontainer">
            <SingleTask v-for="(task) in taskstorender" :key="task.id" :taskprop="task"/>
        </v-row>
      </v-container>
    </div>
    <div v-else class="d-flex flex-column align-center justify-center" style="margin-top:20%;" >
      <v-text-field class="pa-2" style="border-color: black; border-width: 10px; border-radius: 1px; border-style: outset; width: 300px;" type="text" persistent-hint hint="Chi deve inserire task?" v-model="logintext"></v-text-field>
      <v-btn :disabled="logintext.length == 0" class="mt-6 red" @click="login()">Login</v-btn>
    </div>
  </div>
</template>


<script>
  export default{
    data(){
      return{
        loginstate: store.state.loginstate,
        tasktext: "",
        logintext: ""
      }
    },
    computed: {
      taskstorender(){
        return this.$store.state.tasklist.filter(task => !task.completed)
      }
    },
    methods: { 
      login(){
        store.state.loggedperson = this.logintext
        store.state.loginstate = true
        this.loginstate = true
      },
      logout(){
        store.state.loggedperson = ""
        store.state.loginstate = false
        this.loginstate = false
      },
      addtask() {
        let tasktoinsert = this.tasktext
        let loggedperson = store.state.loggedperson
        let newtask = new Task(tasktoinsert, loggedperson)
        if (!store.state.personlist.includes(loggedperson)){
          store.commit("addperson")
        }
        let taskarr = store.state.tasklist
        taskarr.push(newtask)
        store.commit("addtasktomasterlist", taskarr)
        this.$refs.taskinitializer.value = ""
      },
    },
    components:{
      SingleTask
    }
  }
  import store from "@/store"
  import SingleTask, {Task} from "../components/SingleTask.vue"
</script>

