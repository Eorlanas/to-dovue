<template>
  <div>
    <div class="todolistadder" v-if="loginstate">
      <input type="text" placeholder="Inserisci task qui" ref="taskinitializer">
      <button @click="addtask()">Premi per aggiungere task!</button>
      <button @click="logout()">Logout</button>
      <div class="tasklist" ref="taskcontainer">
        <SingleTask v-for="(task, index) in taskstorender" :key="index" :taskprop="task"/>
      </div>
    </div>
    <div class="loginscreen" v-else>
      <input type="text" placeholder="Chi deve inserire task?" ref="logininput">
      <button @click="login()">Login</button>
    </div>
  </div>
</template>

//Duplicated tasks delete each other
//idk how but you gotta load the saved tasks on opening and preferably in app.vue

<script>
  export default{
    data(){
      return{
        loginstate: store.state.loginstate
      }
    },
    computed: {
      taskstorender(){
        return this.$store.state.tasklist.filter(task => !task.completed)
      }
    },
    methods: { 
      login(){
        store.state.loggedperson = this.$refs.logininput.value
        store.state.loginstate = true
        this.loginstate = true
      },
      logout(){
        store.state.loggedperson = ""
        store.state.loginstate = false
        this.loginstate = false
      },
      addtask() {
        let tasktoinsert = this.$refs.taskinitializer.value
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

