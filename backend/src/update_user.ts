import connection from "./server";
import { User } from "./types";

export const updateUser = async (user: User): Promise<any> => {
  const { id, ...changes } = user;
  return new Promise((resolve, reject) => {
    const { name, surname, phone_id } = changes;
    const query = `INSERT INTO usuarios (name, surname, phone_id) VALUES (?, ?, ?)`;
    connection.query(query, [name, surname, phone_id, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
