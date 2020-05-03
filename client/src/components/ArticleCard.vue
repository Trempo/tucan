<template>
  <div class="container">
    <div class="card">
      <img v-if="imageurl" :src="imageurl" alt />
      <div class="card-body">
        <h4 class="card-title"><a :href="url" target="_blank">{{title}}</a></h4>
        <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6>
        <p class="card-text">{{description}}</p>
        <a v-on:click="submit(title,source,url,imageurl,description)"
         href="#" class="card-link">
          <i class="far fa-save"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/feed';
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
    submit: (pTitle, pSource, pUrl, pImageurl, pDescription) => {
      const newArticle = {
        title: pTitle,
        source: pSource,
        url: pUrl,
        imageurl: pImageurl,
        description: pDescription,
      };
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newArticle),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        if (result.details) {
          // there was an error...
          const error = result.details.map((detail) => detail.message).join('. ');
          this.error = error;
        } else {
          this.error = '';
        }
      });
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
