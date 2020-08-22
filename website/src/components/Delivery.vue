<template>
  <v-container>
    <img class="mt-15" src="../assets/delivery-logo (1).png">
    <p class="subtitle">Sabe o que combina com a KANSHA LIVE?</p>
    <p
      class="description"
    >Comida saborosa preparada por uma equipe de voluntários com um tempero especial: carinho. Aliás, você pode apreciar antes ou durante assistindo a KANSHA LIVE</p>
    <v-carousel
      cycle
      height="400"
      interval="5000"
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="#323033" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card class="mx-auto" width="600">
                  <v-img max-width="600" :src="slide.img" />
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#363435">
                      <div class="ma-10 itemDesc">{{description[slide.name]}}</div>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-content class="makeDelivery">
      <v-card-actions class="justify-center">
        <v-btn
          height="50px"
          @click.stop="dialog = true"
          color="#eb3234"
          class="makeDeliveryButton white--text"
        >Fazer pedido!</v-btn>
      </v-card-actions>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <Login />
        </v-card>
      </v-dialog>
    </v-content>
    <div class="options">
      <div class="retirada">
        <h1>Retirada:</h1>
        <div class="retiradaContent">
          <button class="nikkeiButton" @click.stop="dialogNikkei = true">
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
          <v-spacer></v-spacer>
          <button class="nikkeiButton" @click.stop="dialogTora = true">
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
        </div>
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
      <v-spacer></v-spacer>
      <div class="entrega">
        <h1>Delivery:</h1>
        <p>taxa de entrega de R$8,00 na área atendida sob consulta</p>
        <v-card-actions class="justify-center">
          <v-btn
            color="#323033"
            class="white--text"
            @click.stop="dialogCobertura = true"
          >Ver Área de Cobertura</v-btn>
        </v-card-actions>
        <v-dialog v-model="dialogCobertura" max-width="960">
          <v-card>
            <v-img src="../assets/deliveryMap.jpeg" />
          </v-card>
        </v-dialog>
      </div>
    </div>
    
  </v-container>
</template>
<script>
import Login from "./Login";
import anchova from "../assets/delivery/anchova.png";
import imagawayaki from "../assets/delivery/imagawayaki.png";
import kakiague from "../assets/delivery/kakiague.png";
import katsu from "../assets/delivery/katsu.png";
import sanma from "../assets/delivery/sanma.png";
import tempura from "../assets/delivery/tempura.png";
import tonkatsu from "../assets/delivery/tonkatsu.png";

export default {
  components: {
    Login,
  },

  data() {
    return {
      overlay: false,
      dialog: false,
      dialogNikkei: false,
      dialogTora: false,
      dialogCobertura: false,
      dialogItem: false,
      description: {
        sanma:
          "Peixe importado do Japão grelhado, acompanhado de arroz com gergelim, batatinha no missô e conserva de nabo.",
        anchova:
          "Filé de Anchova grelhada, acompanhado de arroz com gergelim, batatinha no missô, salada de repolho e conserva de nabo.",
        tonkatsu:
          "Lombo de porco empanado em farinha panko, acompanhado de arroz com gergelim, batata frita, salada de repolho e conserva de nabo.",
        katsu:
          "Sanduiche em pão de forma especial recheado com lombo de porco empanado em farinha panko, repolho, mostarda especial e molho de tonkatsu",
        kakiague:
          "Macarrão importado, acompanha kakiague (tempura de legumes), caldo à base de shoyu e especiarias, massa de peixe (naruto maki), cogumelo (shitake), alga marinha (kombu) e cebolinha",
        tempura:
          "Macarrão importado, acompanha camarão empanado, caldo à base de shoyu e especiarias, massa de peixe (naruto maki), cogumelo (shitake), alga marinha (kombu) e cebolinha",
        imagawayaki:
          "Delicioso doce japonês feito com farinha de trigo, ovos, água, açúcar e recheio de anko de azuki",
      },
      slides: [
        {
          name: "anchova",
          img: anchova,
        },
        {
          name: "imagawayaki",
          img: imagawayaki,
        },
        {
          name: "kakiague",
          img: kakiague,
        },
        {
          name: "katsu",
          img: katsu,
        },
        {
          name: "sanma",
          img: sanma,
        },
        {
          name: "tempura",
          img: tempura,
        },
        {
          name: "tonkatsu",
          img: tonkatsu,
        },
      ],
    };
  },
};
</script>
<style scoped>
.titleb {
  color: #eb3234;
  font-weight: bold;
  font-size: 40px;
}
.subtitle {
  color: #fefefe;
  font-size: 35px;
  font-weight: bold;
}
.description {
  color: #fefefe;
  font-size: 28px;
}
.itemDesc {
  font-size: 30px;
}
.coberturaDiv {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 50px;
}
.makeDelivery {
  width: 80%;
  margin: 15px auto;
}
.options {
  display: flex;
  width: 100%;
  padding-top: 50px;
}
.retirada {
  width: 60%;
  padding: 0 15px 15px 15px;
  background: #fefefe;
  border-radius: 5px;
}
.retiradaContent {
  display: flex;
}
.entrega {
  width: 35%;
  padding: 0 15px;
  border-radius: 5px;
  background: #fefefe;
}
.nikkeiAddress {
  width: 70%;
}
.nikkeiButton {
  display: flex;
  width: 48%;
  transition-duration: 0.4s;
}
.nikkeiButton:hover {
  background: #cccccc;
  border-radius: 5px;
}
.makeDeliveryButton {
  width: 600px;
}
</style>