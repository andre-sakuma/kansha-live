<template>
  <div>
    <h2>Pedido: {{request.referenceId}}</h2>
    <h3>R${{request.value.toFixed(2)}}</h3>

    <div class="requestContent">
      <div class="qrcode">
        <v-card-actions class="justify-center">
          <img width="150px" :src="request.qrcode.img" alt />
          <v-card-subtitle>
            se tiver problemas com a imagem, acesse esse
            <a :href="request.qrcode.url">link</a>
          </v-card-subtitle>
        </v-card-actions>
      </div>
      <v-spacer></v-spacer>
      <div v-if="request.type=='retirada'" class="retirada">
        <v-card-title>Local de retirada:</v-card-title>
        <button
          v-if="request.type=='retirada' && request.location=='nikkey'"
          class="nikkeiButton"
          @click.stop="dialogNikkei = true"
        >
          <v-avatar tile size="60">
            <img src="../assets/nikkey-logo.png" alt />
          </v-avatar>
          <v-spacer></v-spacer>
          <div class="nikkeiAddress">
            Centro de Convenções do Nikkei Palace Hotel
            Rua Galvão Bueno, 425
            Liberdade
          </div>
        </button>
        <v-dialog v-model="dialogNikkei" max-width="960">
          <v-card>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.250258239774!2d-46.6370187844907!3d-23.559453784683857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a64f0fba4d%3A0xb8e8ef0e56d8afff!2sR.%20Galv%C3%A3o%20Bueno%2C%20425%20-%20Liberdade%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001506-000!5e0!3m2!1spt-BR!2sbr!4v1596987996088!5m2!1spt-BR!2sbr"
              width="960"
              height="450"
              frameborder="0"
              style="border:0;"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </v-card>
        </v-dialog>
        <button
          v-if="request.type=='retirada' && request.location=='tora'"
          class="nikkeiButton"
          @click.stop="dialogTora = true"
        >
          <v-avatar tile size="60">
            <img src="../assets/tora-logo.png" alt />
          </v-avatar>
          <v-spacer></v-spacer>
          <div class="nikkeiAddress">
            Restaurante Torá
            <br />Av. Winston Churchill 250
            Rudge Ramos
            São Bernado do Campo
          </div>
        </button>
        <v-dialog v-model="dialogTora" max-width="960">
          <v-card>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.12623370909!2d-46.56725408448881!3d-23.671443284628314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce430f4e10ecdb%3A0xcf0131904ce5ebe3!2sAv.%20Winston%20Churchill%2C%20250%20-%20Rudge%20Ramos%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009613-000!5e0!3m2!1spt-BR!2sbr!4v1596988185854!5m2!1spt-BR!2sbr"
              width="960"
              height="450"
              frameborder="0"
              style="border:0;"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </v-card>
        </v-dialog>
      </div>
      <div v-if="request.type=='entrega'" class="retirada">
        <v-card-title>Local de entrega:</v-card-title>
        <v-card-subtitle
          class="mt-1 ml-2"
        >{{request.address.name}}, {{request.address.number}}, {{request.address.bairro}}, {{request.address.complemento}}</v-card-subtitle>
      </div>
    </div>
    <div style="display:flex">
      <v-btn class="mt-3" @click.stop="dialogContent=true" text>Ver Conteúdo</v-btn>
      <v-dialog width="300" v-model="dialogContent">
        <v-card>
          <v-card-title v-if="request.content.sanma>0">SANMA TEISHOKU - {{request.content.sanma}}x</v-card-title>
          <v-card-title
            v-if="request.content.anchova>0"
          >ANCHOVA TEISHOKU - {{request.content.anchova}}x</v-card-title>
          <v-card-title v-if="request.content.sando>0">KATSU SANDO - {{request.content.sando}}x</v-card-title>
          <v-card-title
            v-if="request.content.tonkatsu>0"
          >TONKATSU TEISHOKU - {{request.content.tonkatsu}}x</v-card-title>
          <v-card-title
            v-if="request.content.kakiague>0"
          >KAKIAGUE UDON - {{request.content.kakiague}}x</v-card-title>
          <v-card-title v-if="request.content.tempura>0">TEMPURA UDON - {{request.content.tempura}}x</v-card-title>
          <v-card-title
            v-if="request.content.imagawayaki>0"
          >IMAGAWAYAKI - {{request.content.imagawayaki}}x</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn @click.stop="dialogContent=false" color="error">fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <div class="mt-5" style="margin-right:35px">
        <strong>Status:</strong>
        {{parseStatus()}}
      </div>
        <v-card-actions>
          <v-card-subtitle>
            Entre em contato com nossa equipe para marcar o dia de entrega/retirada
            <br />Se possível, mande uma foto ou print do pedido completo e do conteúdo(ver conteúdo), para facilitar a localização do mesmo
            <br />Email: delivery@ikoinosono.org.br
            <br />Telefone ou Whatsapp:
            <br />(11)94035-0271 ou (11)98516-4763
          </v-card-subtitle>
        </v-card-actions>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    request: Object,
  },
  data() {
    return {
      status: "null",
      dialogContent: false,
      dialogQrCode: false,
      dialogNikkei: false,
      dialogTora: false,
    };
  },
  methods: {
    parseStatus() {
      if (this.status == "created") return "Pendente";
      else if (this.status == "paid") return "Pago";
    },
    async getStatus() {
      var request = require("request");

      var headers = {
        "Content-Type": "application/json",
        "x-picpay-token": "91da06c9-f50c-4950-bf74-ae6e52c12ed4",
      };

      var options = {
        url: `https://appws.picpay.com/ecommerce/public/payments/${this.request.referenceId}/status`,
        headers: headers,
      };
      const self = this;
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          const response = JSON.parse(body);
          self.status = response.status;
        }
      }
      request(options, callback);
    },
  },
  async mounted() {
    await this.getStatus();
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
.nikkeiAddress {
  width: 70%;
}
.nikkeiButton {
  display: flex;
  width: 70%;
  transition-duration: 0.4s;
}
.nikkeiButton:hover {
  background: #cccccc;
  border-radius: 5px;
}
.makeDeliveryButton {
  width: 600px;
}
.requestContent {
  display: flex;
}
.qrcode {
  width: 50%;
}
.retirada {
  width: 40%;
}
</style>