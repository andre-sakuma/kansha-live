<template>
  <v-container>
    <v-img />
    <span> item name </span>
    <span> R$15,00 </span>
    <v-btn color="success">Adicionar</v-btn>
    <v-btn color="error">Remover</v-btn>
    <span>Quantidade</span>
    <span>0</span>
  </v-container>
</template>

<script>
  export default {
    name: "Main",

    data: () => ({}),
  };
</script>
