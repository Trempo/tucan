<template>
<div class="container" :id="id">
    <div class="card bg-light">
      <div class="row">
        <div class="col-md-5">
          <img class="card-img" v-if="imageurl" :src="imageurl" alt /></div>
        <div class="col-md-7">
          <div class="card-body">
          <h4 class="card-title"><a :href="url" target="_blank">{{title}}</a></h4>
          <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6>
          <p class="card-text">{{description}}</p>
          <a v-on:click.prevent="destroy(id)"
         href="#" class="btn btn-primary btn-xslg card-link">
          <i class="far fa-trash-alt"></i></a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';


export default {
  name: 'SavedArticle',
  props: {
    title: String,
    source: String,
    url: String,
    imageurl: String,
    description: String,
    id: String,
  },
  methods: {
    async destroy(id) {
      try {
        const token = localStorage.getItem('jwt');
        const decode = VueJwtDecode.decode(token);
        // const response =
        await axios.delete(`/api/user/${decode.id}/list/${this.id}`);
      } catch (error) {
        console.log(error);
      }
      $(`#${id}`).slideUp(400);
      // fetch(`${DELETE_URL}/${id}?_method=DELETE`, {
      //   method: 'POST',
      //   // body: id,
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      // }).then((response) => response.json()).then((result) => {
      //   if (result.details) {
      //     // there was an error...
      //     const error = result.details.map((detail) => detail.message).join('. ');
      //     this.error = error;
      //   }
      // }).then($(`#${id}`).slideUp(400));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 100%;
  height: 100%;
}

.fa-save {
  display: inline;
  font-size: 1.5em;
}
a{
  text-decoration: none;
  color: #343a40;
}
a.btn{
  color: white;
}
.container{
  padding: 1em 0;
}
.card{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}
.btn-primary{
    background-color: #C8153B;
}
div.col-md-3 {
  padding-right: 0;
}
div.col-md-9{
  padding-left: 0;
}
.card{
  border: none;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}

</style>
