<template>
  <div class="door-index">
    <inform />
    <div class="data">
      <collect />
      <histogram />
    </div>
    <div class="news">
      <news />
    </div>
    <div class="policy">
      <policy />
    </div>
    <div class="bulletin">
      <bulletin />
    </div>
  </div>
</template>

<script>
import { inform, collect, news, policy, bulletin, histogram } from "./components";
export default {
  name: "DoorIndex",
  components: {
    inform,
    collect,
    news,
    policy,
    bulletin,
    histogram
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.data {
  display: flex;
  background-color: #F7F7F6;
}
</style>
