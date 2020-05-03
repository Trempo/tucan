<template>
<div class="container" :id="id">
    <div class="card">
      <img v-if="imageurl" :src="imageurl" alt />
      <div class="card-body">
        <h4 class="card-title"><a :href="url">{{title}}</a></h4>
        <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6>
        <p class="card-text">{{description}}</p>
        <a v-on:click="destroy(id)"
         href="#" class="card-link">
          <i class="far fa-trash-alt"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

const API_URL = 'http://localhost:3000/list';
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
    destroy: (id) => {
      fetch(`${API_URL}/${id}?_method=DELETE`, {
        method: 'POST',
        // body: id,
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        if (result.details) {
          // there was an error...
          const error = result.details.map((detail) => detail.message).join('. ');
          this.error = error;
        }
      }).then($(`#${id}`).slideUp(400));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 300px;
  height: auto;
}

.fa-save {
  display: inline;
  font-size: 1.5em;
}
a{
  text-decoration: none;
  color: #343a40;
}
a:hover{
  color: #C81F3B;
}
</style>
