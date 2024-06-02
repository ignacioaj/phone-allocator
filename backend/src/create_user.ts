import connection from "./server";
import { User } from "./types";

export const createUser = async (user: User): Promise<any> => {
  const { id, ...changes } = user;
  return new Promise((resolve, reject) => {
    const { name, surname, phone_id, organization_id } = changes;
    const query = `INSERT INTO users (id,name, surname, phone_id, organization_id) VALUES (?,?, ?, ?, ?)`;
    connection.query(
      query,
      [id, name, surname, phone_id, organization_id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};
