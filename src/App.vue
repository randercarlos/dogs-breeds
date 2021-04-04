<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="showSidebar"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      width="250px"
    >
      <v-list dense>
        <template v-for="item in menuItems">
          <v-list-item
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="showSidebar = !showSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Raça de Cães</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    
    <v-main>
      <v-container
        fluid
      >
        <v-row
          align="start"
          justify="start"
        > 
          <v-col cols="12">
            <v-card
              :loading="loading"
              flat
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
          
              <v-card-title>Listagem de Raça de cães</v-card-title>
          
              <v-divider class="mx-4"></v-divider>


               <v-data-table
                :headers="headers"
                :items="breeds"
                :loading="loading"
                loading-text="Carregando ..."
                class="elevation-1"
                disable-sort
              >
                <!-- <template v-slot:item.contabil="{ item }">
                  <v-icon v-if="item.contabil">mdi-check</v-icon>
                  <span v-else>-</span>
                </template> -->

              </v-data-table>

          
              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                >
                  Reserve
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="footer">
      Desenvolvido por Rander Carlos - Todos os direitos reservados &copy; - 2021
    </v-footer>
  </v-app>
</template>

<script>
import helperMixin from '@/mixins/helperMixin';
import DogService from '@/services/DogService';

export default {
  name: 'App',
  mixins: [helperMixin],
  data: () => ({
    loading: false,
    showSidebar: null,
    breeds: [],
    menuItems: [
      { icon: 'mdi-home', text: 'Home' },
    ],
    headers: [
      { text: "Raça", value: "value", align: "left" },
      { text: "Sub-raças", value: "subBreeds", align: "left" },
    ]
  }),
  mounted() {
    this.loadBreeds();
    console.log('ENV:', process.env.VUE_APP_BACKEND_BASE_URL);
  },
  methods: {
    async loadBreeds() {
      const { data: { message: items } } = await DogService.loadBreeds();
      if (items) {
        for(let breed in items) {
          let subBreeds = items[breed];
          // console.log('RAÇA:', breed, 'SUB-RAÇA:', items[breed]);
          if (subBreeds.length > 0) {
            subBreeds = subBreeds.map(subBreed => this.capitalizeFirstLetter(subBreed)).join(', ');
          } else {
            subBreeds = '-';
          }
          
          breed = this.capitalizeFirstLetter(breed);
          this.breeds.push({ text: breed, value: breed, subBreeds: subBreeds});
        }
      }

      console.log('DATA:',  this.breeds);
      
    }
  }
};
</script>

<style scoped>
  .footer {
    height: 40px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
</style>
