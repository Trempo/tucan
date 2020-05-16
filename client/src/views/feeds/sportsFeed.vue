
<template>
  <div id="feed">
    <Navbar :firstName="firstName" currentpage="Deportes"/>
    <ArticleCard v-for="article in articles" :key="article._id" :title="article.title"
    :description="article.description" :source="article.source"
     :url="article.url" :imageurl="article.imageurl"/>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard.vue';
import Navbar from '@/components/Navbar.vue';
// @ is an alias to /src
import VueJwtDecode from 'vue-jwt-decode';
import Axios from 'axios';
// const API_URL = 'http://localhost:3000/feed';

export default {
  name: 'sportsFeed',
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
    firstName: '',
  }),
  mounted() {
    this.getFeed();
  },
  methods: {
    async getFeed() {
      const token = localStorage.getItem('jwt');
      const decoded = VueJwtDecode.decode(token);
      const user = await Axios.get(`/api/user/${decoded.id}`);
      const response = await Axios.get(`/api/news/${decoded.id}/sportsfeed`);
      this.firstName = user.data.user.firstName;
      this.articles = response.data;
    },
  },
};
</script>
<style scoped>
</style>
