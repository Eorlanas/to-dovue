<template>
  <v-app>
    <v-sheet v-if="$store.state.loggedperson!=''" color="#40E0D0" class="d-flex justify-space-around py-5 px-15">
      <v-list-item color="black" to="/" style="text-align: center;">Lista</v-list-item> 
      <v-list-item color="black" to="/archiviati">Task archiviate</v-list-item> 
      <v-list-item color="black" to="/albo">Albo</v-list-item>
    </v-sheet>
    <router-view/>
  </v-app>
</template>