<template>
  <!-- Default form login -->
  <div class=" card container-sm bg-light">
      <div class="centrar">
        <h4>¡Hola!</h4>
      </div>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Correo electrónico</label>
            <input type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp" placeholder="Ingresa tu correo" name="email" required>
            <small id="emailHelp" class="form-text text-muted">
                No compartiremos tus datos con nadie</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password" class="form-control"
            id="exampleInputPassword1" placeholder="Contraseña" name="password" required>
        </div>
        <div class="form-group">
            <div class="centrar">
                <button type="submit" class="btn btn-primary btn-lg">Iniciar sesión</button>
            </div>
        </div>
    </form>
  </div>
  <!-- Default form login -->
</template>
<script>
// import router from '../router'

export default {
  name: 'Login',
  methods: {
  },
};
</script>
<style scoped>
.container-sm{
    margin: 5em auto;
    padding: 15px;
    max-width: 500px;
}
form{
    margin: 10px;
}
.centrar{
    text-align: center;
    align-content: center;
}
button{
    margin-top: 0.5em;
}
.btn-primary{
    background-color: #619165;
    border-color: #2f6a50;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}
.card{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}
</style>
