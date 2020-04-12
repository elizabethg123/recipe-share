<template>
<div id="app">
  <div class="header">
    <div>
    <b-navbar type="dark" variant="info" >
      <b-navbar-nav>
        <b-navbar-brand href="/">Recipe Share</b-navbar-brand>
        <b-nav-item href="/">Recipes</b-nav-item>
        <b-nav-item href="/author">Contributors</b-nav-item>
        <b-nav-item href="/admin">Admin</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
</div>

  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="/">GitHub Repository</a>
  </div>
</div>
</template>


<style>

* {
  font-family: 'Rubik', sans-serif;
  color: black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar-dark .navbar-nav .nav-link{
   color:black!important;
}

.content {
  padding: 20px 20px;
  min-height: 500px;
}

/* Footer */
.footer {
  position: fixed;
  margin-bottom: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.a {
 color: black;
}


</style>
