<template>
  <v-card class="cyan px-8 py-6 my-7 mx-8 rounded-lg d-flex justify-center" style="height: 230px; width: 330px;" >
    <v-sheet class="cyan d-flex flex-column justify-space-around flex-grow-1">
      <div class="d-flex align-center">
        <v-avatar color="#266C5C"><span>{{ taskobject.personinitials }}</span></v-avatar>
        <v-card-subtitle class="ml-0">{{ taskobject.person }}</v-card-subtitle>
      </div>
      <v-card-text v-if="!editing" class="pa-0 mt-2 mb-4 ml-2">{{ taskobject.task }}</v-card-text>
      <input v-else type="text" placeholder="New task" ref="editfield">
      <div v-if="!editing" class="d-flex justify-space-between align-content-stretch">
        <v-btn class="mx-2 yellow" icon @click="edittoggle"><v-icon>mdi-note-edit</v-icon></v-btn>
        <v-btn class="mx-2 green" icon @click="archivedtoggle"><v-icon>mdi-check-circle</v-icon></v-btn>
        <v-btn class="mx-2 red" icon @click="deletefunc"><v-icon>mdi-delete</v-icon></v-btn>
      </div>
      <div v-else class="d-flex justify-space-between align-self-center">
        <v-btn class="mx-2" icon @click="editconfirm"><v-icon>mdi-check-bold</v-icon></v-btn>
        <v-btn class="mx-2" icon @click="edittoggle"><v-icon>mdi-cancel</v-icon></v-btn>
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
      this.personinitials = person.slice(0, 3)
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