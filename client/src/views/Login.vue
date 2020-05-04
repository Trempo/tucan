<template>
  <!-- Default form login -->
  <div class=" card container-sm bg-light">
      <div class="centrar">
        <h4>Hola de nuevo</h4>
      </div>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp" placeholder="Ingresa tu correo" name="email">
            <small id="emailHelp" class="form-text text-muted">
                No compartiremos tus datos con nadie</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control"
            id="exampleInputPassword1" placeholder="Contraseña" name="password">
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
import axios from 'axios';

export default {
  name: 'Login',
  methods: {
    login: (e) => {
      e.preventDefault();
      const email = 'user@email.com';
      const password = 'password';
      const login = () => {
        const data = {
          email,
          password,
        };
        axios.post('/api/login', data)
          .then((response) => {
            console.log('Logged in');
            console.log(response);
            this.$router.push('/dashboard');
          })
          .catch((errors) => {
            console.log('Cannot log in');
            console.log(errors);
          });
      };
      login();
    },
  },
};
</script>
<style scoped>
.container-sm{
    margin: 8em auto;
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
</style>
