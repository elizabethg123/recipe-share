
<template>
<div class="admin">
<h2>Admin Page</h2>
  <div class="heading">
    <h4>Add an Recipe</h4>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <input v-model="author" placeholder="Author">
      <input v-model="ingredients" placeholder="Ingredients">
      <input v-model="steps" placeholder="Steps">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addRecipe">
      <h2>{{addRecipe.title}}</h2>
      <p>{{addRecipe.author}}</p>
      <p>{{addRecipe.ingredients}}</p>
      <p>{{addRecipe.steps}}</p>
      <img :src="addRecipe.path" />
    </div>
  </div>
  <div class="heading">
    <h4>Edit/Delete an Recipe</h4>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findRecipe">
      <input v-model="findRecipe.title">
      <input v-model="findRecipe.author">
      <input v-model="findRecipe.ingredients">
      <input v-model="findRecipe.steps">
      <p></p>
      <img :src="findRecipe.path" />
    </div>
    <div class="actions" v-if="findRecipe">
      <button @click="editRecipe(findRecipe)">Edit</button>
      <button @click="deleteRecipe(findRecipe)">Delete</button>
    </div>
  </div>
  <div class="heading">
      <h4>Add a Contributor</h4>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <input v-model="location" placeholder="Location">
        <input v-model="favoriteRecipe" placeholder="Favorite Recipe">
        <p></p>
        <button @click="uploadC">Upload</button>
      </div>
      <div class="upload" v-if="addContributor">
        <h2>{{addContributor.title}}</h2>
        <img :src="addContributor.path" />
      </div>
    </div>
    <div class="heading">
      <h4>Edit/Delete a Contributor</h4>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestionsC.length > 0">
          <div class="suggestion" v-for="s in suggestionsC" :key="s.id" @click="selectContributor(s)">{{s.name}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findContributor">
        <input v-model="findContributor.name">
        <input v-model="findContributor.location">
        <input v-model="findContributor.favoriteRecipe">
        <p></p>
      </div>
      <div class="actions" v-if="findContributor">
        <button @click="deleteContributor(findContributor)">Delete</button>
        <button @click="editContributor(findContributor)">Edit</button>
      </div>
    </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      author: "",
      ingredients: "",
      steps: "",
      file: null,
      addRecipe: null,
      recipes: [],
      findTitle: "",
      findRecipe: null,

      name: "",
      location: "",
      favoriteRecipe: "",
      addContributor: null,
      contributors: [],
      findName: "",
      findContributor: null,
    }
  },
  computed: {
    suggestions() {
      console.log(this.recipes);
      let recipes = this.recipes.filter(recipe => recipe.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return recipes.sort((a, b) => a.title > b.title);
    },
    suggestionsC() {
      let contributors = this.contributors.filter(contributor => contributor.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return contributors.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getRecipes();
    this.getContributors();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          title: this.title,
          author: this.author,
          ingredients: this.ingredients,
          steps: this.steps,
          path: r1.data.path
        });
        this.addRecipe = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadC() {
      try {
        let r2 = await axios.post('/api/contributors', {
          name: this.name,
          location: this.location,
          favoriteRecipe: this.favoriteRecipe,
        });
        this.addContributor = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        console.log("response data: ");
        console.log(response.data);
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getContributors() {
      try {
        let response = await axios.get("/api/contributors");
        this.contributors = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRecipe(recipe) {
      this.findTitle = "";
      this.findRecipe = recipe;
    },
    selectContributor(contributor) {
      this.findName = "";
      this.findContributor = contributor;
    },
    async deleteRecipe(recipe) {
      try {
        await axios.delete("/api/recipes/" + recipe._id);
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteContributor(contributor) {
      try {
        await axios.delete("/api/contributors/" + contributor._id);
        this.findContributor = null;
        this.getContributors();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRecipe(recipe) {
      try {
        await axios.put("/api/recipes/" + recipe._id, {
          title: this.findRecipe.title,
          author: this.findRecipe.author,
          ingredients: this.findRecipe.ingredients,
          steps: this.findRecipe.steps,
        });
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editContributor(contributor) {
      try {
        await axios.put("/api/contributors/" + contributor._id, {
          name: this.findContributor.name,
          location: this.findContributor.location,
          favoriteRecipe: this.findContributor.favoriteRecipe,
        });
        this.findContributor = null;
        this.getContributors();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
