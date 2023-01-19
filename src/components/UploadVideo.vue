<template>
  <div>
    <v-form ref="form">
          <v-card>
            <v-card-title>
              <span class="text-h5">Загрузить видео</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field v-model="name" label="Название видео"></v-text-field>
                <div style="display: flex">
                  <v-file-input @change="onFilePicked" label="Превью"/>
                  <v-file-input @change="onFilePicked" :loading="loadingFile" label="Файл"></v-file-input>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Закрыть
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="upload"
                  :loading="preload"
                  :disabled="loadingFile"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-form>
  </div>
</template>

<script>
import {VideoController} from "@/controllers/VideoController";
export default {
  name: "UploadVideo",
  data : function (){
    return {
        formData : FormData,
        filesData : [],
        fileName : [],
        name : "",
        preload : false,
        loadingFile : false,
        loadingPreview : false

    }
  },
  methods : {
    close(){
      this.$emit("close")
    },
    async upload(){
      const formData = new FormData()
      for (let i = 0; i < this.filesData.length; i++) {
        formData.append(this.fileName[i], this.filesData[i])
      }
      formData.append('name', this.name)
      this.formData = formData
      this.preload = true
       await VideoController.AddVideo(this.formData).then(()=>{
         this.preload = false
         this.formData = {}
         this.$emit("success")
       })
    },
    onFilePicked(e){
      let reader = new FileReader();
      this.loadingFile = true
      reader.readAsArrayBuffer(e)
      this.fileName.push(e.name)

      reader.addEventListener('load', this.success)
    },
    success(resultBlob){
      let fileData = new Blob([new Uint8Array(resultBlob.target.result)])
      this.filesData.push(fileData)
      this.loadingFile = false
    },
  }
}

</script>

<style scoped>

</style>