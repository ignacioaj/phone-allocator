import { User } from "./types";
import { deleteUser } from "./services/serviceProvider";
import "./Modal.css";

interface ModalProps {
  selectedUser: User;
  setIsOpen: (anySelectedUser: User | undefined) => void;
  handleDeleteUser: (newUser: User) => void;
}

export default function Modal({
  setIsOpen,
  selectedUser,
  handleDeleteUser,
}: ModalProps) {
  const handleConfirmDeleteUser = async () => {
    try {
      const res = await deleteUser(selectedUser.id);
      const [err] = res;
      if (err) {
        console.error("Error deleting user:", err);

        return;
      } else {
        handleDeleteUser(selectedUser);
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      return;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="number-paragraph">{selectedUser.phone_id}</p>
        <p className="header-paragraph">
          Do you want to delete user and free the telephone number?
        </p>
        <p className="delete-item">
          {selectedUser.name} {selectedUser.surname} (ID: {selectedUser.id})
        </p>

        <div className="button-wrapper">
          <button onClick={() => setIsOpen(undefined)}>Cancel</button>
          <button
            onClick={async () => {
              await handleConfirmDeleteUser();
              setIsOpen(undefined);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
