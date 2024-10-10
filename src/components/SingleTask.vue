<template>
  <div class="singletask" >
    <div v-if="!editing">
      <div>{{ taskobject.person }}</div>
      <div>{{ taskobject.task }}</div>
      <button @click="edittoggle">Modifica task</button>
      <button @click="deletecallback(task)">Elimina task</button>
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
      archivedtoggle(){
        if (!this.archivedstate){
          this.deletecallback(this.task)
        }
        else{
          this.deletecallback(this.task)
        }  
      },
      edittoggle(){
        this.editing = !this.editing
      },
      editconfirm(){
        this.editcallback(this.$refs.editfield.value, this.task)
        this.edittoggle()
      }
    },

    props: {
      taskprop: Task,
      deletecallback: Function,
      editcallback: Function
    },

  }
  
  export {Task}
</script>