
<template>
  <div id="feed">
    <Navbar :firstName="firstName"/>
    <div class="container">
      <h5 v-if="articles.length<1">
        Tu lista esta vacia. Añade lecturas para que crezca</h5>
    </div>
    <div class="article">
      <SavedArticle v-for="article in articles" :key="article._id" :title="article.title"
      :description="article.description" :source="article.source"
      :id="article._id" :imageurl="article.imageurl" :url="article.url"/>
    </div>
  </div>
</template>

<script>
import SavedArticle from '@/components/SavedArticle.vue';
import Navbar from '@/components/Navbar.vue';
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';

// @ is an alias to /src


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
    firstName: '',
  }),

  mounted() {
    this.getFeed();
  },

  methods: {
    async getFeed() {
      const token = localStorage.getItem('jwt');
      const decoded = VueJwtDecode.decode(token);
      const response = await axios.get(`/api/user/${decoded.id}/list`);
      const user = await axios.get(`/api/user/${decoded.id}`);
      this.firstName = user.data.user.firstName;
      this.articles = response.data;
    },
  },
};
</script>

<style>
h5{
  margin-top: 3em;
  text-align: center;
  color: white;
}
div#feed{
  margin: 3em 0.5em;
}
</style>
