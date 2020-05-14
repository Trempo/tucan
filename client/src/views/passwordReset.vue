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
            <h4>Restablece tu contraseña</h4>
          </div>
        <form @submit.prevent="passwordReset">
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password"
                aria-describedby="passwordHelp"
                placeholder="Ingresa tu nueva contraseña"
                name="password" required v-model="password">
            </div>
            <div class="form-group">
                <label for="passwordConfirm">Confirma tu contraseña</label>
                <input type="password" class="form-control"
                id="passwordConfirm" placeholder="Ingresa tu nueva contraseña"
                name="passwordConfirm" v-model="passwordConfirm" required>
            </div>
            <div class="form-group">
                <div class="centrar">
                    <button id="submit" type="submit"
                     class="btn btn-primary btn-lg">Restablecer</button>
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
  name: 'passwordReset',
  data() {
    return {
      password: '',
      passwordConfirm: '',
      error: '',
      message: '',
    };
  },
  mounted() {
    this.reset();
  },
  methods: {
    async reset() {
      try {
        const response = await axios.get(`/api/auth/reset/${this.$route.params.resettoken}`);
        if (response.data.error) {
          this.error = response.data.error;
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async passwordReset() {
      try {
        const response = await axios.post(`/api/auth/reset/${this.$route.params.resettoken}`, { password: this.password, confirmPassword: this.passwordConfirm });
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
</style>
