<template>
  <div class="flex-center">
    <div class="main-menu">
      <div>
        <h1>Welcome to Animal Crossing New Horizon's Guide!</h1>
        <h4>Here you can find a guide for bugs and fishes</h4>
      </div>
      <div class="flex-button">
        <router-link :to="'/Bugs'">
          <button class="button1">Go to Bugs</button>
        </router-link>
        <router-link :to="'/Fish'">
          <button class="button1">Go to Fish</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  text-align: center;
}
a {
  margin: 5px 10px;
}
.flex-center {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url("https://i.redd.it/y5mzeig307b41.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.flex-button {
  display: flex;
  justify-content: center;
  margin: 15px;
  align-items: center;
}
.main-menu {
  border: 1px solid grey;
  background-color: rgba(184, 223, 184, 0.8);
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  border-radius: 1em;
  transition: all 0.3s ease;
}
.main-menu:hover {
  background-color: rgb(137, 194, 137);
}
button.button1 {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  border-radius: 1em;
  background-color: #70ec5f;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
}

button.button1:hover {
  color: #000000;
  background-color: #55aa55;
}
</style>