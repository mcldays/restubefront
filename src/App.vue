<template>
  <div id="app" style="position: relative">
    <video-list/>
  </div>
</template>

<script>
import axios from 'axios';
import VideoList from "@/components/VideoList";
export default {
  name: 'App',
  components: {
    VideoList,

  },
  mounted() {
    this.$vuetify.theme.dark = true
  },
  methods : {
    test(){
      axios.get('http://localhost:5000/video').then(response => {console.log(response)})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
