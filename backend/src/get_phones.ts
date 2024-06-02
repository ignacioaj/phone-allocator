import connection from "./server";

export const getPhones = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM phones WHERE organization_id=?";
    connection.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
