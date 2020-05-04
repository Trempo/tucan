<template>
  <!-- Default form login -->
  <div class=" card container-sm bg-light">
      <div class="centrar">
        <h4>Bienvenido!</h4>
      </div>
    <form>
        <div class="form-group">
            <label for="inputnombre">Nombre</label>
            <input type="text" class="form-control"
            id="inputnombre" placeholder="Nombre" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="inputapellido">Contraseña</label>
            <input type="text" class="form-control"
            id="inputapellido" placeholder="Apellido" name="apellido" required>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Correo electrónico</label>
            <input type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp" placeholder="Ingresa tu correo" name="email" required>
            <small id="emailHelp" class="form-text text-muted">
                No compartiremos tus datos con nadie</small>
        </div>
        <div class="form-group">
            <label for="inputapellido">Contraseña</label>
            <input type="password" class="form-control"
            id="inputapellido" placeholder="Contraseña" name="password" required>
        </div>
        <div class="form-group">
            <label for="dropdownpaises">País de preferencia</label>
            <select name="pais" id="dropdownpaises" class="form-control">
                <option value="de">Alemania</option>
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
                <option value="lt">Lituania</option>
                <option value="cz">República Checa</option>
                <option value="ch">Suiza</option>
            </select>
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
