<template>
<div class="author">
  <h2>Contributors</h2><br/>
  <section class="image-gallery">
    <div class="image" v-for="contributor in contributors" :key="contributor.id">
      <h4>{{contributor.name}}</h4>
      <h8>From: {{contributor.location}}</h8><br/>
      <h8>Favorite Recipe: {{contributor.favoriteRecipe}}</h8><br/><br/>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Author',
  data() {
    return {
     contributors: [],
    }
  },
  created() {
    this.getContributors();
  },
  methods: {
    async getContributors() {
      try {
        let response = await axios.get("/api/contributors");
        this.contributors = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

</style>
