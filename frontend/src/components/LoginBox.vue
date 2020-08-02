<template>
<div id="loginBox">
  <form @submit="login" autocomplete="off">
  <input
    type="text" 
    class = "id_field"
    v-model="key"
    v-on:keyup = "input"
    placeholder="id:"
    name="id" 
    id = "id_field"
    required
  />
  <input 
    type="submit" 
    value="login" 
    class="btn"
  />
  <label class="id_label" for="id">id:</label>
  </form>
</div>
</template>


<script>




export default {
  name:"LoginBox",
  data() { return {
    msg: "Hello",
    key: '',
    authorized: false,
    testArr: [],
    test00: null
  }},
  methods: {
    async login(e) {
      e.preventDefault();
      this.heimdall(this.key);
    },
    input() {
      console.log(this.key);
    },
    heimdall(key) {
      // LOGIN 액션 실행
      this.$store.dispatch('LOGIN', {key})
      .then(() => this.doorOpened())
      .catch(({message}) => this.msg = message)
    },
    doorOpened(){
      this.$router.push('/students');
    }
  }
}
</script>


<style lang="scss" scoped>

  #loginBox {
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
    ~ .btn {
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

  .btn {
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
    outline: 0px;
    color: var(--i30);
    background-color: var(--accent01);
  }
  .btn:hover {
    color: var(--i100);
    background-color: var(--accent02);
  }


</style>