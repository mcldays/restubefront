<template>
  <div style="display: flex; ">
    <v-card  style="display:flex; background-color: #00ff7f; padding: 0 5px 0 5px"   elevation="10">
      <v-icon
          dark
          right
      >
        mdi-check-bold
      </v-icon>
      <v-card-text style="font-size: 17px; color: white; white-space: normal;"  >
        <span>{{ text }} </span>
        <span></span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: "Notify",
  data : function (){
    return {
      text : ""
    }
  },
  created() {
    eventBus.$on('buffer', data => {
      this.text = data
    })
  }
}
</script>

<style scoped>

</style>