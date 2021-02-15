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

    static async update(id, { name, furColor, tailLength }) {
      const { rows } = await pool.query(
        `UPDATE mice
          SET
            name=$1,
            fur_color=$2,
            tail_length=$3
          WHERE id=$4
          RETURNING *`,
        [name, furColor, tailLength, id]
      );
  
      if(!rows[0]) throw Error(`No mouse with id ${id} found to update.`);
      
      return new Mouse(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM mice where id=$1 RETURNING *',
        [id]
      );

      if(!rows[0]) throw Error(`No mouse with id ${id} found to delete.`);

      return new Mouse(rows[0]);
    }
};
