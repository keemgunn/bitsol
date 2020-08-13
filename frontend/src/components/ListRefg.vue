<template>
<div id="listrefg">
  {{record}}


</div>
</template>

<script>
export default {
  name: 'ListRefg',
  data() { return {

  }},
  props: [
    "record"
  ],
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss" scoped> #listrefg 
{
  display: block;
  width: 100%;
  height: 100px;

  overflow: auto;

  background-color: greenyellow;
}




</style>
