import connection from "./server";
import { Phone, User } from "./types";

export const updatePhones = async (phone: Phone): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { user_id, phone_number } = phone;
    const query = `UPDATE phones SET user_id = ? WHERE phone_number = ?`;
    connection.query(query, [user_id, phone_number], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
