<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Logar
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
       <Login />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import Login from './Login'
  export default {
    components:{
      Login,
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>