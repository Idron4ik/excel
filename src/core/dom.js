class Dom {
  constructor (selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html (html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  on (eventType, fn) {
    this.$el.addEventListener(eventType, fn);
  }

  off (eventType, fn) {
    this.$el.removeEventListener(eventType, fn);
  }

  clear () {
    this.html('');
    return this;
  }

  append (node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    this.$el.append(node);
    return this;
  }
}

export function $ (selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
