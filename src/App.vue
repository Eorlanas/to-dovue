<template>
  <v-app>
    <v-sheet v-if="$store.state.loggedperson!=''" color="orange" class="d-flex justify-space-around py-5 px-15">
      <v-list-item color="black" to="/" style="text-align: center; font-size: larger; font-weight: 600;">LISTA</v-list-item> 
      <v-list-item color="black" to="/archiviati" style="text-align: center; font-size: larger; font-weight: 600;">TASK ARCHIVIATE</v-list-item> 
      <v-list-item color="black" to="/albo" style="text-align: center; font-size: larger; font-weight: 600;" >ALBO</v-list-item>
    </v-sheet>
    <router-view/>
  </v-app>
</template>