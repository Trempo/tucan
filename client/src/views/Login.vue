<template>
  <!-- Default form login -->
  <div>
    <div v-if="error" class="alert alert-dismissible alert-danger container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{error + " Si necesitas un nuevo codigo de verificación da click "}}
        <a href="#/emailverificationresend">aquí</a>
    </div>
    <div v-if="message" class="alert alert-dismissible alert-success container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{message}}
    </div>
      <div class=" card container-sm">
          <div class="centrar">
            <h4>¡Hola!</h4>
          </div>
        <form @submit.prevent="loginUser">
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input type="email" class="form-control" id="email"
                aria-describedby="emailHelp"
                placeholder="Ingresa tu correo" name="email" required v-model="login.email">
                <small id="emailHelp" class="form-text text-muted">
                    No compartiremos tus datos con nadie</small>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control"
                id="password" placeholder="Contraseña"
                name="password" v-model="login.password" required>
            </div>
            <div class="form-group">
                <div class="centrar">
                    <button id="submit" type="submit"
                     class="btn btn-primary btn-lg">Iniciar sesión</button>
                </div>
            </div>
            <div class="links">
              <a href="#/register">Registrate aquí</a>
              <a href="#/recover">Restablece tu contraseña</a>
            </div>
        </form>
      </div>
  </div>
  <!-- Default form login -->
</template>
<script>
// import router from '../router'
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      error: '',
      message: '',
    };
  },
  mounted() {
    if (this.$route.params.verifytoken) {
      this.verifyUser();
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('/api/auth/login', this.login);
        const { token } = response.data;
        localStorage.setItem('jwt', token);
        axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem('jwt')}` };
        if (token) {
          this.$router.push('/');
        }
      } catch (err) {
        this.error = (err.response.data.error);
      }
    },
    async verifyUser() {
      try {
        const response = await axios.get(`api/auth/verify/${this.$route.params.verifytoken}`);

        if (response.data.error) {
          this.error = response.data.error;
        } else {
          this.message = response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
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
button#submit{
    margin-top: 0.5em;
}
.btn-primary{
    background-color: #619165;
    border-color: #2f6a50;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}
.alert-dismissible .close {
    padding: 0.5rem 1.25rem;
}
div.alert-success{
  margin-top: 1em;
}
div.alert-danger{
  margin-top: 5em;
}
div.links{
  display: flex;
  justify-content: space-between;
}
</style>
