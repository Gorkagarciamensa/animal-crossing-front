<template>
  <div v-if="getCollections" class="background">
    <div class="burger" @click="showMediaNavBar()">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <nav id="header">
      <div class="flex-filters nav-links">
        <div class="input-flex">
          <input
            type="search"
            id="search"
            v-model="search"
            class="input-search"
            placeholder="Search"
          />
          <div class="div-background-icon"></div>
        </div>
        <button class="button1">
          <router-link :to="'/Fish'">
            <img src="../assets/fish.png" alt="fish-img" class="fish-img" />
          </router-link>
        </button>
        <button @click="toggle_hemisphere = !toggle_hemisphere" class="button1">
          <span v-if="toggle_hemisphere">North Hemisphere</span>
          <span v-else>South Hemisphere</span>
        </button>
        <div class="filter-width">
          <p
            @click="toggle_filters = !toggle_filters"
            class="filter-click"
            :class="toggle_filters ? 'background-filter-hidden' : ''"
          >Filter</p>
          <div
            class="filter-flex-center"
            :class="toggle_filters ? 'show-filter-animation' : '' "
            v-if="toggle_filters"
          >
            <div v-for="filter in filter_rarity" :key="filter">
              <input type="checkbox" :id="filter" v-model="filter_by_rarity" :value="filter" />
              <label :for="filter">
                <p>{{filter}}</p>
              </label>
            </div>
          </div>
          <div v-if="toggle_filters" class="flex-sort sort-click">
            <p class="span-sort">Sort:</p>
            <select v-model="sortBy" class="button1">
              <option v-for="sort in arraySortBy" :key="sort" :value="sort">{{sort}}</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex">
      <div class="card" v-for="(bug, i) in bugFilter" :key="i" :id="bug.name">
        <div class="container" @click="toggle_months = bug.id, hideMonths(bug)">
          <img :src="'/bugs/'+bug.name + '.png'" />
          <h5>
            <span v-if="toggle_hemisphere">North -</span>
            <span v-else>South -</span>
            {{bug.name.replace(/_/g, " ")}} - {{bug.price}}
            <img
              src="../assets/BellBag.png"
              alt="bell"
              class="bell"
            />
          </h5>
          <p>{{bug.rarity}}</p>
          <p>
            {{bug.location}} -
            {{bug.time}}
          </p>

          <div
            :id="'arrow' + bug.id"
            alt="arrow"
            :class=" toggle_months != bug.id ? 'arrow-down' : 'arrow-up'"
          ></div>
          <div
            class="flex"
            :id="bug.id"
            :class="toggle_months == bug.id ? 'not-hidden' : 'hidden'"
            v-if="toggle_hemisphere"
          >
            <p class="padding" v-for="(north, i) in bug.northern_hemisphere" :key="i">{{north}}</p>
          </div>
          <div
            class="flex"
            :id="bug.id"
            :class="toggle_months == bug.id ? 'not-hidden' : 'hidden'"
            v-else
          >
            <p class="padding" v-for="(south, i) in bug.southern_hemisphere" :key="i">{{south}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      toggle_hemisphere: true, //true is north, false is south
      toggle_filters: false,
      toggle_months: "", //open and close months
      search: "", //search a bug/fish
      //filters
      filter_rarity: ["Common", "Uncommon", "Rare", "Very Rare"],
      filter_by_rarity: [],
      //sorting
      arraySortBy: ["Name Asc", "Name Desc", "Price Down", "Price Up"],
      sortBy: "Name Asc"
    };
  },
  watch: {},
  methods: {
    ...mapActions(["getData"]),
    hideMonths(bug) {
      let bugEl = document.getElementById(bug.id);
      if (bugEl.classList.contains("not-hidden")) {
        this.toggle_months = "";
      }
    },
    showMediaNavBar() {
      const nav = document.querySelector(".nav-links");
      const translate = document.querySelector(".flex");
      nav.classList.toggle("nav-active");
    }
  },

  computed: {
    ...mapGetters(["getCollections"]),
    bugFilter() {
      let data_filter;
      if (this.filter_by_rarity.length == 0) {
        data_filter = this.getCollections.bugs.filter(bug => {
          let bugName = bug.name.replace(/_/g, " ").toLowerCase();
          return bugName.includes(this.search.toLowerCase());
        });

        if (this.sortBy == "Price Down") {
          data_filter = data_filter.sort((a, b) => a.price - b.price);
        }
        if (this.sortBy == "Price Up") {
          data_filter = data_filter.sort((a, b) => b.price - a.price);
        }
        if (this.sortBy == "Name Asc") {
          data_filter = data_filter.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        }
        if (this.sortBy == "Name Desc") {
          data_filter = data_filter.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        }

        return data_filter;
      }

      data_filter = this.getCollections.bugs
        .filter(bug => {
          let bugName = bug.name.replace(/_/g, " ").toLowerCase();
          return bugName.includes(this.search.toLowerCase());
        })
        .filter(bug => {
          return this.filter_by_rarity.includes(bug.rarity);
        });

      if (this.sortBy == "Price Down") {
        data_filter = data_filter.sort((a, b) => a.price - b.price);
      }
      if (this.sortBy == "Price Up") {
        data_filter = data_filter.sort((a, b) => b.price - a.price);
      }
      if (this.sortBy == "Name Asc") {
        data_filter = data_filter.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      if (this.sortBy == "Name Desc") {
        data_filter = data_filter.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      return data_filter;
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Ubuntu&display=swap");

.flex-width {
  display: flex;
  width: 50%;
}
.nav-flex {
  display: flex;
}
label {
  display: flex;
  height: 20px;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 75px;
  text-align: center;
  justify-content: center;
  cursor: pointer;
}
label:hover {
  background-color: rgb(231, 228, 228);
}

input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + label {
  background-color: #043804;
  color: white;
}
.background {
  background-color: #ecefd6;
  min-height: 100vh;
}
.background-search {
  background-color: #659365;
  display: flex;
  border: 1px solid #659365;
  border-radius: 5px;
}
.input-flex {
  display: flex;
  height: 50%;
  margin-top: 6px;
}
.input-search {
  border: 1px solid grey;
  padding: 5px;
  outline: none;
  background-color: #d0e6d0;
  width: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.input-search:focus {
  background-color: rgb(216, 243, 198);
}
.input-search:hover::placeholder {
  color: rgb(188, 204, 180);
}
.div-background-icon {
  background-image: url("../assets/nook.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 2vw;
  background-color: #659365;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

button.button1 {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  background-color: #70ec5f;
  border-radius: 1em;
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
.button1 > a {
  text-decoration: none;
  color: black;
}
.fish-img {
  width: 25px;
}

.filter-click,
.sort-click {
  border: 0.1em solid #ffffff;
  background-color: #70ec5f;
  width: 13%;
  border-radius: 30px;
  height: 100%;
}
.filter-click:hover {
  cursor: pointer;
  color: white;
  background-color: #55aa55;
}
.background-filter-hidden {
  background-color: #35e635;
}
.nav-links {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
}
.flex-filters {
  justify-content: space-around;
  position: sticky;
  top: 0;
  padding: 10px 0px;
  border-bottom: 1px solid black;
  background-color: #5adbc5;
  z-index: 1;
}
.filter-width {
  display: flex;
  width: 50%;
  align-items: center;
}

.flex,
.search-flex-center,
.filter-flex-center,
.filter-click {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.flex-sort,
.span-sort {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.flex-sort {
  width: 30%;
  animation: show 0.3s;
}
.search-flex-center,
.filter-flex-center {
  width: 25%;
  justify-content: space-evenly;
}
.show-filter-background {
  background-color: #55aa55;
}
.show-filter-animation {
  width: 45%;
  animation: show 0.3s;
}
@keyframes show {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 25%;
  text-align: center;
  margin: 10px;
  height: 100%;
  background-color: #f4fdf4;
  border-radius: 5px;
  border: 1px solid black;
}

.container {
  padding: 2px 16px;
}
.bell {
  width: 15px;
  height: 15px;
}
.arrow-down,
.arrow-up {
  background-image: url("../assets/arrow-down.png");
  background-size: cover;
  transform: rotate(0deg);
}

.arrow-down,
.arrow-up {
  width: 20px;
  height: 10px;
  cursor: pointer;
  margin-bottom: 5px;
}
.arrow-down {
  animation: turn-down 0.4s;
}
.arrow-up {
  animation: turn 0.4s;
  transform: rotate(180deg);
}

@keyframes turn {
  from {
    transform: rotate(0deg);
    width: 20px;
  }
  to {
    transform: rotate(180deg);
  }
}
@keyframes turn-down {
  from {
    transform: rotate(180deg);
    width: 20px;
  }
  to {
    transform: rotate(deg);
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.hidden {
  display: none;
}
.not-hidden {
  display: flex;
}

.padding {
  padding: 3px;
}
/* responsive nav bar */
.burger {
  display: none;
}
.burger div {
  width: 25px;
  height: 3px;
  background-color: green;
  margin: 5px;
}

@media screen and (min-width: 320px) {
  .nav-links {
    display: none;
  }
  .background {
    overflow-x: hidden;
  }

  .burger {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background-color: #5adbc5;
    padding: 5px;
  }
  .burger div {
    margin: 2px;
  }
  .filter-flex-center {
    display: grid;
    grid-template-columns: repeat(2, 0fr);
  }
  .search-flex-center {
    width: 100%;
  }
  .input-search {
    width: 80%;
  }
  .div-background-icon {
    width: 2rem;
  }
  .filter-width {
    width: 100%;
    height: 3rem;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 5px;
  }
  .filter-click {
    width: 3rem;
  }
  .flex-sort > p {
    display: none;
  }
  .card {
    width: 90%;
  }
}
@media screen and (min-width: 360px) {
  .filter-width {
    justify-content: space-evenly;
  }
}
@media screen and (min-width: 768px) {
  .card {
    width: 45%;
  }
}
@media screen and (min-width: 1024px) {
  .flex-filters {
    align-items: center;
  }
  .input-flex {
    margin-top: 0;
  }
  button.button1 {
    height: 2rem;
  }
  .filter-width {
    width: 50%;
    padding: 0;
    justify-content: space-between;
  }
  .show-filter-animation {
    width: 0;
    grid-gap: 5px;
  }
}
@media screen and (min-width: 1200px) {
  .flex-sort > p {
    display: block;
  }
  .burger {
    display: none;
  }
  .nav-links {
    display: flex;
  }
  .card {
    width: 20%;
  }
}
.nav-active {
  display: flex;
}
</style>