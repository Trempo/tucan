<template>
  <div class="container-sm">
    <div class="card">
      <div class="row" v-if="imageurl && imageurl.charAt(4)=='s'">
        <div class="col-md-5">
          <a :href="url" target="_blank"><img class="card-img" :src="imageurl" alt /></a>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h4 class="card-title"><a :href="url" target="_blank">{{title}}</a></h4>
            <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6>
            <p class="card-text">{{description}}</p>
            <a v-on:click.prevent="submit(title,source,url,imageurl,description)"
              href="#" class="btn btn-primary btn-xs card-link" :id="url">
              <i class="far fa-save"></i></a>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md">
          <div class="card-body">
            <h4 class="card-title"><a :href="url" target="_blank">{{title}}</a></h4>
            <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6>
            <p class="card-text">{{description}}</p>
            <a v-on:click.prevent="submit(title,source,url,imageurl,description)"
              href="#" class="btn btn-primary btn-xs card-link" :id="url">
              <i class="far fa-save"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import $ from 'jquery';

export default {
  name: 'ArticleCard',
  props: {
    title: String,
    source: String,
    url: String,
    imageurl: String,
    description: String,
  },
  methods: {
    async submit(pTitle, pSource, pUrl, pImageurl, pDescription) {
      const newArticle = {
        title: pTitle,
        source: pSource,
        url: pUrl,
        imageurl: pImageurl,
        description: pDescription,
      };
      try {
        const token = localStorage.getItem('jwt');
        const decoded = VueJwtDecode.decode(token);
        // const response =
        await axios.post(`/api/news/${decoded.id}/list`, newArticle);
        $(`a[id="${this.url}"]`).children().attr('class', 'fas fa-check');
      } catch (error) {
        console.log(error);
      }
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
.container-sm{
  padding: 1em 0;
}
.btn-primary{
  background-color: #619165;
  border-color: #2f6a50;
  margin: 0 auto;
}

div.col-md-3 {
  padding-right: 0;
}
div.col-md-9{
  padding-left: 0;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}

</style>
