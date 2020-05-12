<template>
  <!-- Default form login -->
  <div>
    <div v-if="message" class="alert alert-dismissible alert-success container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{message}}
    </div>
    <div v-if="error" class="alert alert-dismissible alert-danger container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{error.substring(error.indexOf('":"')+3,error.indexOf('"}'))}}
    </div>
    <div class=" card container-sm">
        <div class="centrar">
            <h4>¡Bienvenido!</h4>
        </div>
        <form @submit.prevent="registerUser">
            <div class="form-group">
                <label for="inputnombre">Nombre</label>
                <input type="text" class="form-control"
                id="inputnombre" placeholder="Nombre"
                 name="nombre" v-model="register.firstName" required>
            </div>
            <div class="form-group">
                <label for="inputapellido">Apellido</label>
                <input type="text" class="form-control"
                id="inputapellido" placeholder="Apellido"
                 name="apellido" v-model="register.lastName" required>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Correo electrónico</label>
                <input type="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Ingresa tu correo" name="email"
                v-model="register.email" required>
                <small id="emailHelp" class="form-text text-muted">
                    No compartiremos tus datos con nadie</small>
            </div>
            <div class="form-group">
                <label for="inputcontraseña">Contraseña</label>
                <input type="password" class="form-control"
                id="inputcontraseña" placeholder="Contraseña"
                 name="password" v-model="register.password" required>
            </div>
            <div class="form-group">
                <label for="dropdownpaises">País de preferencia</label>
                <select name="pais" id="dropdownpaises"
                 class="form-control" v-model="register.country" >
                    <option value="de">Alemania</option>
                    <option value="sa">Arabia Saudita</option>
                    <option value="ar">Argentina</option>
                    <option value="au">Australia</option>
                    <option value="at">Austria</option>
                    <option value="be">Bélgica</option>
                    <option value="br">Brasil</option>
                    <option value="bg">Bulgaria</option>
                    <option value="ca">Canadá</option>
                    <option value="cn">China</option>
                    <option value="co">Colombia</option>
                    <option value="kr">Corea del Sur</option>
                    <option value="cu">Cuba</option>
                    <option value="eg">Egipto</option>
                    <option value="ae">Emiratos Árabes</option>
                    <option value="sk">Eslovaquia</option>
                    <option value="si">Eslovenia</option>
                    <option value="us">Estados Unidos</option>
                    <option value="ph">Filipinas</option>
                    <option value="fr">Francia</option>
                    <option value="gr">Grecia</option>
                    <option value="gr">Grecia</option>
                    <option value="gb">Hong Kong</option>
                    <option value="hu">Hungría</option>
                    <option value="id">Indonesia</option>
                    <option value="ie">Irlanda</option>
                    <option value="il">Israel</option>
                    <option value="in">India</option>
                    <option value="it">Italia</option>
                    <option value="jp">Japón</option>
                    <option value="lv">Letonia</option>
                    <option value="lt">Lituania</option>
                    <option value="my">Malasia</option>
                    <option value="ma">Marruecos</option>
                    <option value="mx">México</option>
                    <option value="ng">Nigeria</option>
                    <option value="no">Noruega</option>
                    <option value="nz">Nueva Zelanda</option>
                    <option value="nl">Paises Bajos</option>
                    <option value="pl">Polonia</option>
                    <option value="pt">Portugal</option>
                    <option value="cz">República Checa</option>
                    <option value="ro">Rumania</option>
                    <option value="ru">Rusia</option>
                    <option value="rs">Serbia</option>
                    <option value="sg">Singapur</option>
                    <option value="se">Suecia</option>
                    <option value="ch">Suiza</option>
                    <option value="za">Suráfrica</option>
                    <option value="th">Tailandia</option>
                    <option value="tw">Taiwán</option>
                    <option value="tr">Turquía</option>
                    <option value="ua">Ucrania</option>
                    <option value="ve">Venezuela</option>
                </select>
            </div>
            <div class="form-group">
                <div class="centrar">
                    <button id="submit" type="submit"
                     class="btn btn-primary btn-lg">Registrarse</button>
                </div>
            </div>
            <a href="#/login">Inicia sesión aquí</a>
        </form>
    </div>
  </div>

  <!-- Default form login -->
</template>
<script>
// import router from '../router'
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      register: {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        country: '',
      },
      message: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('/api/auth/register', this.register);
        this.message = response.data.message;
      } catch (error) {
        this.error = JSON.stringify(error.response.data.error);
      }
    },
  },
};
</script>
<style scoped>
.container-sm{
    margin: 0 auto;
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
