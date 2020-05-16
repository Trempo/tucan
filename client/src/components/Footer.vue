<template>
  <div>
      <footer class="page-footer font-small">
        <div class="container">
          Para publicitar con nosotros o para soporte técnico
           escribenos a servicioalcliente@tucan.news <br>
          Tucan News 2020
          Elaborado con NewsApi.org
        </div>
      </footer>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style scoped>
footer{
    background: #619165 !important;
}
.container{
  text-align: center;
  color: white;
}
</style>
