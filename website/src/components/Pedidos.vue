<template>
  <div v-if="isOk">
    <v-card class="py-2 px-3 mb-8" v-for="(request, index) in requests" :key="index">
      <PedidoCard :request="request" />
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import PedidoCard from './Request'

export default {
  components: {
    PedidoCard
  },
  props:{
    user:Object
  },
  watch: {
    requests(val){
      if(val!=='Nenhum documento foi encontrado.'){
        this.isOk = true
      }
      else this.isOk = false
    }
  },
  data() {
    return {
      requests:[],
      isOk:false,
    };
  },
  methods: {
    async getRequests(){
      const response = await axios.get(`https://us-central1-api-kansha.cloudfunctions.net/app/requests/${this.user.uid}`)
      return response.data
    }
  },
  async mounted() {
    this.requests = await this.getRequests()
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
  margin: 50px;
  padding: 15px 0;
}
</style>