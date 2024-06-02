import PhoneDisplay from "./PhoneDisplay";
import TableComponent from "./TableComponent";
import "./Container.css";
import { Organization, Phone, User } from "./types";

interface ContainerProps {
  phones: Phone[] | undefined;
  users: User[] | undefined;
  selectedOrganization: Organization;
  handleCreateUser: (users: User) => void;
  handleDeleteUser: (users: User) => void;
  handleUpdatePhones: (updatedPhone: Phone) => void;
}

export default function Container({
  phones,
  users,
  selectedOrganization,
  handleCreateUser,
  handleUpdatePhones,
  handleDeleteUser,
}: ContainerProps) {
  return (
    <div className="content">
      <div className="content">
        <div className="TableComponent">
          <TableComponent users={users} handleDeleteUser={handleDeleteUser} />
        </div>
        <div className="PhoneDisplay">
          <PhoneDisplay
            phones={Array.isArray(phones) ? phones : []}
            selectedOrganization={selectedOrganization}
            handleCreateUser={handleCreateUser}
            handleUpdatePhones={handleUpdatePhones}
          />
        </div>
      </div>
    </div>
  );
}
