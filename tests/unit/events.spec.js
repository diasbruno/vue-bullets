/* global jest, describe, expect, it */

import Vue from "vue";
import { mount } from "@vue/test-utils";
import Selection from "@/strategies/selection";
import Bullets from "@/Bullets.vue";


export const mountFullVue = (props = {}, options = {}) => {
  const vue = new Vue({
    render: createEl => createEl('Bullets', {
      ref: 'bullets',
      props: { ...props },
      ...options
    }),
    components: { Bullets },
  });
  return {
    vue,
    instance: vue.$mount().$refs.bullets
  };
};

const checkActiveBullets = bullets => bullets.map(
  b => b.classList.contains('bullet-active')
);

const clickOnBullet = async (vue, bullet) => {
  bullet.dispatchEvent(new MouseEvent('click'));
  return vue.$nextTick();
};

const findBullets = instance => Array.from(
  instance.$el.querySelectorAll('.bullet-item')
);

describe("strategies", () => {
  describe("OneAtTime", () => {
    it("handle 'changed' event.", async () => {
      const changed = jest.fn();

      const { vue, instance } = mountFullVue({
        list: [1, 2],
      }, {
        on: { changed }
      });

      await vue.$nextTick();

      const bullets = findBullets(instance);

      expect(checkActiveBullets(bullets)).toEqual([false, false]);

      await clickOnBullet(vue, bullets[0]);

      expect(checkActiveBullets(bullets)).toEqual([true, false]);
      expect(changed).toHaveBeenCalledWith({ index: 1, all: [1] });

      await clickOnBullet(vue, bullets[1]);

      expect(checkActiveBullets(bullets)).toEqual([false, true]);
      expect(changed).toHaveBeenCalledWith({ index: 2, all: [2] });
    });
  });

  describe("Selection", () => {
    it("handle 'added' and 'remove' event.", async () => {
      const added = jest.fn();
      const removed = jest.fn();

      const { vue, instance } = mountFullVue({
        list: [1, 2],
        strategy: Selection
      }, {
        on: { added, removed }
      });

      await vue.$nextTick();

      const bullets = findBullets(instance);

      expect(checkActiveBullets(bullets)).toEqual([false, false]);

      // selecting the first

      await clickOnBullet(vue, bullets[0]);

      expect(checkActiveBullets(bullets)).toEqual([true, false]);
      expect(added).toHaveBeenCalledWith({ index: 1, all: [1] });

      // deselecting the first

      await clickOnBullet(vue, bullets[0]);

      expect(checkActiveBullets(bullets)).toEqual([false, false]);
      expect(removed).toHaveBeenCalledWith({ index: 1, all: [] });

      // selecting both

      await clickOnBullet(vue, bullets[0]);

      expect(checkActiveBullets(bullets)).toEqual([true, false]);

      await clickOnBullet(vue, bullets[1]);

      expect(checkActiveBullets(bullets)).toEqual([true, true]);
      expect(added).toHaveBeenCalledWith({ index: 2, all: [1, 2] });
    });
  });
});
