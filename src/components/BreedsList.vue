<template>
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

    <v-card-title class="justify-center"><h2>Listagem de Raças Caninas</h2></v-card-title>

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

      <template v-slot:item.value="{ item }">
        <span v-html="highlight(item.value)">{{ item.value }}</span>
      </template>

      <template v-slot:item.subBreeds="{ item }">
        <span v-if="item.subBreeds" v-html="highlight(item.subBreeds)">{{ item.subBreeds }}</span>
        <span v-else>--------</span>
      </template>

      <template v-slot:item.favorite="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="toggleFavorite(item)" v-bind="attrs" v-on="on">
              <v-icon v-if="item.favorite" style="color: gold;" >mdi-star</v-icon>
              <v-icon v-else>mdi-star-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ item.favorite ? 'Clique para desfavoritar' : 'Clique para favoritar' }}</span>
        </v-tooltip>
      </template>

    </v-data-table>

  </v-card>
</template>

<script>
import helperMixin from '@/mixins/helperMixin';
import DogService from '@/services/DogService';

export default {
  name: 'BreedsList',
  mixins: [helperMixin],
  data: () => ({
    loading: false,
    search: '',
    breeds: [],
    headers: [
      { text: "Raça", value: "value", align: "left" },
      { text: "Sub-raças", value: "subBreeds", align: "center" },
      { text: "Favorito", value: "favorite", align: "center", width: "200px" },
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
        this.breeds.push({ text: breed, value: breed, subBreeds: subBreeds});
      }

      this.loadFavorites();
      this.loading = false;
    },
    loadFavorites() {
      if (localStorage.getItem('@DogsBreeds/favorites')) {
        
        const favoritesBreeds = JSON.parse(localStorage.getItem('@DogsBreeds/favorites'));

        this.breeds = this.breeds.map(item => {
          item.favorite = favoritesBreeds.includes(item.value);

          return item;
        });
      }
      
    },
    filterBreeds(value, search) {
      return value != null 
        && search != null 
        && typeof value === 'string' 
        && value.toString().toLowerCase().indexOf(search) !== -1
    },
    toggleFavorite(breed) {
      let favoritesBreeds = [];

      // se for a  primeira vez que os favoritos estão sendo armazenados, cria o localstorage.
      if (!localStorage.getItem('@DogsBreeds/favorites')) {
          localStorage.setItem('@DogsBreeds/favorites', JSON.stringify(favoritesBreeds));
      }

      favoritesBreeds = JSON.parse(localStorage.getItem('@DogsBreeds/favorites'));

      if (!breed.favorite) {
        favoritesBreeds.push(breed.value);
        this.breeds = this.breeds.map(item => {
          if (item.value === breed.value) {
            item.favorite = true; 
          }
          
          return item;
        });
      } else {
        favoritesBreeds = favoritesBreeds.filter( item => item !== breed.value);
        this.breeds = this.breeds.map(item => {
          if (item.value === breed.value) {
            item.favorite = false; 
          }
          
          return item;
        });
      }

      localStorage.setItem('@DogsBreeds/favorites', JSON.stringify(favoritesBreeds));
    }
  }
}
</script>

<style>
  img {
    width: 80px; 
    height: 80px; 
    margin: 15px 0;
  }

  .highlightText {
    background-color: yellow;
  }

  .color_yellow {
    color: gold;
  }
</style>