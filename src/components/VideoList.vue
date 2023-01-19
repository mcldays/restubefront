<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="#FFD740"
        dense
        scroll-threshold="100"
        height="60"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(255,255,255,1), rgba(255,179,0,1), rgba(0,0,0,0)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon style="color: black" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color: black" >ResTube</v-toolbar-title>
      <v-spacer></v-spacer>
      <div style="display: flex; width: 600px">
        <v-text-field
            dense
            label="Поиск"
            append-icon="mdi-magnify"
            solo
            outlined
            rounded
            hide-details
        ></v-text-field>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Restube
          </v-list-item-title>
          <v-list-item-subtitle>
            Видеохостинг
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
          dense
          nav
      >
        <v-list-item
            link
            @click="toggleTheme"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            link
            @click="toggleTheme"
        >
          <v-list-item-icon>
            <v-icon>mdi-weather-night</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Изменить тему</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            link
            @click="uploadVideo"
        >
          <v-list-item-icon>
            <v-icon>mdi-upload-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Загрузить видео</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="pa-4 text-center">
        <v-row
            class="fill-height"
            align="center"
            justify="center"
        >
          <template v-for="(item, i) in videoData">
            <v-col
                :key="i"
                cols="12"
                md="4"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                >
                  <v-img
                      height="225px"
                      :src="imageByte(item.Previev)"
                  >
                    <v-card-title class="text-h6 ">
                      <v-row
                          class="fill-height flex-column"
                          justify="space-between"
                      >
                        <p class="mt-4 subheading text-left">
                          {{  item.Title}}
                        </p>

                        <div>
                          <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                            {{ item.Link }}
                          </p>
                          <p class="text-caption font-weight-medium font-italic text-left">
                            {{ item.subtext }}
                          </p>
                        </div>

                        <div style="height: 100px;width: 100px" class="align-self-center">
                          <v-btn
                              style="width: 100%;height: 100%;"
                              v-for="(icon, index) in icons"
                              :key="index"
                              :class="{ 'show-btns': hover }"
                              :color="transparent"
                              icon
                              @click="openVideo(item)"
                          >
                            <v-icon
                                x-large
                                style="width: 100px;height: 100px"
                                :class="{ 'show-btns': hover }"
                                :color="transparent"
                            >
                              {{ icon }}
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog
        v-model="dialog"
        v-if="dialog"
        width="1000"
        @click:outside="closeModal"
    >
      <VideoCard
      :url="url"
      :name="name"
      />
    </v-dialog>
    <v-dialog
        v-model="uploadDialog"
        v-if="uploadDialog"
        width="1000"
        @click:outside="closeUpload"

    >
     <UploadVideo
         @success="success"
     />
    </v-dialog>
  </v-app>
</template>

<script>
import {VideoController} from "@/controllers/VideoController";
import VideoCard from "@/ui/VideoCard";
import UploadVideo from "@/components/UploadVideo";
export default {
  name: "VideoList",
  props : {

  },
  components : {
      VideoCard,
    UploadVideo
  },
  computed : {

  },
  data() {
    return {
      videoCount : Number,
      drawer : false,
      videoData : Object,
      uploadDialog : false,
      icons: ['mdi-play'],
      items: [
        { title: 'Главная', icon: 'mdi-view-dashboard' },
        { title: 'Загрузить видео', icon: 'mdi-upload-outline' },
        { title: 'Включить темную тему', icon: 'mdi-weather-night', event : "toogleTheme" },
      ],
      right: null,
      transparent: 'rgba(255, 255, 255, 0)',
      dialog : false,
      url : "",
      name : ""
    }
  },
  async created() {
    this.refresh();
    console.log(this.videoData)

  },
  methods : {
    toggleTheme(){
      localStorage.setItem('mythemeCache', String(!this.$vuetify.theme.dark));
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    openVideo(item){
      this.url = item.Link
      this.name = item.Title.split('.')[0]
      this.dialog = true
    },
    closeModal(){
      this.refresh()
      this.dialog = false
    },
    uploadVideo(){
      this.uploadDialog = true
    },
    imageByte : function (item){
      return "data:image/jpg;base64," + item
    },
    async refresh(){
      let result = await VideoController.GetAllVideos()
      this.videoData = result.data
    },
    success(){
      this.refresh();
      this.uploadDialog = false
    },
    closeUpload(){
      this.uploadDialog = false
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  width: 100px;
  height: 100px;
  color: rgba(255,179,0,1) !important;
}
</style>