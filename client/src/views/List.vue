
<template>
  <div>
    <div class="container">
      <h5 v-if="!articles.length">
        Tu lista esta vacia. Añade lecturas desde Super para que crezca</h5>
    </div>
    <SavedArticle v-for="article in articles" :key="article._id" :title="article.title"
    :description="article.description" :source="article.source" :id="article._id"/>
  </div>
</template>

<script>
import SavedArticle from '@/components/SavedArticle.vue';

// @ is an alias to /src
const API_URL = 'http://localhost:3000/list';


export default {
  name: 'List',
  components: {
    SavedArticle,
  },
  data: () => ({
    error: '',
    articles: [],
    article: {
      title: '',
      source: '',
      url: '',
      imageurl: '',
      description: '',
      id: '',
    },
  }),

  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.articles = result;
      });
  },
};
</script>

<style>
h5{
  margin-top: 3em;
  text-align: center;
}
</style>
