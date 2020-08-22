<template>
  <v-container class="card">
    <section id="firebaseui-auth-container"></section>
  </v-container>
</template>

<script>
  import firebase from "firebase";
  import * as firebaseui from "firebaseui";

  export default {
    name: 'Main',
    data: () => ({
      
    }),
    mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        var uiConfig = {
          signInFlow: "popup",
          signInSuccessUrl: "/profile",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
  }
</script>
<style scoped>
  .card{
    padding-right: 24px;
  }
</style>