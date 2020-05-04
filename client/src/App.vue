<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="navbar">
      <a class="navbar-brand" href="/">
      <img class="logo" src="../src/assets/noun_Tucan_2826476.png" alt="">Tucan</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#/list">Mi lista</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/login">Ingresar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/list">Registrarse</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<style scoped>
img.logo{
  height: 2em;
  width: 2em;
  margin-right: 5px
}
nav.navbar{
  background-color: red;
}

</style>
