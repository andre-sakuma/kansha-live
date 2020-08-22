
<template>
  <v-container fluid class="menuContainer">
    <div class="menu">
      <v-card color="blue-grey lighten-5" class="scrollItems" height="580">
        <v-row>
          <v-col cols="15">
            <v-row :align="alignment" :justify="justify" color="#323033">
              <v-hover v-for="(n, index) of list" :key="index" class="my-5 pa-5" width="500">
                <template v-slot:default="{ hover }">
                  <v-card class="mx-auto pa-5">
                    <h2>{{ n.name }}</h2>
                    <h2>R${{ n.price }}</h2>
                    <v-img :src="n.imgUrl" height="240" />
                    <p class="mt-5">{{ n.description }}</p>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#363435">
                        <v-btn rounded color="success" @click="add(n)">Adicionar</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
              <div></div>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-spacer></v-spacer>
    <div class="cart">
      <v-card color="blue-grey lighten-5" class="pa-5">
        <h1>CARRINHO</h1>
        <v-hover v-if="cardCart.sanma.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>SANMA TEISHOKU - {{cardCart.sanma.price.toPrecision(4)}} x {{cardCart.sanma.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('sanma')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <v-hover v-if="cardCart.tonkatsu.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>TONKATSU TEISHOKU - {{cardCart.tonkatsu.price.toPrecision(4)}} x {{cardCart.tonkatsu.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('tonkatsu')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <v-hover v-if="cardCart.anchova.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>ANCHOVA TEISHOKU - {{cardCart.anchova.price.toPrecision(4)}} x {{cardCart.anchova.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('anchova')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <v-hover v-if="cardCart.sando.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>KATSU SANDO - {{cardCart.sando.price.toPrecision(4)}} x {{cardCart.sando.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('sando')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <v-hover v-if="cardCart.kakiague.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>KAKIAGUE UDON - {{cardCart.kakiague.price.toPrecision(4)}} x {{cardCart.kakiague.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('kakiague')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <v-hover v-if="cardCart.tempura.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>TEMPURA UDON - {{cardCart.tempura.price.toPrecision(4)}} x {{cardCart.tempura.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('tempura')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <v-hover v-if="cardCart.imagawayaki.qnt>0">
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto pa-3 mb-2">
              <h5>IMAGAWAYAKI - {{cardCart.imagawayaki.price.toPrecision(4)}} x {{cardCart.imagawayaki.qnt}}</h5>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#363435">
                  <v-btn rounded color="error" @click="remove('imagawayaki')">remover</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
        <hr />
        <h2>TOTAL = R${{(getTotal()).toFixed(2)}}</h2>
        <v-card-actions class="justify-center">
          <v-btn
            :disabled="getTotal()==0"
            @click.stop="dialogCart = true"
            width="100%"
            color="success"
          >Finalizar Compra</v-btn>
        </v-card-actions>

        <v-dialog max-width="600" v-model="dialogCart">
          <v-card class="pa-5">
            <v-card-title primary-title>Confirme sua compra:</v-card-title>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.sanma.qnt>0"
                class="align-center"
              >SANMA TEISHOKU - {{cardCart.sanma.price.toPrecision(4)}} x {{cardCart.sanma.qnt}}</v-card-subtitle>
            </v-card>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.anchova.qnt>0"
                class="align-center"
              >ANCHOVA TEISHOKU - {{cardCart.anchova.price.toPrecision(4)}} x {{cardCart.anchova.qnt}}</v-card-subtitle>
            </v-card>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.tonkatsu.qnt>0"
                class="align-center"
              >TONKATSU TEISHOKU - {{cardCart.tonkatsu.price.toPrecision(4)}} x {{cardCart.tonkatsu.qnt}}</v-card-subtitle>
            </v-card>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.sando.qnt>0"
                class="align-center"
              >KATSU SANDO - {{cardCart.sando.price.toPrecision(4)}} x {{cardCart.sando.qnt}}</v-card-subtitle>
            </v-card>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.kakiague.qnt>0"
                class="align-center"
              >KAKIAGUE UDON - {{cardCart.kakiague.price.toPrecision(4)}} x {{cardCart.kakiague.qnt}}</v-card-subtitle>
            </v-card>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.tempura.qnt>0"
                class="align-center"
              >TEMPURA UDON - {{cardCart.tempura.price.toPrecision(4)}} x {{cardCart.tempura.qnt}}</v-card-subtitle>
            </v-card>
            <v-card>
              <v-card-subtitle
                v-if="cardCart.imagawayaki.qnt>0"
                class="align-center"
              >IMAGAWAYAKI - {{cardCart.imagawayaki.price.toPrecision(4)}} x {{cardCart.imagawayaki.qnt}}</v-card-subtitle>
            </v-card>
            <v-card v-if="radioGroup==='entrega'">
              <v-card-subtitle class="align-center">TAXA DE ENTREGA - 8.00</v-card-subtitle>
            </v-card>
            <hr />
            <v-card>
              <v-card-title class="align-center">TOTAL = R${{(getTotal()).toFixed(2)}}</v-card-title>
            </v-card>
            <v-card-actions class="justify-center">
              <v-radio-group class="flexbox" v-model="radioGroup">
                <v-radio label="Vou retirar" value="retirada"></v-radio>
                <v-radio label="Entregar" value="entrega"></v-radio>
              </v-radio-group>
            </v-card-actions>
            <v-card-actions class="justify-center">
              <v-btn
                color="success"
                @click.stop="dialogAddress = true; dialogCart = false"
              >confirmar</v-btn>
              <v-btn color="error" @click.stop="dialogCart = false">cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog max-width="600" v-model="dialogAddress">
          <v-card>
            <v-card-title v-if="radioGroup == 'retirada'" primary-title>Escolha o local de retirada:</v-card-title>
            <v-card-actions v-if="radioGroup == 'retirada'">
              <div class="retirada">
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
                      <v-card-actions class="justify-center">
                        <v-btn
                          color="success"
                          @click.stop="localRetirada='nikkey'; dialogAddress = false; dialogNikkei = false; dialogBuy=true"
                        >confirmar</v-btn>
                        <v-btn color="error" @click.stop="dialogNikkei = false">voltar</v-btn>
                      </v-card-actions>
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
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="success"
                        @click.stop="localRetirada='tora'; dialogAddress = false; dialogTora = false; dialogBuy=true"
                      >confirmar</v-btn>
                      <v-btn color="error" @click.stop="dialogTora = false">voltar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-actions>

            <v-card-title
              v-if="radioGroup == 'entrega'"
              primary-title
            >Preencha com o endereço de entrega</v-card-title>
            <v-card-actions v-if="radioGroup == 'entrega'">
              <v-form class="form" v-model="validateAddress">
                <v-text-field
                  v-model="address"
                  :rules="addressRule"
                  label="Endereço"
                  required
                  outlined
                  hint="Rua José azevedo"
                ></v-text-field>
                <v-text-field
                  v-model="addressNumber"
                  :rules="numberRule"
                  label="Número"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  outlined
                  v-model="complemento"
                  :rules="addressRules"
                  label="Complemento"
                  hint="apt. 115"
                ></v-text-field>
                <v-text-field
                  v-model="bairro"
                  :rules="addressRule"
                  label="Bairro"
                  hint="Vila Mariana"
                  required
                  outlined
                ></v-text-field>
              </v-form>
            </v-card-actions>
            <v-card-actions v-if="radioGroup == 'retirada'" class="justify-center">
              <v-btn color="error" @click.stop="dialogAddress = false">cancelar</v-btn>
            </v-card-actions>
            <v-card-actions v-if="radioGroup == 'entrega'" class="justify-center">
              <v-btn
                :disabled="!validateAddress"
                color="success"
                @click.stop="dialogBuy = true; dialogAddress = false"
              >confirmar</v-btn>
              <v-btn color="error" @click.stop="dialogAddress = false">cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogCobertura" max-width="660">
          <v-card>
            <v-card-title
              primary-title
            >Confirme que o local de entrega se encontra dentro dessa área:</v-card-title>
            <v-card-actions class="justify-center">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1EK0EEk4_Yj0vKC1b9_A0m1R22Pn0wmWJ"
                width="640"
                height="480"
              ></iframe>
            </v-card-actions>
            <v-card-actions class="justify-center">
              <v-btn color="success" @click.stop="dialogCobertura = false">confirmar</v-btn>
              <v-btn
                color="error"
                @click.stop="dialogCobertura = false; dialogAddress=false"
              >cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogBuy" :max-width="buywidth">
          <v-card>
            <v-card-title primary-title>Escolha a forma de pagamento:</v-card-title>
            <v-card-actions class="justify-center" v-if="openPicpay==false && openEmail==false">
              <v-btn
                @click.stop="openPicpay = true; dialogBuy = false"
                width="200px"
                color="success"
              >Pagar com PicPay</v-btn>
            </v-card-actions>

            <v-card-actions class="justify-center" v-if="openPicpay==false && openEmail==false">
              <v-btn
                @click.stop="openEmail = true; dialogBuy = false"
                width="200px"
                color="red"
                class="mb-6 white--text"
              >Pagar via Email</v-btn>
            </v-card-actions>
            <v-dialog v-model="openEmail">
              <v-card>
                <v-card-title primary-title>
                  Indisponível no momento :(
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn color="error" @click.stop="openEmail=false">fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="openPicpay"
              scrollable
              max-width="500px"
              transition="dialog-transition"
            >
              <v-card class="px-5">
                <v-card-title primary-title>Precisamos dos seguintes dados:</v-card-title>
                <v-card-subtitle>Os dados serão usados apenas para a integração com o PicPay</v-card-subtitle>
                <v-card-actions>
                  <v-form v-model="validateUser" class="form">
                    <v-text-field v-model="name" :rules="nameRules" label="Nome" required outlined></v-text-field>
                    <v-text-field
                      v-model="surname"
                      :rules="nameRules"
                      label="Sobrenome"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="phone"
                      :rules="numberRule"
                      prefix="(11)"
                      label="Telefone"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      outlined
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>

                    <v-text-field outlined v-model="cpf" :rules="numberRule" label="CPF" required></v-text-field>
                  </v-form>
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <v-btn
                    :disabled="!validateUser"
                    color="success"
                    @click.stop="dialogPicpay = true; openPicpay = false; requestToPicpay()"
                  >confirmar</v-btn>
                  <v-btn color="error" @click.stop="openPicpay = false">cancelar</v-btn>
                </v-card-actions>
              </v-card>
              <v-dialog max-width="600" v-model="dialogPicpay">
                <v-card>
                  <v-card-title primary-title>Pedido: {{dataFromPicpay.referenceId}}</v-card-title>
                  <v-card-actions class="justify-center">
                    <img :src="qrCode" alt />
                  </v-card-actions>
                  <v-card-subtitle>
                    se tiver problemas com a imagem, siga neste link:
                    <a
                      :href="dataFromPicpay.paymentUrl"
                    >{{dataFromPicpay.paymentUrl}}</a>
                  </v-card-subtitle>
                </v-card>
              </v-dialog>
            </v-dialog>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import anchova from "../assets/delivery/anchova.png";
import imagawayaki from "../assets/delivery/imagawayaki.png";
import kakiague from "../assets/delivery/kakiague.png";
import katsu from "../assets/delivery/katsu.png";
import sanma from "../assets/delivery/sanma.png";
import tempura from "../assets/delivery/tempura.png";
import tonkatsu from "../assets/delivery/tonkatsu.png";

import axios from "axios";
import shortid from "shortid";

export default {
  props: {
    test: String,
    user: Object,
  },
  watch: {
    dialogAddress(val) {
      if (val === true) {
        if (this.radioGroup == "entrega") {
          this.dialogCobertura = true;
        } else this.dialogCobertura = false;
      }
    },
    dataFromPicpay(val) {
      console.log("oi", val);
      if (val != "nothing") {
        this.qrCode = val.qrcode.base64;
      }
    },
  },
  mounted() {
    this.radioGroup = "retirada";
  },
  data() {
    return {
      address: '',
      addressNumber:'',
      complemento: '',
      bairro: '',
      qrCode: "teste",
      dataFromPicpay: "nothing",
      localRetirada: "",
      dialogTora: false,
      dialogPicpay: false,
      validateAddress: false,
      validateUser: false,
      dialogNikkei: false,
      cpf: "",
      radioGroup: "retirada",
      phone: this.user.phoneNumber,
      email: this.user.email,
      buywidth: 400,
      dialog: false,
      dialogCart: false,
      dialogBuy: false,
      dialogAddress: false,
      dialogCobertura: false,
      openEmail: false,
      openPicpay: false,
      cart: [],
      name: this.user.displayName.split(" ")[0],
      surname: this.user.displayName.split(" ")[
        this.user.displayName.split(" ").length - 1
      ],
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      numberRule: [
        (v) => !!v || "Este campo é obrigatório",
        (v) => /^[0-9]*$/.test(v) || "Coloque apenas os números",
      ],
      addressRule: [(v) => !!v || "Este campo é obrigatório"],
      cardCart: {
        sanma: {
          price: 30.0,
          qnt: 0,
        },
        tonkatsu: {
          price: 25.0,
          qnt: 0,
        },
        anchova: {
          price: 30.0,
          qnt: 0,
        },
        sando: {
          price: 20.0,
          qnt: 0,
        },
        kakiague: {
          price: 25.0,
          qnt: 0,
        },
        tempura: {
          price: 30.0,
          qnt: 0,
        },
        imagawayaki: {
          price: 20.0,
          qnt: 0,
        },
      },
      hover: true,
      list: [
        {
          name: "SANMA TEISHOKU",
          price: "30.00",
          description:
            "Peixe importado do Japão grelhado, acompanhado de arroz com gergelim, batatinha no missô e conserva de nabo.",
          imgUrl: sanma,
        },
        {
          name: "TONKATSU TEISHOKU",
          price: "25.00",
          description:
            "Lombo de porco empanado em farinha panko, acompanhado de arroz com gergelim, batata frita, salada de repolho e conserva de nabo.",
          imgUrl: tonkatsu,
        },
        {
          name: "ANCHOVA TEISHOKU",
          price: "30.00",
          description:
            "Filé de Anchova grelhada, acompanhado de arroz com gergelim, batatinha no missô, salada de repolho e conserva de nabo.",
          imgUrl: anchova,
        },
        {
          name: "KATSU SANDO",
          price: "20.00",
          description:
            "Sanduiche em pão de forma especial recheado com lombo de porco empanado em farinha panko, repolho, mostarda especial e molho de tonkatsu",
          imgUrl: katsu,
        },
        {
          name: "KAKIAGUE UDON",
          price: "25.00",
          description:
            "Macarrão importado, acompanha kakiague (tempura de legumes), caldo à base de shoyu e especiarias, massa de peixe (naruto maki), cogumelo (shitake), alga marinha (kombu) e cebolinha",
          imgUrl: kakiague,
        },
        {
          name: "TEMPURA UDON",
          price: "30.00",
          description:
            "Macarrão importado, acompanha camarão empanado, caldo à base de shoyu e especiarias, massa de peixe (naruto maki), cogumelo (shitake), alga marinha (kombu) e cebolinha",
          imgUrl: tempura,
        },
        {
          name: "IMAGAWAYAKI",
          price: "20.00",
          description:
            "Delicioso doce japonês feito com farinha de trigo, ovos, água, açúcar e recheio de anko de azuki",
          imgUrl: imagawayaki,
        },
      ],
      alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
      alignment: "center",
      dense: false,
      justifyAvailable: [
        "start",
        "center",
        "end",
        "space-around",
        "space-between",
      ],
      justify: "center",
    };
  },
  methods: {
    getImgQrCode(data) {
      if (data !== "nothing") {
        if (data.qrcode) {
          return data.qrcode.base64;
        }
      } else return "";
    },
    async requestToPicpay() {
      var request = require("request");

      var headers = {
        "Content-Type": "application/json",
        "x-picpay-token": "",
      };

      var dataString = {
        referenceId: shortid.generate(),
        callbackUrl:
          "https://us-central1-api-kansha.cloudfunctions.net/app/callback",
        returnUrl: "https://api-kansha.web.app/",
        value: this.getTotal(),
        expiresAt: "2022-05-01T16:00:00-03:00",
        buyer: {
          firstName: this.name,
          lastName: this.surname,
          document: this.cpf,
          email: this.email,
          phone: this.phone,
        },
      };

      var options = {
        url: "https://appws.picpay.com/ecommerce/public/payments",
        method: "POST",
        headers: headers,
        body: JSON.stringify(dataString),
      };
      var self = this;

      async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          const response = JSON.parse(body)
          self.dataFromPicpay = response;
          await axios({
            method: "post",
            url: `https://us-central1-api-kansha.cloudfunctions.net/app/requests/${self.user.uid}`,
            data: {
              status: "none",
              qrcode:{
                img:response.qrcode.base64,
                url:response.paymentUrl
              },
              referenceId: response.referenceId,
              name: self.name,
              type: self.radioGroup,
              address: {
                name: self.address,
                number: self.addressNumber,
                bairro: self.bairro,
                complemento: self.complemento,
              },
              location: self.localRetirada,
              value: self.getTotal(),
              content: {
                sanma: self.cardCart.sanma.qnt,
                anchova: self.cardCart.anchova.qnt,
                tonkatsu: self.cardCart.tonkatsu.qnt,
                kakiague: self.cardCart.kakiague.qnt,
                tempura: self.cardCart.tempura.qnt,
                sando: self.cardCart.sando.qnt,
                imagawayaki: self.cardCart.imagawayaki.qnt,
              },
            },
          });
        }
      }
      const response = await request(options, callback);
      console.log(response);
    },

    getName() {
      return this.user.displayName.split(" ")[0];
    },
    add(item) {
      if (item.name === "SANMA TEISHOKU")
        this.cardCart.sanma.qnt = this.cardCart.sanma.qnt + 1;
      else if (item.name === "TONKATSU TEISHOKU")
        this.cardCart.tonkatsu.qnt = this.cardCart.tonkatsu.qnt + 1;
      else if (item.name === "ANCHOVA TEISHOKU")
        this.cardCart.anchova.qnt = this.cardCart.anchova.qnt + 1;
      else if (item.name === "KATSU SANDO")
        this.cardCart.sando.qnt = this.cardCart.sando.qnt + 1;
      else if (item.name === "KAKIAGUE UDON")
        this.cardCart.kakiague.qnt = this.cardCart.kakiague.qnt + 1;
      else if (item.name === "TEMPURA UDON")
        this.cardCart.tempura.qnt = this.cardCart.tempura.qnt + 1;
      else if (item.name === "IMAGAWAYAKI")
        this.cardCart.imagawayaki.qnt = this.cardCart.imagawayaki.qnt + 1;
    },
    remove(item) {
      this.cardCart[item].qnt = this.cardCart[item].qnt - 1;
    },
    getTotal() {
      let result =
        this.cardCart.sanma.qnt * this.cardCart.sanma.price +
        this.cardCart.tonkatsu.qnt * this.cardCart.tonkatsu.price +
        this.cardCart.anchova.qnt * this.cardCart.anchova.price +
        this.cardCart.sando.qnt * this.cardCart.sando.price +
        this.cardCart.kakiague.qnt * this.cardCart.kakiague.price +
        this.cardCart.tempura.qnt * this.cardCart.tempura.price +
        this.cardCart.imagawayaki.qnt * this.cardCart.imagawayaki.price;
      if (this.radioGroup === "entrega") result += 8;
      return result;
    },
  },
};
</script>
<style scoped>
.item {
  display: inline-block;
  border-radius: 5px;
}
.buttons {
  width: 80%;
  margin: 0 auto;
}
.menuContainer {
  background: #323033;
  display: flex;
}
.menu {
  width: 60%;
}
.scrollItems {
  overflow-y: auto;
}
.cart {
  width: 35%;
}
.form {
  width: 100%;
}
.retirada {
  width: 100%;
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