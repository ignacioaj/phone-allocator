import { useState } from "react";
import "./Header.css";
import { Organization } from "./types";
import DropdownOrganization from "./DropdownOrganization";

interface HeaderProps {
  organizations: Organization[] | undefined;
  setOrganization: (org: Organization) => void;
  selectedOrganization: Organization;
}

export default function Header({
  organizations,
  setOrganization,
  selectedOrganization,
}: HeaderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleMenu = (open: boolean) => {
    setIsOpenMenu(open);
  };

  return (
    <header className="header">
      <div className="left">Phone-Allocator</div>
      <div className="right">
        <p>Choose your organization </p>
        <DropdownOrganization
          organizations={organizations}
          selectedOrganization={selectedOrganization}
          isOpen={isOpenMenu}
          setIsOpen={handleMenu}
          setOrganization={setOrganization}
        />
      </div>
    </header>
  );
}
