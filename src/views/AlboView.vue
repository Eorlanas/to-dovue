<template>
  <div>
    <div class="d-flex justify-space-between align-center"  v-if="!loading">
      <v-btn class="mx-10" @click="goback"><v-icon> mdi-arrow-left </v-icon></v-btn>
      <div style="width: 80%;"  class="d-flex flex-column align-center">
        <div>Giorno: {{ day }}</div>
        <div>Mese: {{ month }}</div>
        <div>Anno: {{ year }}</div>
        <div>Titolo: {{ title }}</div>
        <div>Numero: {{ comicnumber }}</div>
        <div>Link: {{ imagelink }}</div>
        <v-img :src="imagelink" contain style="max-height: 600px; height: auto;"></v-img>
      </div>
      <v-btn class="mx-10" @click="goforward"><v-icon> mdi-arrow-right </v-icon></v-btn>
    </div>
    <div v-else>Caricamento in corso...</div>
  </div>
</template>


<script>
import axios from 'axios';

  export default{

    data(){
      return{
        askednumber: 100,
        comicnumber: null,
        day: null,
        month: null,
        year: null, 
        title: null,
        imagelink: null,
        loading: true
      }
    },

    created(){
      this.getdata()
    },

    methods:{
      getdata(){
        let json 
        let fullurl = "/api/" + this.askednumber + "/info.0.json"
        axios.get(fullurl)
          .then(response =>{
            json = response.data
            this.day = json.day
            this.month = json.month
            this.year = json.year
            this.title = json.title
            this.imagelink = json.img
            this.comicnumber = this.askednumber
            this.loading = false
          })
      },
      goback(){
        this.askednumber --
        if(this.askednumber <= 0){
          this.askednumber = 1
          return
        }
        this.getdata()
      },
      goforward(){
        this.askednumber++
        if(this.askednumber >= 2997){
          this.askednumber = 2997
          return
        }
        this.getdata()        
      }
    }

  }

</script>

