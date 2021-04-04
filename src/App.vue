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
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down"><h3 style="display: inline">Dogs Breeds</h3> 
          - Sistema de Listagem e Filtragem de Raça de Cães
        </span>
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
          
              <v-card-title class="justify-center"><h2>Listagem de Raça de Cães</h2></v-card-title>
          
               <v-data-table
                :headers="headers"
                :items="breeds"
                item-key="text"
                :loading="loading"
                loading-text="Carregando ..."
                class="elevation-1"
                :search="search"
                :custom-filter="filterBreeds"
              >
                <template v-slot:top>
                  <v-text-field
                    v-model="search"
                    label="Informe parte do nome da raça ou sub-raça para filtrar..."
                    class="mx-4"
                  ></v-text-field>
                </template>

                <template v-slot:item.photo="{ item }">
                  <a :key="item.text" class="fancybox" :data-fancybox="`gallery_${item.text}`" :href="item.photo">
                    <img :src="item.photo" :title="`Clique para ver a foto da raça ${item.text}`" 
                      v-if="item.photo" />
                  </a>
                </template>

                 <template v-slot:item.subBreeds="{ item }">
                    <span v-if="item.subBreeds">{{ subBreeds }}</span>
                    <v-icon v-else color="black" large>
                      mdi-null
                    </v-icon>
                </template>

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
    search: '',
    breeds: [],
    menuItems: [
      { icon: 'mdi-home', text: 'Home' },
    ],
    headers: [
      { text: "Foto", value: "photo", align: "center", sortable: false, width: "120px" },
      { text: "Raça", value: "value", align: "left" },
      { text: "Sub-raças", value: "subBreeds", align: "center" },
    ]
  }),
  mounted() {
    this.loadBreeds();
  },
  methods: {
    async loadBreeds() {
      this.loading = true;

      const { data: { message: items } } = await DogService.loadBreeds();
      for(let breed in items) {
        let subBreeds = items[breed];
        subBreeds = subBreeds.length > 0 ? subBreeds.map(subBreed => this.capitalizeFirstLetter(subBreed)).join(', ') 
            : null ;
        
        breed = this.capitalizeFirstLetter(breed);
        const photo = await this.loadBreedRandomImage(breed);
        this.breeds.push({ text: breed, value: breed, subBreeds: subBreeds, photo: photo});
      }

      this.loading = false;
    },
    async loadBreedRandomImage(breed) {
      const { data: { message: photoUrl } } = await DogService.loadBreedRandomImage(breed.toLowerCase());

      return photoUrl; 
    },
    filterBreeds(value, search) {
      return value != null 
        && search != null 
        && typeof value === 'string' 
        && value.toString().toLowerCase().indexOf(search) !== -1
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

  img {
    width: 120px; 
    height: 150px; 
    margin: 15px 0;
  }

  img:hover {
    border: 2px solid dodgerblue;
  }
</style>
