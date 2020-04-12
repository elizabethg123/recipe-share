<template>
<div class="home">
  <h2>Recipes</h2><br/>
  <section class="image-gallery">
    <div class="image" v-for="recipe in recipes" :key="recipe.id">
      <h4>{{recipe.title}}</h4>
      <h7>By: {{recipe.author}}</h7><br/><br/>
      <h5>Ingredients</h5>
      <h8>{{recipe.ingredients}}</h8><br/><br/>
      <h5>Directions</h5>
      <h8>{{recipe.steps}}</h8><br/><br/>
      <img :src="recipe.path" /><br/>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     recipes: [],
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}


</style>
