<template>
  <div class="container">
    <div class="select-flower">
      <select v-model="flower_type" class="button1">
        <option :value="type" v-for="type in types" :key="type">
          {{
          type
          }}
        </option>
      </select>
      <span>{{flower_type}}</span>
      <div class="flex-link">
        <router-link :to="'/Fish'">
          <img src="../assets/fish.png" alt="fish-img" class="fish-img" />
        </router-link>
        <router-link :to="'/bugs'">
          <img src="../assets/bug.png" alt="bug-img" class="bug-img" />
        </router-link>
      </div>
    </div>
    <p class="info">Drag the {{flower_type}} into the boxes below</p>
    <div class="box-flex">
      <div class="box-flex-width">
        <div class="box" @dragover.prevent @drop="drop" id="box-1" :class="box1">
          <p v-if="box1 == '' ">Drop the flowers here</p>
        </div>
        <span>+</span>
        <div class="box" @dragover.prevent @drop="drop2" id="box-2" :class="box2">
          <p v-if="box2 == '' ">Drop the flowers here</p>
        </div>
        <span>=</span>
        <div
          v-if="box3 == 'Windflowers-hybrid-red'
           && (box1 == ('Windflowers-pink' ||  'Windflowers-blue') 
           || box2 == ('Windflowers-pink' ||  'Windflowers-blue'))"
        >
          <div class="box Windflowers-hybrid-pink"></div>
          <p>Chance: {{chance2}}%</p>
        </div>
        <div v-if="box3 == 'Roses-black-pink'">
          <div class="box Roses-pink"></div>
          <p>Chance: {{chance2}}%</p>
        </div>
        <div v-if="box3 == 'Mums-green-purple'">
          <div class="box Mums-green"></div>
          <p>Chance: {{chance2}}%</p>
        </div>
        <div v-if="box3 == 'Lilies-black-pink'">
          <div class="box Lilies-pink"></div>
          <p>Chance: {{chance2}}%</p>
        </div>
        <div>
          <div class="box" id="box-3" :class="box3"></div>
          <p v-if="chance != null">Chance: {{chance}}%</p>
        </div>
      </div>
    </div>
    <div v-for="(flower, i) in flowers" :key="i" class="flex-width">
      <div v-if="flower_type == flower.type">
        <div class="flower-container">
          <div v-for="(color, j) in flower.colors" :key="j">
            <div
              class="background-size"
              :class="flower.type + '-' + color"
              :id="flower.type + '-' + color"
              :draggable="true"
              @dragstart="dragStart"
              @dragover.stop
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      //flowers
      flowers: [
        {
          type: "Windflowers",
          colors: [
            "red",
            "orange",
            "white",
            "purple",
            "blue",
            "pink",
            "hybrid-red",
            "hybrid-pink"
          ]
        },
        {
          type: "Roses",
          colors: [
            "red",
            "hybrid-red",
            "yellow",
            "orange",
            "black",
            "pink",
            "white",
            "purple",
            "blue",
            "gold"
          ]
        },
        {
          type: "Mums",
          colors: [
            "red",
            "yellow",
            "white",
            "hybrid-yellow",
            "pink",
            "purple",
            "hybrid-purple",
            "green"
          ]
        },
        {
          type: "Lilies",
          colors: ["red", "yellow", "orange", "black", "pink", "white"]
        },
        {
          type: "Pansies",
          colors: ["red", "yellow", "orange", "white", "blue", "purple"]
        },
        {
          type: "Hyacints",
          colors: ["red", "yellow", "white", "purple", "blue", "pink", "orange"]
        },
        {
          type: "Cosmos",
          colors: ["red", "yellow", "orange", "black", "pink", "white"]
        },
        {
          type: "Tulips",
          colors: [
            "red",
            "yellow",
            "orange",
            "black",
            "pink",
            "white",
            "purple"
          ]
        }
      ],
      types: [
        "Windflowers",
        "Roses",
        "Mums",
        "Lilies",
        "Pansies",
        "Hyacints",
        "Cosmos",
        "Tulips"
      ],
      //select option
      flower_type: "Windflowers",
      box1: "",
      box2: "",
      box3: "",
      chance: null,
      chance2: null
    };
  },

  methods: {
    dragStart(e) {
      let target = e.target;

      e.dataTransfer.setData("color_id", target.id);
      e.dataTransfer.setData("box_el", target);
    },
    drop(e) {
      this.box1 = e.dataTransfer.getData("color_id");

      //Cosmos
      if (
        (this.box1 == "Cosmos-red" && this.box2 == "Cosmos-yellow") ||
        (this.box1 == "Cosmos-yellow" && this.box2 == "Cosmos-red")
      ) {
        this.chance = 100;
        this.box3 = "Cosmos-orange";
      } else if (
        (this.box1 == "Cosmos-red" && this.box2 == "Cosmos-white") ||
        (this.box1 == "Cosmos-white" && this.box2 == "Cosmos-red")
      ) {
        this.chance = 100;
        this.box3 = "Cosmos-pink";
      } else if (this.box1 == "Cosmos-orange" && this.box2 == "Cosmos-orange") {
        this.chance = 6;
        this.box3 = "Cosmos-black";
      }
      //Windflowers
      else if (
        (this.box1 == "Windflowers-red" && this.box2 == "Windflowers-orange") ||
        (this.box1 == "Windflowers-orange" && this.box2 == "Windflowers-red")
      ) {
        this.chance = 100;
        this.box3 = "Windflowers-pink";
      } else if (
        this.box1 == "Windflowers-white" &&
        this.box2 == "Windflowers-white"
      ) {
        this.chance = 25;
        this.box3 = "Windflowers-blue";
      } else if (
        (this.box1 == "Windflowers-red" && this.box2 == "Windflowers-blue") ||
        (this.box1 == "Windflowers-blue" && this.box2 == "Windflowers-red")
      ) {
        this.chance = 100;
        this.box3 = "Windflowers-hybrid-red";
      } else if (
        (this.box1 == "Windflowers-pink" && this.box2 == "Windflowers-blue") ||
        (this.box1 == "Windflowers-blue" && this.box2 == "Windflowers-pink")
      ) {
        this.chance = 25;
        this.chance2 = 25;
        this.box3 = "Windflowers-hybrid-red";
      } else if (
        (this.box1 == "Windflowers-pink" && this.box2 == "Windflowers-blue") ||
        (this.box1 == "Windflowers-blue" && this.box2 == "Windflowers-pink")
      ) {
        this.chance = 25;
        this.box3 = "Windflowers-hybrid-pink";
      } else if (
        this.box1 == "Windflowers-hybrid-red" &&
        this.box2 == "Windflowers-hybrid-red"
      ) {
        this.chance = 6;
        this.box3 = "Windflowers-purple";
      } else if (
        (this.box1 == "Windflowers-hybrid-red" &&
          this.box2 == "Windflowers-hybrid-pink") ||
        (this.box1 == "Windflowers-hybrid-pink" &&
          this.box2 == "Windflowers-hybrid-red")
      ) {
        this.chance = 6;
        this.box3 = "Windflowers-purple";
      } else if (
        this.box1 == "Windflowers-hybrid-pink" &&
        this.box2 == "Windflowers-hybrid-pink"
      ) {
        this.chance = 6;
        this.box3 = "Windflowers-purple";
      }
      //Roses
      else if (
        (this.box1 == "Roses-red" && this.box2 == "Roses-yellow") ||
        (this.box1 == "Roses-yellow" && this.box2 == "Roses-red")
      ) {
        this.chance = 50;
        this.box3 = "Roses-orange";
      } else if (this.box1 == "Roses-red" && this.box2 == "Roses-red") {
        this.chance = 25;
        this.chance2 = 25;
        this.box3 = "Roses-black-pink";
      } else if (
        (this.box1 == "Roses-red" && this.box2 == "Roses-white") ||
        (this.box1 == "Roses-white" && this.box2 == "Roses-red")
      ) {
        this.chance = 50;
        this.box3 = "Roses-pink";
      } else if (this.box1 == "Roses-white" && this.box2 == "Roses-white") {
        this.chance = 25;
        this.box3 = "Roses-purple";
      } else if (
        (this.box1 == "Roses-black" && this.box2 == "Roses-yellow") ||
        (this.box1 == "Roses-yellow" && this.box2 == "Roses-black")
      ) {
        this.chance = 100;
        this.box3 = "Roses-orange";
      } else if (
        (this.box1 == "Roses-orange" && this.box2 == "Roses-purple") ||
        (this.box1 == "Roses-purple" && this.box2 == "Roses-orange")
      ) {
        this.chance = 25;
        this.box3 = "Roses-hybrid-red";
      } else if (
        this.box1 == "Roses-hybrid-red" &&
        this.box2 == "Roses-hybrid-red"
      ) {
        this.chance = 1.6;
        this.box3 = "Roses-blue";
      } else if (this.box1 == "Roses-black" && this.box2 == "Roses-black") {
        this.chance = "Unknown";
        this.box3 = "Roses-gold";
      }
      //Mums
      else if (
        (this.box1 == "Mums-red" && this.box2 == "Mums-white") ||
        (this.box1 == "Mums-white" && this.box2 == "Mums-red")
      ) {
        this.chance = 100;
        this.box3 = "Mums-pink";
      } else if (this.box1 == "Mums-white" && this.box2 == "Mums-white") {
        this.chance = 25;
        this.box3 = "Mums-purple";
      } else if (
        (this.box1 == "Mums-red" && this.box2 == "Mums-yellow") ||
        (this.box1 == "Mums-yellow" && this.box2 == "Mums-red")
      ) {
        this.chance = 100;
        this.box3 = "Mums-hybrid-yellow";
      } else if (
        this.box1 == "Mums-hybrid-yellow" &&
        this.box2 == "Mums-hybrid-yellow"
      ) {
        this.chance2 = 6;
        this.chance = 25;
        this.box3 = "Mums-green-purple";
      } else if (
        this.box1 == "Mums-hybrid-purple" &&
        this.box2 == "Mums-hybrid-purple"
      ) {
        this.chance = 25;
        this.box3 = "Mums-green";
      }
      //Lilies
      else if (
        (this.box1 == "Lilies-red" && this.box2 == "Lilies-yellow") ||
        (this.box1 == "Lilies-yellow" && this.box2 == "Lilies-red")
      ) {
        this.chance = 50;
        this.box3 = "Lilies-orange";
      } else if (this.box1 == "Lilies-red" && this.box2 == "Lilies-red") {
        this.chance2 = 25;
        this.chance = 25;
        this.box3 = "Lilies-black-pink";
      } else if (
        (this.box1 == "Lilies-red" && this.box2 == "Lilies-white") ||
        (this.box1 == "Lilies-white" && this.box2 == "Lilies-red")
      ) {
        this.chance = 50;
        this.box3 = "Lilies-pink";
      }
      //Pansies
      else if (
        (this.box1 == "Pansies-red" && this.box2 == "Pansies-yellow") ||
        (this.box1 == "Pansies-yellow" && this.box2 == "Pansies-red")
      ) {
        this.chance = 100;
        this.box3 = "Pansies-orange";
      } else if (this.box1 == "Pansies-white" && this.box2 == "Pansies-white") {
        this.chance = 25;
        this.box3 = "Pansies-blue";
      } else if (
        (this.box1 == "Pansies-red" && this.box2 == "Pansies-blue") ||
        (this.box1 == "Pansies-blue" && this.box2 == "Pansies-red")
      ) {
        this.chance = 100;
        this.box3 = "Pansies-red";
      } else if (this.box1 == "Pansies-red" && this.box2 == "Pansies-red") {
        this.chance = 6;
        this.box3 = "Pansies-purple";
      }
      //Hyacints
      else if (
        (this.box1 == "Hyacints-red" && this.box2 == "Hyacints-yellow") ||
        (this.box1 == "Hyacints-yellow" && this.box2 == "Hyacints-red")
      ) {
        this.chance = 50;
        this.box3 = "Hyacints-orange";
      } else if (
        (this.box1 == "Hyacints-red" && this.box2 == "Hyacints-white") ||
        (this.box1 == "Hyacints-white" && this.box2 == "Hyacints-red")
      ) {
        this.chance = 50;
        this.box3 = "Hyacints-pink";
      } else if (
        this.box1 == "Hyacints-white" &&
        this.box2 == "Hyacints-white"
      ) {
        this.chance = 25;
        this.box3 = "Hyacints-blue";
      } else if (
        this.box1 == "Hyacints-orange" &&
        this.box2 == "Hyacints-orange"
      ) {
        this.chance = 6;
        this.box3 = "Hyacints-purple";
      } else if (this.box1 == "Hyacints-blue" && this.box2 == "Hyacints-blue") {
        this.chance = 25;
        this.box3 = "Hyacints-purple";
      }
      //tulips
      else if (
        (this.box1 == "Tulips-red" && this.box2 == "Tulips-yellow") ||
        (this.box1 == "Tulips-yellow" && this.box2 == "Tulips-red")
      ) {
        this.chance = 50;
        this.box3 = "Tulips-orange";
      } else if (
        (this.box1 == "Tulips-red" && this.box2 == "Tulips-white") ||
        (this.box1 == "Tulips-white" && this.box2 == "Tulips-red")
      ) {
        this.chance = 25;
        this.box3 = "Tulips-pink";
      } else if (this.box1 == "Tulips-orange" && this.box2 == "Tulips-orange") {
        this.chance = 50;
        this.box3 = "Tulips-purple";
      } else if (this.box1 == "Tulips-red" && this.box2 == "Tulips-red") {
        this.chance = 12;
        this.box3 = "Tulips-black";
      } else {
        if (this.box1.length != 0 && this.box2.length != 0) {
          this.box3 = "flower404";
          this.chance = null;
        } else {
          this.box3 = "";
          this.chance = null;
        }
      }
    },
    drop2(e) {
      this.box2 = e.dataTransfer.getData("color_id");
      //Cosmos
      //Cosmos
      if (
        (this.box1 == "Cosmos-red" && this.box2 == "Cosmos-yellow") ||
        (this.box1 == "Cosmos-yellow" && this.box2 == "Cosmos-red")
      ) {
        this.chance = 100;
        this.box3 = "Cosmos-orange";
      } else if (
        (this.box1 == "Cosmos-red" && this.box2 == "Cosmos-white") ||
        (this.box1 == "Cosmos-white" && this.box2 == "Cosmos-red")
      ) {
        this.chance = 100;
        this.box3 = "Cosmos-pink";
      } else if (this.box1 == "Cosmos-orange" && this.box2 == "Cosmos-orange") {
        this.chance = 6;
        this.box3 = "Cosmos-black";
      }
      //Windflowers
      else if (
        (this.box1 == "Windflowers-red" && this.box2 == "Windflowers-orange") ||
        (this.box1 == "Windflowers-orange" && this.box2 == "Windflowers-red")
      ) {
        this.chance = 100;
        this.box3 = "Windflowers-pink";
      } else if (
        this.box1 == "Windflowers-white" &&
        this.box2 == "Windflowers-white"
      ) {
        this.chance = 25;
        this.box3 = "Windflowers-blue";
      } else if (
        (this.box1 == "Windflowers-red" && this.box2 == "Windflowers-blue") ||
        (this.box1 == "Windflowers-blue" && this.box2 == "Windflowers-red")
      ) {
        this.chance = 100;
        this.box3 = "Windflowers-hybrid-red";
      } else if (
        (this.box1 == "Windflowers-pink" && this.box2 == "Windflowers-blue") ||
        (this.box1 == "Windflowers-blue" && this.box2 == "Windflowers-pink")
      ) {
        this.chance = 25;
        this.chance2 = 25;
        this.box3 = "Windflowers-hybrid-red";
      } else if (
        (this.box1 == "Windflowers-pink" && this.box2 == "Windflowers-blue") ||
        (this.box1 == "Windflowers-blue" && this.box2 == "Windflowers-pink")
      ) {
        this.chance = 25;
        this.box3 = "Windflowers-hybrid-pink";
      } else if (
        this.box1 == "Windflowers-hybrid-red" &&
        this.box2 == "Windflowers-hybrid-red"
      ) {
        this.chance = 6;
        this.box3 = "Windflowers-purple";
      } else if (
        (this.box1 == "Windflowers-hybrid-red" &&
          this.box2 == "Windflowers-hybrid-pink") ||
        (this.box1 == "Windflowers-hybrid-pink" &&
          this.box2 == "Windflowers-hybrid-red")
      ) {
        this.chance = 6;
        this.box3 = "Windflowers-purple";
      } else if (
        this.box1 == "Windflowers-hybrid-pink" &&
        this.box2 == "Windflowers-hybrid-pink"
      ) {
        this.chance = 6;
        this.box3 = "Windflowers-purple";
      }
      //Roses
      else if (
        (this.box1 == "Roses-red" && this.box2 == "Roses-yellow") ||
        (this.box1 == "Roses-yellow" && this.box2 == "Roses-red")
      ) {
        this.chance = 50;
        this.box3 = "Roses-orange";
      } else if (this.box1 == "Roses-red" && this.box2 == "Roses-red") {
        this.chance = 25;
        this.chance2 = 25;
        this.box3 = "Roses-black-pink";
      } else if (
        (this.box1 == "Roses-red" && this.box2 == "Roses-white") ||
        (this.box1 == "Roses-white" && this.box2 == "Roses-red")
      ) {
        this.chance = 50;
        this.box3 = "Roses-pink";
      } else if (this.box1 == "Roses-white" && this.box2 == "Roses-white") {
        this.chance = 25;
        this.box3 = "Roses-purple";
      } else if (
        (this.box1 == "Roses-black" && this.box2 == "Roses-yellow") ||
        (this.box1 == "Roses-yellow" && this.box2 == "Roses-black")
      ) {
        this.chance = 100;
        this.box3 = "Roses-orange";
      } else if (
        (this.box1 == "Roses-orange" && this.box2 == "Roses-purple") ||
        (this.box1 == "Roses-purple" && this.box2 == "Roses-orange")
      ) {
        this.chance = 25;
        this.box3 = "Roses-hybrid-red";
      } else if (
        this.box1 == "Roses-hybrid-red" &&
        this.box2 == "Roses-hybrid-red"
      ) {
        this.chance = 1.6;
        this.box3 = "Roses-blue";
      } else if (this.box1 == "Roses-black" && this.box2 == "Roses-black") {
        this.chance = "Unknown";
        this.box3 = "Roses-gold";
      }
      //Mums
      else if (
        (this.box1 == "Mums-red" && this.box2 == "Mums-white") ||
        (this.box1 == "Mums-white" && this.box2 == "Mums-red")
      ) {
        this.chance = 100;
        this.box3 = "Mums-pink";
      } else if (this.box1 == "Mums-white" && this.box2 == "Mums-white") {
        this.chance = 25;
        this.box3 = "Mums-purple";
      } else if (
        (this.box1 == "Mums-red" && this.box2 == "Mums-yellow") ||
        (this.box1 == "Mums-yellow" && this.box2 == "Mums-red")
      ) {
        this.chance = 100;
        this.box3 = "Mums-hybrid-yellow";
      } else if (
        this.box1 == "Mums-hybrid-yellow" &&
        this.box2 == "Mums-hybrid-yellow"
      ) {
        this.chance2 = 6;
        this.chance = 25;
        this.box3 = "Mums-green-purple";
      } else if (
        this.box1 == "Mums-hybrid-purple" &&
        this.box2 == "Mums-hybrid-purple"
      ) {
        this.chance = 25;
        this.box3 = "Mums-green";
      }
      //Lilies
      else if (
        (this.box1 == "Lilies-red" && this.box2 == "Lilies-yellow") ||
        (this.box1 == "Lilies-yellow" && this.box2 == "Lilies-red")
      ) {
        this.chance = 50;
        this.box3 = "Lilies-orange";
      } else if (this.box1 == "Lilies-red" && this.box2 == "Lilies-red") {
        this.chance2 = 25;
        this.chance = 25;
        this.box3 = "Lilies-black-pink";
      } else if (
        (this.box1 == "Lilies-red" && this.box2 == "Lilies-white") ||
        (this.box1 == "Lilies-white" && this.box2 == "Lilies-red")
      ) {
        this.chance = 50;
        this.box3 = "Lilies-pink";
      }
      //Pansies
      else if (
        (this.box1 == "Pansies-red" && this.box2 == "Pansies-yellow") ||
        (this.box1 == "Pansies-yellow" && this.box2 == "Pansies-red")
      ) {
        this.chance = 100;
        this.box3 = "Pansies-orange";
      } else if (this.box1 == "Pansies-white" && this.box2 == "Pansies-white") {
        this.chance = 25;
        this.box3 = "Pansies-blue";
      } else if (
        (this.box1 == "Pansies-red" && this.box2 == "Pansies-blue") ||
        (this.box1 == "Pansies-blue" && this.box2 == "Pansies-red")
      ) {
        this.chance = 100;
        this.box3 = "Pansies-red";
      } else if (this.box1 == "Pansies-red" && this.box2 == "Pansies-red") {
        this.chance = 6;
        this.box3 = "Pansies-purple";
      }
      //Hyacints
      else if (
        (this.box1 == "Hyacints-red" && this.box2 == "Hyacints-yellow") ||
        (this.box1 == "Hyacints-yellow" && this.box2 == "Hyacints-red")
      ) {
        this.chance = 50;
        this.box3 = "Hyacints-orange";
      } else if (
        (this.box1 == "Hyacints-red" && this.box2 == "Hyacints-white") ||
        (this.box1 == "Hyacints-white" && this.box2 == "Hyacints-red")
      ) {
        this.chance = 50;
        this.box3 = "Hyacints-pink";
      } else if (
        this.box1 == "Hyacints-white" &&
        this.box2 == "Hyacints-white"
      ) {
        this.chance = 25;
        this.box3 = "Hyacints-blue";
      } else if (
        this.box1 == "Hyacints-orange" &&
        this.box2 == "Hyacints-orange"
      ) {
        this.chance = 6;
        this.box3 = "Hyacints-purple";
      } else if (this.box1 == "Hyacints-blue" && this.box2 == "Hyacints-blue") {
        this.chance = 25;
        this.box3 = "Hyacints-purple";
      }
      //tulips
      else if (
        (this.box1 == "Tulips-red" && this.box2 == "Tulips-yellow") ||
        (this.box1 == "Tulips-yellow" && this.box2 == "Tulips-red")
      ) {
        this.chance = 50;
        this.box3 = "Tulips-orange";
      } else if (
        (this.box1 == "Tulips-red" && this.box2 == "Tulips-white") ||
        (this.box1 == "Tulips-white" && this.box2 == "Tulips-red")
      ) {
        this.chance = 25;
        this.box3 = "Tulips-pink";
      } else if (this.box1 == "Tulips-orange" && this.box2 == "Tulips-orange") {
        this.chance = 50;
        this.box3 = "Tulips-purple";
      } else if (this.box1 == "Tulips-red" && this.box2 == "Tulips-red") {
        this.chance = 12;
        this.box3 = "Tulips-black";
      } else {
        if (this.box1.length != 0 && this.box2.length != 0) {
          this.box3 = "flower404";
          this.chance = null;
        } else {
          this.box3 = "";
          this.chance = null;
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #ecefd6;
}
.flex-link {
  display: flex;
  justify-content: space-evenly;
  width: 10%;
  align-items: center;
}
.fish-img,
.bug-img {
  width: 50px;
}

span,
.info {
  text-align: center;
  font-size: 40px;
}
.info {
  background-color: #5adbc5;
  width: 75%;
  margin: auto;
  height: 6%;
}
.select-flower {
  display: flex;
  justify-content: space-evenly;
  height: 20%;
  align-items: center;
  background-color: #5adbc5;
  width: 75%;
  margin: auto;
}
.button1 {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  background-color: rgb(207, 206, 206, 0.5);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
}
.button1:hover {
  background-color: rgb(207, 206, 206, 0.3);
}
.flex-width {
  display: flex;
  justify-content: space-evenly;
}
.flex-width > div {
  width: 70%;
}
.box-flex,
.box-flex-width {
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.box-flex-width {
  width: 50%;
}
.box,
.box-1,
.box-2 {
  width: 110px;
  height: 110px;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.6);
  text-align: center;
  display: flex;
  align-items: center;
  color: grey;
}
.flower-container {
  display: flex;
  justify-content: space-around;
}
.background-size {
  width: 110px;
  height: 110px;
  border: 2px solid black;
  cursor: move;
  background-color: rgba(255, 255, 255, 0.6);
}

.flower404 {
  background-image: url("../assets/flower404.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*cosmos*/
.Cosmos-red {
  background-image: url("../assets/Cosmos-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Cosmos-white {
  background-image: url("../assets/Cosmos-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Cosmos-yellow {
  background-image: url("../assets/Cosmos-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Cosmos-pink {
  background-image: url("../assets/Cosmos-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Cosmos-black {
  background-image: url("../assets/Cosmos-black.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Cosmos-orange {
  background-image: url("../assets/Cosmos-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/* windflowers*/
.Windflowers-red {
  background-image: url("../assets/Windflowers-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-orange {
  background-image: url("../assets/Windflowers-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-white {
  background-image: url("../assets/Windflowers-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-blue {
  background-image: url("../assets/Windflowers-blue.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-pink {
  background-image: url("../assets/Windflowers-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-hybrid-red {
  background-image: url("../assets/Windflowers-hybridred.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-hybrid-pink {
  background-image: url("../assets/Windflowers-hybridpink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Windflowers-purple {
  background-image: url("../assets/Windflowers-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*Roses*/
.Roses-red {
  background-image: url("../assets/Roses-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-orange {
  background-image: url("../assets/Roses-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-yellow {
  background-image: url("../assets/Roses-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-white {
  background-image: url("../assets/Roses-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-blue {
  background-image: url("../assets/Roses-blue.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-pink {
  background-image: url("../assets/Roses-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-hybrid-red {
  background-image: url("../assets/Roses-hybridred.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-black {
  background-image: url("../assets/Roses-black.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-black-pink {
  background-image: url("../assets/Roses-black.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-purple {
  background-image: url("../assets/Roses-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Roses-gold {
  background-image: url("../assets/Roses-gold.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*Mums*/
.Mums-red {
  background-image: url("../assets/Mums-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.Mums-yellow {
  background-image: url("../assets/Mums-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Mums-white {
  background-image: url("../assets/Mums-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.Mums-pink {
  background-image: url("../assets/Mums-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.Mums-purple {
  background-image: url("../assets/Mums-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Mums-hybrid-yellow {
  background-image: url("../assets/Mums-hybridyellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Mums-green-purple {
  background-image: url("../assets/Mums-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Mums-hybrid-purple {
  background-image: url("../assets/Mums-hybridpurple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Mums-green {
  background-image: url("../assets/Mums-green.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*Lilies*/
.Lilies-red {
  background-image: url("../assets/Lilies-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Lilies-yellow {
  background-image: url("../assets/Lilies-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Lilies-orange {
  background-image: url("../assets/Lilies-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Lilies-black-pink {
  background-image: url("../assets/Lilies-black.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Lilies-black {
  background-image: url("../assets/Lilies-black.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Lilies-white {
  background-image: url("../assets/Lilies-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Lilies-pink {
  background-image: url("../assets/Lilies-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*Pansies*/
.Pansies-red {
  background-image: url("../assets/Pansy-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Pansies-yellow {
  background-image: url("../assets/Pansy-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Pansies-orange {
  background-image: url("../assets/Pansy-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Pansies-blue {
  background-image: url("../assets/Pansy-blue.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Pansies-white {
  background-image: url("../assets/Pansy-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Pansies-purple {
  background-image: url("../assets/Pansy-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*Hyacints*/
.Hyacints-red {
  background-image: url("../assets/Hyacint-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Hyacints-yellow {
  background-image: url("../assets/Hyacint-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Hyacints-orange {
  background-image: url("../assets/Hyacint-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Hyacints-blue {
  background-image: url("../assets/Hyacint-blue.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Hyacints-white {
  background-image: url("../assets/Hyacint-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Hyacints-purple {
  background-image: url("../assets/Hyacint-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Hyacints-pink {
  background-image: url("../assets/Hyacint-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
/*Tulips*/
.Tulips-red {
  background-image: url("../assets/Tulips-red.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Tulips-yellow {
  background-image: url("../assets/Tulips-yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Tulips-orange {
  background-image: url("../assets/Tulips-orange.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Tulips-black {
  background-image: url("../assets/Tulips-black.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Tulips-white {
  background-image: url("../assets/Tulips-white.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Tulips-purple {
  background-image: url("../assets/Tulips-purple.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.Tulips-pink {
  background-image: url("../assets/Tulips-pink.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
