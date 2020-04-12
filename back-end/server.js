const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipeshare', {
  useNewUrlParser: true
});

  // Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for recipes and contributors
const recipeSchema = new mongoose.Schema({
  title: String,
  author: String,
  ingredients: String,
  steps: String,
  path: String,
});

const contributorSchema = new mongoose.Schema({
  name: String,
  location: String,
  favoriteRecipe: String,
});

// Create a model for recipes and contributors
const Recipe = mongoose.model('Recipe', recipeSchema);
const Contributor = mongoose.model('Contributor', contributorSchema);



// Upload a photo
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    author: req.body.author,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    path: req.body.path,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/contributors', async (req, res) => {
  const contributor = new Contributor({
    name: req.body.name,
    location: req.body.location,
    favoriteRecipe: req.body.favoriteRecipe,
  });
  try {
    await contributor.save();
    res.send(contributor);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the recipes
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/contributors', async (req, res) => {
  try {
    let contributors = await Contributor.find();
    res.send(contributors);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
    try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/contributors/:id', async (req, res) => {
    try {
    await Contributor.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/recipes/:id', async (req, res) => {
  try{
    const recipe = await Recipe.findOne({
      _id: req.params.id
    });
    recipe.title = req.body.title;
    recipe.author = req.body.author;
    recipe.ingredients = req.body.ingredients;
    recipe.steps = req.body.steps;
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/contributors/:id', async (req, res) => {
  try{
    const contributor = await Contributor.findOne({
      _id: req.params.id
    });
    contributor.name = req.body.name;
    contributor.location = req.body.location;
    contributor.favoriteRecipe = req.body.favoriteRecipe;
    await contributor.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3002, () => console.log('Server listening on port 3002!'));
