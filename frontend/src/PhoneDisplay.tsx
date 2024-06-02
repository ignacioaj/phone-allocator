import Tag from "./Tag";
import "./PhoneDisplay.css";
import { Organization, Phone, User } from "./types";
import { useState } from "react";
import ModalCreate from "./ModalCreate";

interface PhoneDisplayProps {
  phones: Phone[] | undefined;
  selectedOrganization: Organization;
  handleCreateUser: (users: User) => void;
  handleUpdatePhones: (updatedPhone: Phone) => void;
}

export default function PhoneDisplay({
  phones = [],
  selectedOrganization,
  handleCreateUser,
  handleUpdatePhones,
}: PhoneDisplayProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  const handleSelectNumber = (phone: number) => {
    setSelectedNumber(phone);
  };

  const handleModal = (open: boolean) => {
    setIsOpenModal(open);
  };

  return (
    <div className="left-component">
      {isOpenModal && (
        <ModalCreate
          number={selectedNumber}
          isOpen={isOpenModal}
          setIsOpen={handleModal}
          selectedOrganization={selectedOrganization}
          handleCreateUser={handleCreateUser}
          handleUpdatePhones={handleUpdatePhones}
        />
      )}
      {phones
        ?.filter((phoneObject: Phone) => phoneObject.user_id == null)
        .map((phoneObject: Phone) => (
          <Tag
            key={phoneObject.phone_number}
            number={phoneObject.phone_number}
            handleSelectNumber={handleSelectNumber}
            handleClick={handleModal}
          />
        ))}
    </div>
  );
}
