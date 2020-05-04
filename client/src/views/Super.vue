
<template>
  <div id="feed">
    <Navbar/>
    <ArticleCard v-for="article in articles" :key="article._id" :title="article.title"
    :description="article.description" :source="article.source"
     :url="article.url" :imageurl="article.imageurl"/>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard.vue';
import Navbar from '@/components/Navbar.vue';
// @ is an alias to /src
const API_URL = 'http://localhost:3000/feed';


export default {
  name: 'Super',
  components: {
    ArticleCard,
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
<style scoped>
div#feed{
  margin: 3em 0.5em;
}
</style>
