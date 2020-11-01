export class DomListener {
  constructor ($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners () {
    this.listeners.forEach(listener => {
      if (listener.jsEvent && listener.fn) {
        this[listener.fn] = this[listener.fn].bind(this);

        this.$root.on(listener.jsEvent, this[listener.fn]);
      } else {
        throw new Error(`Methods "${listener.fn || listener.jsEvent}" is not implemented in ${this.name ||
        this.constructor.name} component`);
      }
    });
  }

  removeDOMListeners () {
    this.listeners.forEach((listener) => this.$root.off(listener.jsEvent, this[listener.fn]));
  }
}
