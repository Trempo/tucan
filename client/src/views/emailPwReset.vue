<template>
  <!-- Default form login -->
  <div>
    <div v-if="error" class="alert alert-dismissible alert-danger container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{error}}
    </div>
    <div v-if="message" class="alert alert-dismissible alert-success container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{message}}
    </div>
      <div class=" card container-sm">
          <div class="centrar">
            <h4>¿Olvidaste tu contraseña?</h4>
          </div>
        <form @submit.prevent="emailforpwreset">
            <div class="form-group">
                <label for="email">Correo</label>
                <input type="email" class="form-control" id="email"
                aria-describedby="emailHelp"
                placeholder="Ingresa tu correo"
                name="email" required v-model="email">
                <small id="emailHelp" class="form-text text-muted">
                    Te llegará un correo con las siguientes instrucciones</small>
            </div>
            <div class="form-group">
                <div class="centrar">
                    <button id="submit" type="submit"
                     class="btn btn-primary btn-lg">Enviar</button>
                </div>
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
  name: 'emailPwReset',
  data() {
    return {
      email: '',
      error: '',
      message: '',
    };
  },
  methods: {
    async emailforpwreset() {
      try {
        const response = await axios.post('/api/auth/recover', { email: this.email });
        this.message = response.data.message;
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
</style>
