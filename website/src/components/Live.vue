<template>
  <v-container>
    <p
      class="description"
    >Há 45 anos, agosto tem sido o mês do nosso encontro anual de confraternização no Bazar Beneficiente do Ikoi no Sono. Em agradecimento a vocês que nos ajudaram, que continuam ajudando e ainda irão ajudar para que nos tornemos uma entidade cada vez melhor, este ano nosso encontro será virtual, relembrando os melhores momentos dos artistas e voluntários no Ikoi no Sono.</p>
    <v-carousel cycle height="500" hide-delimiter-background hide-delimiters show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="#323033" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-img max-width="680" :src="slide" />
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

  </v-container>
</template>
<script>
import cintia from "../assets/live/cintia.jpg";
import joe from "../assets/live/joe.jpg";
import edson from "../assets/live/edson.jpg";
import karen from "../assets/live/karen.jpg";
import theFriends from "../assets/live/the-friends.jpg";
import apresentador from "../assets/live/apresentador.jpg";
import acal from "../assets/live/acal.jpg";
import awadori from "../assets/live/awadori.jpg";
import daiko from "../assets/live/daiko.jpg";
import dalanBueno from "../assets/live/dalan-bueno.jpg";
import filantropia from "../assets/live/filantropia.jpg";
import imigracao from "../assets/live/imigracao.jpg";
import ishida from "../assets/live/ishida.jpg";
import kokoro from "../assets/live/kokoro.jpg";
import nakase from "../assets/live/nakase.jpg";
import oshiman from "../assets/live/oshiman.jpg";
import pescadores from "../assets/live/pescadores.jpg";
import ryukyu from "../assets/live/ryukyu.jpg";
import ryu from "../assets/live/ryu.jpg";
import shinkyo from "../assets/live/shinkyo.jpg";
import shinsei from "../assets/live/shinsei.jpg";
import taiso from "../assets/live/taiso.jpg";
import todoroki from "../assets/live/todoroki.jpg";
import todos from "../assets/live/todos.jpg";
import yesBand from "../assets/live/yes-band.jpg";

export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: [
        cintia,
        edson,
        joe,
        apresentador,
        theFriends,
        karen,
        acal,
        awadori,
        daiko,
        dalanBueno,
        filantropia,
        imigracao,
        ishida,
        kokoro,
        nakase,
        oshiman,
        pescadores,
        ryukyu,
        ryu,
        shinkyo,
        shinsei,
        taiso,
        todoroki,
        todos,
        yesBand,
      ],
    };
  },
};
</script>
<style scoped>
.description {
  color: #fefefe;
  font-size: 28px;
}
.temp{
    margin-bottom: 100px;
}
</style>