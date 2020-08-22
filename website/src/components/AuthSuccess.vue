<template>
  <div>
    <v-card color="white" class="ml-15 userCard">
      <div class="user">
        <v-avatar size="80">
          <img :src="photo" />
        </v-avatar>

        <div class="ml-10 hello black--text">
          <h1>Olá, {{name}}!</h1>
          <p>{{email}}</p>
        </div>
      </div>
      <div class="logoutButton">
        <v-container fill-height>
          <v-card-actions align="center" class="justify-center">
            <v-btn large color="error" @click="logOut">Sair</v-btn>
          </v-card-actions>
        </v-container>
      </div>
    </v-card>

    <hr />
    <v-btn color="white" text @click="change('pedidos')">Pedidos Feitos</v-btn>

    <v-container v-if="page==='fazer pedidos'">
      <Menu :user='user' />
    </v-container>
    <v-container v-if="page==='pedidos'">
      <Pedidos :user='user' />
    </v-container>
    <hr />

  </div>
</template>

<script>
import firebase from "firebase";
import Menu from "./Menu";
import Pedidos from "./Pedidos";

export default {
  components: {
    Menu,
    Pedidos
  },
  data() {
    return {
      photo: "",
      userId: "",
      name: "",
      email: "",
      user: {},
      page: "",
    };
  },
  created() {
    var vm = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vm.user = user;
        vm.name = vm.user.displayName;
        vm.email = vm.user.email;
        vm.photo = vm.user.photoURL;
        vm.userId = vm.user.uid;
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    change(data) {
      this.page = data;
    },
  },
};
</script>

<style scoped>
.user {
  margin: 0 auto;
  display: flex;
  width: 60%;
}
.hello {
  color: white;
}
.logoutButton {
  width: 30%;
}
.userCard {
  width: 50%;
  display: flex;
  margin: 50px ;
  padding: 15px 0;
}
</style>