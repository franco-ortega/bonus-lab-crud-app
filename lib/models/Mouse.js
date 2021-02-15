module.exports = class Mouse {

    id;
    name;
    fur_color;
    tail_length;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.fur_color = row.fur_color;
      this.tail_length = row.tail_length;
    }
};
