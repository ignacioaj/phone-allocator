import connection from "./server";

export const getOrganizations = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM organizations";
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
