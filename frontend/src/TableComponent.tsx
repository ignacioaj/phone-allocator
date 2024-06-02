import DataTable, { TableColumn } from "react-data-table-component";
import { useState } from "react";
import "./TableComponent.css";
import { User } from "./types";
import ModalDelete from "./ModalDelete";

interface TableComponentProps {
  users: User[] | undefined;
  handleDeleteUser: (users: User) => void;
}

const columns: TableColumn<User>[] = [
  {
    name: "ID/Passport",
    selector: (row: User) => row.id.toString(),
    sortable: true,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row: User) => row.name.toString(),
    sortable: true,
    width: "200px",
  },
  {
    name: "Surname",
    selector: (row: User) => row.surname,
    sortable: true,
    width: "200px",
  },
  {
    name: "Phone",
    selector: (row: User) => row.phone_id?.toString() || "",
    sortable: true,
    width: "150px",
  },
];

export default function TableComponent({
  users,
  handleDeleteUser,
}: TableComponentProps) {
  const [selectedRow, setSelectedRow] = useState<User | undefined>(undefined);

  const handleModal = (user: User | undefined) => {
    user ? setSelectedRow(user) : setSelectedRow(undefined);
  };

  return (
    <div className="table-component">
      {selectedRow && (
        <ModalDelete
          selectedUser={selectedRow}
          setIsOpen={handleModal}
          handleDeleteUser={handleDeleteUser}
        />
      )}
      <div className="table-wrapper">
        <DataTable
          title="Users"
          columns={columns}
          data={Array.isArray(users) ? users : []} // Ensure data is always an array
          pagination
          paginationPerPage={4}
          paginationRowsPerPageOptions={[4]}
          onRowClicked={(row) => {
            setSelectedRow(row);
          }}
          customStyles={{
            pagination: {
              style: {
                position: "fixed",
                bottom: "8%",
                width: "55%",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
