<template>
<div id="admin-menu">

<div class="menu" :class="{'menu-selected':(adminMenu==='index')}" @click="toggle('adminMenu', 'index')">개요</div>

<div class="menu" :class="{'menu-selected':(adminMenu==='db')}" @click="toggle('adminMenu', 'db')">DB 관리</div>

<div class="menu" :class="{'menu-selected':(adminMenu==='user')}" @click="toggle('adminMenu', 'user')">사용자 관리</div>

<div class="menu" :class="{'menu-selected':(adminMenu==='refg')}" @click="toggle('adminMenu', 'refg')">냉장고팩 관리</div>

</div>
</template>



<script>
export default {
  name: "AdminMenu",
  props: [

  ],
  data() { return {

  }},
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {
    
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 






</style>