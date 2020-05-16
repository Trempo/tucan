
<template>
  <div id="feed">
    <Navbar :firstName="firstName" currentpage="Buscar"/>
    <div class="container">
        <div class="shownform">
            <button
            @click="showSearchForm = !showSearchForm"
            type="button"
            class="btn btn-primary mt-3 mb-3"><i class="fas fa-cogs"></i></button>
            <input type="text" v-model="search.query" class="form-control query mt-3 mb-3"
            placeholder="Busca alguna palabra...">
            <button
            type="button"
            class="btn btn-primary mt-3 mb-3"
            @click="submitQuery">Buscar</button>
        </div>
    <form class="mb-3" v-if="showSearchForm">
      <div v-if="error" class="alert alert-dismissible alert-danger container fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{error}}
    </div>
        <div class="form-group">
            <label for="dropdownlanguage">Lenguaje de busqueda</label>
            <select name="language" id="dropdownlanguage"
            class="form-control" v-model="search.language" >
                <option value="ar">Árabe</option>
                <option value="de">Alemán</option>
                <option value="zh">Chino</option>
                <option value="es">Español</option>
                <option value="fr">Francés</option>
                <option value="he">Hebreo</option>
                <option value="nl">Holandés</option>
                <option value="en">Inglés</option>
                <option value="it">Italiano</option>
                <option value="no">Noruego</option>
                <option value="pt">Portugués</option>
                <option value="ru">Ruso</option>
                <option value="se">Sami</option>
            </select>
            <small id="languageHelp" class="form-text text-muted">
                Por defecto el resultado estará en todos los idiomas disponibles</small>
        </div>
    </form>
    </div>
    <div v-if="articles.length>=1">
        <ArticleCard v-for="article in articles" :key="article._id" :title="article.title"
        :description="article.description" :source="article.source"
        :url="article.url" :imageurl="article.imageurl"/>
    </div>
    <div v-else>
        <h5>Busca alguna noticia.</h5>
    </div>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard.vue';
import Navbar from '@/components/Navbar.vue';
// @ is an alias to /src
import VueJwtDecode from 'vue-jwt-decode';
import Axios from 'axios';

export default {
  name: 'searchFeed',
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
    showSearchForm: false,
    search: {
      country: '',
      language: '',
      query: '',
    },
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const token = localStorage.getItem('jwt');
      const decoded = VueJwtDecode.decode(token);
      const user = await Axios.get(`/api/user/${decoded.id}`);
      this.firstName = user.data.user.firstName;
      this.search.country = user.data.user.country;
    },
    async submitQuery() {
      const token = localStorage.getItem('jwt');
      const decoded = VueJwtDecode.decode(token);
      const response = await Axios.post(`/api/news/${decoded.id}/search`, { search: this.search });
      this.articles = response.data;
    },
  },
};
</script>
<style scoped>
a{
  text-decoration: none;
  color: #343a40;
}
a.btn{
  color: white;
}
.btn-primary{
  background-color: #619165;
  border-color: #2f6a50;
  margin: 0 auto;
}
.btn-primary:not(:disabled):not(.disabled):active{
  background-color: #2f6a50;
}
.query{
    max-width: 80%;
    margin-left: 5px;
    margin-right: 5px;
}
div.shownform{
    display: flex;
    float: unset;
}
label{
    padding-top: 1em;
}
</style>
