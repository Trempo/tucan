<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="navbar">
      <a class="navbar-brand" href="/">
      <img class="logo" src="../assets/noun_Tucan_2826476.png" alt="">Tucan</a>
      <div class="mr-auto currentpage">{{currentpage}}</div>
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
            <a class="nav-link" href="#/search"><i class="fas fa-search"></i></a>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button"
              id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i class="far fa-newspaper"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#/tech">Tecnología</a>
                  <a class="dropdown-item" href="#/econ">Economía</a>
                  <a class="dropdown-item" href="#/sports">Deportes</a>
                  <a class="dropdown-item" href="#/entertainment">Entretenimiento</a>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/list">Mi lista</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/profile">{{firstName}}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="userLogOut">Salir</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  // data() {
  //   return {
  //     firstName: '',
  //   };
  // },
  props: {
    firstName: String,
    currentpage: String,
  },
  methods: {
    userLogOut() {
      localStorage.removeItem('jwt');
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
img.logo{
  height: 2em;
  width: 2em;
  margin-right: 5px
}
nav.navbar{
  background-color: #619165;
}
div.dropdown-menu{
  border-radius: 25px;
}
div.dropdown-menu a{
  border-radius: 25px;
}
.currentpage{
  color: white;
  border-left: 2px solid rgba(255,255,255,0.2);
  padding: 1em;
}
i{
  font-size: 20px;
}
</style>
