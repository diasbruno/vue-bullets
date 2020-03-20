<template>
  <div :class="bulletsClasses()">
    <div
      v-for="(item, index) in list"
      :key="index + 1"
      :class="bulletClasses(index + 1)"
      @click="mark(index + 1)">
    </div>
  </div>
</template>

<script>
import OneAtTime from "@/strategies/oneAtTime";

export default {
  name: "Bullets",
  props: {
    list: { type: Array },
    bulletClass: { type: String, default: "" },
    direction: { type: String, default: "h" },
    strategy: { type: Object, default: () => OneAtTime },
    defaultItems: { type: Array, default: () => [] }
  },
  data() {
    return { _strategy: null, state: null };
  },
  created() { this.init(); },
  methods: {
    init() {
      const st = this.strategy;
      this._strategy = st;
      this.state = st.create(this.defaultItems)
    },
    bulletsClasses() {
      return {
        "bullets": true,
        ["bullets-"+this.direction]: true
      }
    },
    bulletClasses(index) {
      return {
        "bullet-item": true,
        "bullet-active": this._strategy.has(this.state, index),
        [this.bulletClass]: !!this.bulletClass
      }
    },
    mark(index) {
      const [st, action] = this._strategy.run(this.state, index);
      this.state = st
      this.$emit(action, { index, all: Array.from(this.state) })
    },
    items() { return Array.from(this.state); }
  }
}
</script>
