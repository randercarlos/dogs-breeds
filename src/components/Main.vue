<template>
   <v-main>
      <v-container
        fluid
      >
        <v-row
          align="start"
          justify="start"
        > 
          <v-col cols="12">
            <BreedsList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import BreedsList from '@/components/BreedsList'

export default {
  name: 'Main',
  components: {
    BreedsList
  }
}
</script>
