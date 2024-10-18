<template>
  <v-card class="grey px-8 py-3 my-7 mx-8 rounded-lg d-flex justify-center" style="height: 230px; width: 330px;" >
    <v-sheet class="grey d-flex flex-column justify-space-around flex-grow-1">
      <div class="d-flex align-center">
        <v-avatar color="#40E0D0"><v-icon>mdi-account</v-icon></v-avatar>
        <v-card-subtitle class="ml-0" style="font-size: large; font-weight: 600;">{{ taskobject.person }}</v-card-subtitle>
      </div>
      <v-card-text style="font-size: medium;" v-if="!editing" class="pa-0 mt-2 mb-4 ml-2">{{ taskobject.task }}</v-card-text>
      <input v-else type="text" placeholder="New task" ref="editfield">
      <div v-if="!editing" class="d-flex justify-space-between align-content-stretch">
        <v-btn class="mx-2 yellow" style="width: 50px; height: 50px;" icon @click="edittoggle"><v-icon>mdi-note-edit</v-icon></v-btn>
        <v-btn class="mx-2 green" style="width: 50px; height: 50px;" icon @click="archivedtoggle"><v-icon>mdi-check-circle</v-icon></v-btn>
        <v-btn class="mx-2 red" style="width: 50px; height: 50px;" icon @click="deletefunc"><v-icon>mdi-delete</v-icon></v-btn>
      </div>
      <div v-else class="d-flex justify-space-between align-self-center">
        <v-btn class="mx-2" style="width: 50px; height: 50px;" icon @click="editconfirm"><v-icon>mdi-check-bold</v-icon></v-btn>
        <v-btn class="mx-2" style="width: 50px; height: 50px;" icon @click="edittoggle"><v-icon>mdi-cancel</v-icon></v-btn>
      </div>
    </v-sheet>
  </v-card>
</template>


<script>
  import store from "@/store"
  class Task{
    constructor(task, person){
      this.task = task
      this.person = person
      this.completed = false
      this.id = Math.random()
    }
  }

  
  export default {
    name: 'SingleTask',
    data(){
      return{
        taskobject: this.taskprop,
        editing: false
      }
    },

    methods:{
      deletefunc(){
        store.commit("deletetask", this.taskobject)
      },
      archivedtoggle(){
        let oldtaskobject = this.taskobject
        this.taskobject.completed = !this.taskobject.completed
        store.commit("edittask", {newtask : this.taskobject, oldtask : oldtaskobject})
      },
      edittoggle(){
        this.editing = !this.editing
      },
      editconfirm(){
        let oldtaskobject = this.taskobject
        if(this.$refs.editfield.value == ""){
          this.edittoggle()
          return
        }
        this.taskobject.task = this.$refs.editfield.value
        store.commit("edittask", {newtask : this.taskobject, oldtask : oldtaskobject})
        this.edittoggle()
      }
    },

    props: {
      taskprop: Task
    },
    }

  export {Task}
</script>