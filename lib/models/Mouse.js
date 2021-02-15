const pool = require("../utils/pool");

module.exports = class Mouse {

    id;
    name;
    fur_color;
    tail_length;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.furColor = row.fur_color;
      this.tailLength = row.tail_length;
    }

    static async insert({ name, furColor, tailLength }) {
      const { rows } = await pool.query(
        'INSERT INTO mice (name, fur_color, tail_length) VALUES ($1, $2, $3) RETURNING *',
        [name, furColor, tailLength]
      );

      return new Mouse(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM mice'
      );

      return rows.map(row => new Mouse(row));
    }
};
