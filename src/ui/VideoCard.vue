<template>
  <v-card outlined style="opacity: 100%">
    <v-card-title>
      {{ name }}
    </v-card-title>
<div style="width: 100%; height: 100%; display: flex">
  <div>
  <video style="padding: 10px" id="player" width="100%" height="auto" autoplay="autoplay"  controls>
    <source :src=videoUrl type="video/mp4" codecs="avc1.42E01E, mp4a.40.2">
  </video>
  </div>
  <v-expand-x-transition>
  <div style="width: 1000px" v-if="linkState">

  </div>
  </v-expand-x-transition>
</div>
    <div style="padding: 10px; display: flex; justify-content: space-between">
      <v-btn @click="createVideoLink">Создать ссылку на ролик</v-btn>
      <v-btn @click="createLink(videoUrl)">Создать встраиваемую ссылку</v-btn>
    </div>
  </v-card>
</template>

<script>
import {VideoController} from "@/controllers/VideoController";
//import Notify from "@/ui/Notify";
export default {
  name: "VideoCard",
  props: {
    url: String,
    name : String
  },
  data : function(){
    return {
      linkState : false
    }
  },
  components : {
  //  Notify
  },
  computed: {
    videoUrl: function () {
      console.log(VideoController.getBaseUrl())
      console.log(this.url)
      return VideoController.getBaseUrl() + "/video?path=" + this.url
    },
  },
  methods: {
    createLink(videoUrl) {
      console.log(videoUrl)
      let link = `
        <video style="padding: 10px" id="player" width="100%" height="auto" autoplay="autoplay" controls>
            <source :src=${videoUrl} type="video/mp4" codecs="avc1.42E01E, mp4a.40.2">
         </video>`
      navigator.clipboard.writeText(link)
      alert("Текст скопирован в буфер отмена")
    },
    createVideoLink(){
        this.linkState = !this.linkState
    }
  }
}
</script>

<style scoped>

</style>