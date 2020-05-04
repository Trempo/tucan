
<template>
  <div>
    <Navbar/>
    <div class="container">
      <h5 v-if="articles.length<1">
        Tu lista esta vacia. Añade lecturas para que crezca</h5>
    </div>
    <div class="article">
      <SavedArticle v-for="article in articles" :key="article._id" :title="article.title"
      :description="article.description" :source="article.source"
      :id="article._id" :imageurl="article.imageurl"/>
    </div>
  </div>
</template>

<script>
import SavedArticle from '@/components/SavedArticle.vue';
import Navbar from '@/components/Navbar.vue';

// @ is an alias to /src
const API_URL = 'http://localhost:3000/list';


export default {
  name: 'List',
  components: {
    SavedArticle,
    Navbar,
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
  color: white;
}

</style>
