<template>
<div id="loginBox">
  
  <form @submit="login" autocomplete="off">
    <input
      type="text" 
      class = "id_field"
      v-model="id"
      placeholder="id:"
      name="id_field" 
      id = "id_field"
      ref="id_field"
      required
    />
    <input 
      type="submit" 
      value="login" 
      class="login-btn"
    />
    <label class="id_label" for="id_field">id:</label>
  </form>

</div>
</template>


<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name:"LoginBox",
  data() { return {
    id: null
  }},
  props: [],
  methods: {
    //___________AUTHORIZATION METHODS__________
    async login(e) { e.preventDefault();
                          this.id = '2018317024';
      const identity = {
        id: this.id,
        expiresIn: 10800,
        accessTime: new Date(),
        requestPoint: uuidv4()
      }
      this.$store.dispatch('LOGIN', identity);
    },
  },
  mounted() {
    this.$refs.id_field.focus();
  },
}
</script>


<style lang="scss" scoped> #loginBox {
// -----------------------------------
// -----------------------------------
  z-index: 10;
  width: 262px;
  height: 38px;
  color: inherit;
  border: 0px;
  border-bottom: 2px solid;
}

.id_field{
  display: block;

  padding: 0px;
  width: 100%;
  height: 100%;
  border: 0px;
  outline: 0;
  background: transparent;

  font-family: 'Space Mono', 'Nanum Square';
  color: inherit;
  font-size: 23px;
  cursor: text;

  &::placeholder {
  color: transparent;
  }
  &:placeholder-shown 
  ~ .id_label {
  position: relative;
  bottom: 61px;
  font-size: 24px;
  cursor: text;
  }
  &:placeholder-shown 
  ~ .login-btn {
    color: var(--i70);
    background-color: var(--i90);
    pointer-events: none;
    outline: 0;
  }
}

.id_label {
  display: -moz-popup;
  position: relative;
  bottom: 81px;
  font-size: 17px;
  transition: 0.2s;
}
.id_field:focus {
~ .id_label {
  position: relative;
  bottom: 81px;
  font-size: 17px;
  transition: 0.2s;
  }
}

.login-btn {
  display: block;
  width: 60px;
  height: 26px;

  position: relative;
  left: 202px;
  bottom: 29px;

  font-family: inherit;
  font-weight: 700;
  font-size: 13px;

  cursor: pointer;

  border: 0px;
  border-radius: 0px;
  outline: 0px;
  color: var(--accent00);
  background-color: var(--accent01);
}
.login-btn:hover {
  color: var(--accent00);
  background-color: var(--accent02);
}


</style>