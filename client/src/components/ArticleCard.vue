<template>
  <div class="container-sm">
    <div class="card bg-light">
      <div class="row">
        <div class="col-md-5">
          <a :href="url" target="_blank"><img class="card-img" :src="imageurl" alt /></a>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h4 class="card-title"><a :href="url" target="_blank">{{title}}</a></h4>
            <h6 class="card-subtitle mb-2 text-muted">{{source}}</h6>
            <p class="card-text">{{description}}</p>
            <a v-on:click.prevent="submit(title,source,url,imageurl,description)"
              href="#" class=" btn btn-primary btn-xs card-link">
              <i class="far fa-save"></i></a>
          </div>
        </div>
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
          // this.error = '';
        }
      });
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
.card{
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
}
.btn-primary{
  background-color: #619165;
  border-color: #2f6a50;
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
