
<template>
  <div>
      <div class="jumbotron">
        <p class="lead">Todas tus noticias en un solo lugar.</p>
        <h1 class="display-3">Tucan</h1>
        <p class="lead">Así de simple.</p>
        <div class="container buttons">
            <a class="btn btn-primary btn-lg" href="#/login" role="button">Inicia sesión</a>
            <a class="btn btn-primary btn-lg" href="#/register" role="button">Regístrate</a>
        </div>
    </div>
    <div class="container-sm">
        <div class="card">
            <div class="row">
                <div class="col-md-6 imagefade">
                    <img class="card-img" src="../assets/capture.png" alt />
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h4 class="card-title">No des vueltas. Encuentralo todo aquí.</h4>
                        <!-- <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6> -->
                        <p class="card-text">Busca las principales noticias en más de
                             50 países y cientos de fuentes. Una forma de informarte unificada,
                              con bandejas de entrada especializadas para tecnología,
                               entretenimiento, economía y deportes. <br><br>Así de simple.</p>
                        <a class="btn btn-primary btn-lg" href="#/register"
                         role="button">Empieza gratis ahora.</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Landing',
  components: {
  },
  created() {
    if (localStorage.getItem('jwt')) {
      this.$router.push('/super');
    }
  },
};
</script>
<style scoped>
.jumbotron{
    border-radius: 0;
    text-align: center;
    background: url("../assets/landingphoto.jpg");
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    padding-top: 10vh;
}
h1{
    color: white;
    font-size: 300px;
    line-height: 300px;
}
p.lead{
    color: white;
    font-size: 50px;
}
@media (max-width: 768px) {
    h1{
        font-size: 150px;
    }
    p.lead{
        font-size: 30px;
    }
    .jumbotron{
        padding-top: 20vh;
    }
}
.btn-primary{
    background-color: #619165;
    border-color: #2f6a50;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}
.container.buttons{
    display: flex;
    max-width: 500px;
    justify-content: space-evenly;
}

p:nth-child(1){
    margin-bottom: 0;
}
.container-sm{
    padding-top: 5em;
    padding-bottom: 5em;
}
</style>
