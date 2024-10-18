<template>
  <v-app>
    <v-sheet v-if="$store.state.loggedperson!=''" color="#40E0D0" class="d-flex justify-space-around py-7 px-15">
      <router-link to="/">Lista</router-link> 
      <router-link to="/archiviati">Task archiviate</router-link> 
      <router-link to="/albo">Albo</router-link>
    </v-sheet>
    <router-view/>
  </v-app>
</template>

<style>
</style>
