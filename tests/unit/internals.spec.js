/* global describe, expect, it */

import { mount } from "@vue/test-utils";
import OneAtTime from "@/strategies/oneAtTime";
import Bullets from "@/Bullets.vue";

describe("Bullets.vue", () => {
  it("default component data.", () => {
    const data = Bullets.data();
    expect(data).toEqual({
      _strategy: null,
      state: null
    });
  });

  const checkDefault = prop => {
    const wrapper = mount(Bullets);
    return wrapper.props(prop);
  };

  it("default strategy is one_at_time.", async () => {
    expect(checkDefault('strategy')).toEqual(OneAtTime);
  });

  it("default direction is horizontal.", async () => {
    expect(checkDefault('direction')).toEqual("h");
  });

  it("default default-items is empty array.", async () => {
    expect(checkDefault('defaultItems')).toEqual([]);
  });

  it("default bulletClass is empty string.", async () => {
    expect(checkDefault('bulletClass')).toEqual("");
  });

  it("initialize default strategy.", () => {
    const wrapper = mount(Bullets);
    expect(wrapper.vm._strategy).toBeTruthy();
    expect(wrapper.vm.state).toEqual([]);
  });
});
