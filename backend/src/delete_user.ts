import connection from "./server";

export const deleteUser = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const queryDeleteUserFromPhones =
      "UPDATE phones SET user_id = NULL WHERE (user_id=?);";
    const queryDeleteUser = "DELETE FROM users WHERE id =?";

    connection.query(queryDeleteUserFromPhones, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });

    connection.query(queryDeleteUser, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
