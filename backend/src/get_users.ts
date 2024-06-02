import connection from "./server";

export const getUsers = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE organization_id=?";
    connection.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
