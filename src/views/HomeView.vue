<template>
  <div>
    <div class="todolistadder" v-if="loginstate">
      <input type="text" placeholder="Inserisci task qui" ref="taskinitializer">
      <button @click="addtask()">Premi per aggiungere task!</button>
      <button @click="logout()">Logout</button>
      <div class="tasklist" ref="taskcontainer">
        <SingleTask v-for="(task, index) in tasks" :key="index" :deletecallback="deletetask" :editcallback="edittask" :taskprop="task"/>
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
  localStorage.clear()
  export default{
    data(){
      return{
        tasks: this.gettasks(),
        loginstate: store.state.loginstate
      }
    },
    methods: { 
      gettasks(){
        let taskarray = []
        store.state.tasklist.forEach(task =>{
          if(!task.completed){
              taskarray.push(task)
            }
        return taskarray
        })
      },
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
        let persontasks = JSON.parse(localStorage.getItem(loggedperson))
        //this bit needs fixing
        if (!persontasks){
          persontasks = [newtask]
        }
        else{
          persontasks.push(newtask)
        }
        let personlist = JSON.parse(localStorage.getItem("personlist"))
        if (!personlist){
          let newliststart = [loggedperson]
          localStorage.setItem("personlist", JSON.stringify(newliststart))
        }
        else if(!personlist.includes(loggedperson)){
          personlist.push(loggedperson)
          localStorage.setItem("personlist", personlist)
        }
        localStorage.setItem(loggedperson, JSON.stringify(persontasks))
        this.tasks = this.getalltasks()
        this.$refs.taskinitializer.value = ""
      },
      deletetask(task){
        store.state.activetasks.splice(store.state.activetasks.indexOf(task), store.state.activetasks.indexOf(task)+1)
      },
      edittask(newtask, oldtask){
        store.state.activetasks.splice(store.state.activetasks.indexOf(oldtask), store.state.activetasks.indexOf(oldtask)+1, newtask)
      }
    },
    components:{
      SingleTask
    }
  }
  import store from "@/store"
  import SingleTask, {Task} from "../components/SingleTask.vue"
</script>

