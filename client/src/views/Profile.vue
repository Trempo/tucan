
<template>
  <div id="feed">
    <Navbar :firstName="user.firstName"/>
    <div v-if="error" class="alert alert-dismissible alert-danger container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{error}}
    </div>
    <div v-if="message" class="alert alert-dismissible alert-success container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{message}}
    </div>
    <div class="container profile">
        <h1>Hola {{user.firstName}}, actualiza tu perfil</h1>
        <form @submit.prevent="updateUser">
            <div class="form-group">
                <label for="inputnombre">Nombre</label>
                <input type="text" class="form-control"
                id="inputnombre" placeholder="Nombre"
                 name="nombre" v-model="user.firstName" required>
            </div>
            <div class="form-group">
                <label for="inputapellido">Apellido</label>
                <input type="text" class="form-control"
                id="inputapellido" placeholder="Apellido"
                 name="apellido" v-model="user.lastName" required>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Correo electrónico</label>
                <input type="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Ingresa tu correo" name="email"
                v-model="user.email" required>
                <small id="emailHelp" class="form-text text-muted">
                    Asegurate de tener acceso al correo si vas a cambiarlo,
                     no podrás acceder a tu cuenta de lo contrario.</small>
            </div>
            <div class="form-group">
                <label for="dropdownpaises">País de preferencia</label>
                <select name="pais" id="dropdownpaises"
                 class="form-control" v-model="user.country" >
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
                <small id="countryHelp" class="form-text text-muted">
                    Esto definirá de donde provienen las noticias de tu bandeja principal.</small>
            </div>
            <div class="form-group">
              <label for="resetpasswordbutton">Restablecer contraseña</label>
              <div>
              <button name="resetpasswordbutton"
              id="resetpasswordbutton" class="btn btn-warning btn-md" type="button"
              @click="resetPassword">
                Restablece tu contraseña dando click aquí</button>
                <small id="countryHelp" class="form-text text-muted">
                    Se te enviará un correo con los siguientes pasos.</small>
              </div>
            </div>
            <div class="form-group">
                <div class="centrar">
                    <button id="submit" type="submit"
                     class="btn btn-primary btn-lg">Actualizar</button>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
// @ is an alias to /src
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';

export default {
  name: 'Profile',
  components: {
    Navbar,
  },
  data: () => ({
    error: '',
    message: '',
    user: {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      id: '',
    },
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const token = localStorage.getItem('jwt');
      const decoded = VueJwtDecode.decode(token);
      try {
        const response = await axios.get(`/api/user/${decoded.id}`);
        this.user.email = response.data.user.email;
        this.user.firstName = response.data.user.firstName;
        this.user.lastName = response.data.user.lastName;
        this.user.country = response.data.user.country;
        /* eslint no-underscore-dangle: 0 */
        this.user.id = response.data.user._id;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async updateUser() {
      try {
        const token = localStorage.getItem('jwt');
        const decoded = VueJwtDecode.decode(token);
        const response = await axios.put(`/api/user/${decoded.id}`, this.user);
        if (response.data.error) {
          this.error = response.data.error;
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        this.error = `Lo siento, algo ha salido mal. Vuelve a intentarlo. ${error.message}`;
      }
    },
    async resetPassword() {
      try {
        const response = await axios.post('/api/auth/recover', { email: this.user.email });
        this.message = response.data.message;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
<style scoped>
div.container.profile{
    border-radius: 25px;
    padding: 2.5em 4em 0 4em;
}
button#submit{
    margin: 0.5em 0 1em 0 ;
}
.btn-primary{
    background-color: #619165;
    border-color: #2f6a50;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}
.centrar{
    align-content: center;
}
.alert-dismissible .close {
    padding: 0.5rem 1.25rem;
}
div.alert-success{
  margin-top: 5em;
}
div.alert-danger{
  margin-top: 9em;
}
</style>
