<template>
  <v-container class="content">
    <v-content>
      <Live />
      <Delivery />
    </v-content>
  </v-container>
</template>

<script>
import Live from "./Live";
import Delivery from "./Delivery";

export default {
  name: "Main",

  components: {
    Delivery,
    Live,
  },
  data: () => ({
    content: "live",
  }),
  methods: {
    changeContent(data) {
      this.content = data;
    },
  },
};
</script>
<style scoped>
.dButton {
  margin-left: 30px;
}
.live {
  width: 100%;
  margin: 0 auto 50px auto;
}
.delivery {
  width: 100%;
  margin: 0 auto 50px auto;
}
.content {
  width: 100%;
  margin: 0 auto;
  background: #323033;
}
</style>
