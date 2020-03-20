export default {
  create(defaultItems) {
    return new Set(defaultItems ? defaultItems : []);
  },
  has(state, index) {
    return state.has(index);
  },
  run(state, i) {
    const op = state.has(i) ? 'delete' : 'add';
    state[op](i);
    return [new Set(state), op == 'add' ? 'added' : 'removed'];
  }
};
