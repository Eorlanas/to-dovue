<template>
  <div class="singletask" >
    <div v-if="!editing">
      <div>{{ taskobject.person }}</div>
      <div>{{ taskobject.task }}</div>
      <button @click="edittoggle">Modifica task</button>
      <button @click="deletefunc">Elimina task</button>
      <input @input="archivedtoggle" type="checkbox" value="completed" v-model="taskobject.completed">
      <label for="finished">Completata?</label>
    </div>
    <div v-else>
      <input type="text" placeholder="New task" ref="editfield">
      <button @click="edittoggle">Cancella</button>
      <button @click="editconfirm">Conferma modifica?</button>
    </div>
  </div>
</template>


<script>

  import store from "@/store"
  class Task{
    constructor(task, person){
      this.task = task
      this.person = person
      this.completed = false
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
        this.completed = false
      },
      edittoggle(){
        this.editing = !this.editing
      },
      editconfirm(){
        let oldtaskobject = this.taskobject
        this.taskobject.task = this.$refs.editfield.value
        store.commit("edittask", this.taskobject, oldtaskobject)
        this.edittoggle()
      }
    },

    props: {
      taskprop: Task
    },
    }

  export {Task}
</script>