import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const newstore = new Vuex.Store({
  state: {
    tasklist : [],
    personlist: [],
    loggedperson: "",
    loginstate: false
  },
  getters: {
  },
  mutations: { 
    loadpersonlist(){
      let personlist
      personlist = JSON.parse(localStorage.getItem("personlist"))
      if (!personlist){
        return
      }
      this.state.personlist = personlist
    },
    loadtasks(){
      let personlist = this.state.personlist
      if (personlist.length == 0){
        return
      }
      let arr = []
      personlist.forEach(person => {
        let persontasks = JSON.parse(localStorage.getItem(person))
        if (!persontasks){
          return
        }
        persontasks.forEach(task => {
          arr.push(task)
        });
      })
      this.state.tasklist = arr
    },
    addperson(state){
      state.personlist.push(this.state.loggedperson)
    },
    addtasktomasterlist(state, newarr){
      state.tasklist = newarr
    },
    deletetask(state, task){
      state.tasklist.splice(state.tasklist.indexOf(task), state.tasklist.indexOf(task)+1)
    },
    edittask(state, {newtask, oldtask}){
      state.tasklist.splice(state.tasklist.indexOf(oldtask), 1, newtask)
    }
  },
  actions: {
  },
  modules: {
  }
})

newstore.commit("loadpersonlist")
newstore.commit("loadtasks")


window.addEventListener("beforeunload", function(){
  localStorage.setItem("personlist", JSON.stringify(newstore.state.personlist))
  newstore.state.personlist.forEach((person)=>{
    let persontasks = []
    newstore.state.tasklist.forEach((task)=>{
      if (task.person == person){
        persontasks.push(task)
      }
    })
    localStorage.setItem(person, JSON.stringify(persontasks))
  })
})

export default newstore