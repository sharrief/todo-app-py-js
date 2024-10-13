// @ts-check
const Utils = ({
  getEl(id) {
    return document.getElementById(id);
  },
  /**
   * 
   * @param {string} tag 
   * @returns {HTMLElement} element
   */
  el(tag) {
    return document.createElement(tag);
  },
  selectEl(el, selector) {
    return el.querySelector(selector)
  }
})