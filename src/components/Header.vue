<template>
  <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down"><h3 style="display: inline">Dogs Breeds</h3> 
          - Sistema de Listagem e Filtragem de Raça Canina
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    
</template>

<script>

export default {
  name: 'Header',
}
</script>