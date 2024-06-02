import "./DropdownOrganization.css";
import { Organization } from "./types";

interface DropdownOrganizationProps {
  organizations: Organization[] | undefined;
  selectedOrganization: Organization;
  setOrganization: (org: Organization) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function DropdownOrganization({
  organizations,
  selectedOrganization,
  setOrganization,
  isOpen,
  setIsOpen,
}: DropdownOrganizationProps) {
  const handleOrganizationSelect = (org: Organization) => {
    setOrganization(org);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOrganization.name}
      </div>
      <div className={`dropdown-menu ${isOpen ? "active" : ""}`}>
        {organizations?.map((org) => (
          <div
            key={org.id}
            className="dropdown-item"
            onClick={() => handleOrganizationSelect(org)}
          >
            {org.name}
          </div>
        ))}
      </div>
    </div>
  );
}
