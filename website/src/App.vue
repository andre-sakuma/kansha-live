<template>
  <v-app id="app">
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Kansha Live Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="90"
        />
      </div>
      <span class="liveTitle">Kansha Live</span>

      <v-spacer></v-spacer>

      <div class="timer">
        <Timer 
         endtime="Aug 16, 2020 14:00:00" 
         trans='{  
         "day":"Day",
         "hours":"Hours",
         "minutes":"Minuts",
         "seconds":"Seconds",
         "expired":"Event has been expired.",
         "running":"Till the end of event.",
         "upcoming":"Till start of event.",
         "status": {
            "expired":"Expired",
            "running":"Running",
            "upcoming":"Future"
           }}'
         ></Timer>
      </div>
    </v-app-bar>

    <v-main>
      <v-content class="mainContent">
        <router-view></router-view>
      </v-content>
    </v-main>
    <v-footer fixed color="#323033">
      <div class="logo">
        <a href="https://www.ikoinosono.org.br">
          <img src="./assets/footer.jpg" alt="">
        </a>
      </div>
      <v-spacer></v-spacer>
      <div class="linkLive">
        <span>Acompanhem a nossa transmissão pelo canal:</span>
        <v-spacer></v-spacer>
        <a href="https://www.youtube.com/c/IkoinoSonooficial">https://www.youtube.com/c/IkoinoSonooficial</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Timer from './components/Timer'
export default {
  name: 'App',

  components:{
    Timer,
  },

  data: () => ({
    items:[
      'delivery',
      'live'
    ]
  }),
};
</script>
<style scoped>
.mainContent{
  background: #323033;
  height: 100%;
  margin-bottom: 50px;
}
.linkLive{
  color: yellow;
  width: 30%;
}
.linkLive a{
  color: yellow;
}
.liveTitle{
  color: black;
  font-size: 30px;
  font-weight: bold;
}
</style>