<template>
<div id="loginBox">
  <form @submit="login" autocomplete="off">
  <input
    type="text" 
    class = "id_field"
    v-model="id"
    v-on:keyup = "input"
    placeholder="id:"
    name="id" 
    id = "id_field"
    required
  />
  <label class="id_label" for="id">id:</label>
  <input 
    type="submit" 
    value="login" 
    class="btn"
  />
  </form>
</div>
</template>


<script>
// let themeSelect = "default"
// let themeRoot = "@/assets/styles/_color_"+ themeSelect + ".scss";



export default {
  name:"LoginBox",
  data() { return {
    id: '',
    test: []
  }},
  methods: {
    login(e) {
      e.preventDefault();

      // let pack = {
      //   method: 'POST',
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify({ id: this.id })
      // };
      // let request = await fetch('/api/students', pack);
      // let response = await request.json();
      // console.log(response);


      this.$http.get('/api/students')
      .then((response) => {
        this.test = response.data
      })


      // let res = await fetch('/api/students')
      // let commits = await res.json();
      // console.log(commits);





      console.log(this.id);




      // SEND TO PARENT
      // this.$emit('add-todo', newTodo);
      
      this.id = ''; // clear
    },
    input() {
      console.log(this.id);
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/styles/_color_default.scss";

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

    font-family: 'Space Mono';
    color: inherit;
    font-size: 23px;
    cursor: text;

    &::placeholder {
    color: transparent;
    }
    &:placeholder-shown 
    ~ .id_label {
    top: 480px;
    font-size: 24px;
    cursor: text;
    }
    &:placeholder-shown 
    ~ .btn {
      color: $i70;
      background-color: $i90;
      pointer-events: none;
      outline: 0;
    }
  }

  .id_label {
  position: absolute;
  top: 462px;
  font-size: 15px;
  display: block;
  transition: 0.2s;
  }

  .id_field:focus {
  ~ .id_label {
    position: absolute;
    top: 462px;
    font-size: 15px;
    display: block;
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
    color: $i30;
    background-color: $accent01;
  }
  .btn:hover {
    color: $i100;
    background-color: $accent02;
    outline: 0;
  }


</style>