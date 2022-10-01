class MaxList extends Array {
  constructor(maxLength = Infinity, items = []) {
    super(...items);
    Object.defineProperty(this, 'max', { value: maxLength });
  }

  isEmpty() {
    return this.length === 0;
  }

  add() {
    this.push(...arguments);
  }

  push() {
    const del = this.length + 1 >= this.max ? this.length + 1 - this.max : 0;

    if (del) this.splice(0, del);

    super.push(...arguments);
  }
}

module.exports = {
  MaxList
}
