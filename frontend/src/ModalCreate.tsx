import { useState, useEffect } from "react";
import { Organization, Phone, User } from "./types";
import { createUser, updatePhone } from "./services/serviceProvider";
import "./Modal.css";

interface ModalCreateProps {
  number: number;
  selectedOrganization: Organization;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleCreateUser: (newUser: User) => void;
  handleUpdatePhones: (updatedPhone: Phone) => void;
}

export default function ModalCreate({
  number,
  setIsOpen,
  selectedOrganization,
  handleUpdatePhones,
  handleCreateUser,
}: ModalCreateProps) {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isSubmissionEnabled, setSubmissionEnabled] = useState(false);

  const handleSubmitNewUser = async () => {
    const newUser = {
      id: id,
      name: name,
      surname: surname,
      organization_id: selectedOrganization.id,
      phone_id: number,
    };
    const newPhone = {
      phone_number: number,
      user_id: id,
    };
    try {
      const responseCreateUser = await createUser(newUser);
      const responseUpdatePhone = await updatePhone(newPhone);
      const [errCr] = responseCreateUser;
      const [errUpd] = responseUpdatePhone;
      if (errCr) {
        console.error("Error creating user:", errCr);

        return;
      }
      if (errUpd) {
        console.error("Error updating phone:", errUpd);

        return;
      }

      handleUpdatePhones(newPhone);
      handleCreateUser(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (id && name && surname) {
      setSubmissionEnabled(true);
    } else {
      setSubmissionEnabled(false);
    }
  }, [id, name, surname]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="number-paragraph">{number}</p>
        <p className="header-paragraph">
          To whom would you like to allocate the phone number?
        </p>

        <div className="form-group">
          <label>ID/Passport</label>
          <input
            type="number"
            placeholder="Enter ID/Passport"
            value={id}
            onChange={(e) => setId(parseInt(e.target.value))}
          />

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Surname</label>
          <input
            type="text"
            placeholder="Enter surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="button-wrapper">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <button
            onClick={async () => {
              await setIsOpen(false);
              await handleSubmitNewUser();
            }}
            disabled={!isSubmissionEnabled}
            className={!isSubmissionEnabled ? "button-disabled" : ""}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
