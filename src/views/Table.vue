<template>
  <div v-if="getCollections || getMonths">
    <table>
      <thead>
        <th>Name</th>
        <th>Price</th>
        <th>Location</th>
        <th>Rarity</th>
        <th>Time</th>
        <th v-for="month in months" :key="month">{{month}}</th>
      </thead>
      <tbody>
        <tr v-for="(bug, i) in getCollections.bugs" :key="i">
          <td>{{bug.name}}</td>
          <td>
            {{bug.price}}
            <img src="../assets/BellBag.png" class="bell" />
          </td>
          <td>{{bug.location}}</td>
          <td>{{bug.rarity}}</td>
          <td>{{bug.time}}</td>
          <td v-for="(north, i) in bug.northern_hemisphere" :key="i">
            <p v-if="months[i]">X</p>
          </td>
        </tr>
      </tbody>
    </table>
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
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },
  methods: {
    ...mapActions(["getData"])
  },
  watch: {},
  computed: {
    ...mapGetters(["getCollections"])
  },
  created() {
    this.getData();
  }
};
</script>
 <style scoped>
th {
  text-align: start;
}
.bell {
  width: 15px;
  height: 15px;
}
</style>
