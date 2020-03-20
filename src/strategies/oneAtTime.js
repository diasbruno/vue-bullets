export default {
  create(defaultItems) {
    return defaultItems || [];
  },
  has(state, index) {
    return state.includes(index);
  },
  run(state, i) {
    return [[i], 'changed'];
  }
};
