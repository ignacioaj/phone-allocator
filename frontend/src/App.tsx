import { useEffect, useState } from "react";
import Header from "./Header";
import {
  getOrganizations,
  getPhones,
  getUsers,
} from "./services/serviceProvider";
import { Organization, Phone, User } from "./types";
import Container from "./Container";

function App() {
  const [organizations, setOrganizations] = useState<
    Organization[] | undefined
  >();
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization>({ id: 0, name: "" });
  const [users, setUsers] = useState<User[] | undefined>();
  const [phones, setPhones] = useState<Phone[] | undefined>();

  const handleChangeOrganization = (organization: Organization) => {
    setSelectedOrganization(organization);
  };

  const handleCreateUser = async (newUser: User) => {
    await setUsers(users ? [...users, newUser] : [newUser]);
  };

  const handleUpdatePhones = async (updatedPhone: Phone) => {
    if (!phones) return;
    const updatedPhones = phones.map((phone) =>
      phone.phone_number === updatedPhone.phone_number ? updatedPhone : phone
    );
    await setPhones(updatedPhones);
  };

  const handleDeleteUser = async (deletedUser: User) => {
    const filteredUsers = users
      ? users.filter((user) => user.id !== deletedUser.id)
      : [];
    const freedPhone = {
      organization_id: deletedUser.organization_id,
      phone_number: deletedUser.phone_id,
    };
    console.log(deletedUser);
    console.log("Filtered Users:", filteredUsers);
    await setUsers(filteredUsers);

    phones
      ? await setPhones([...phones, freedPhone])
      : await setPhones([freedPhone]);
  };

  const loadOrganizations = async () => {
    try {
      const [error, orgs] = await getOrganizations();
      if (error) {
        console.error("Error loading organizations:", error);
      } else if (orgs) {
        setOrganizations(orgs);
        if (orgs.length > 0) {
          setSelectedOrganization(orgs[0]);
        }
      }
    } catch (error) {
      console.error("Error loading organizations:", error);
    }
  };

  const loadPhones = async () => {
    try {
      const response = await getPhones(selectedOrganization.id);
      const [err, phonesData] = response;
      if (err) {
        console.error("Error loading phones:", err);
        return;
      }
      if (phonesData) {
        setPhones(phonesData);
      }
      console.log(phonesData);
    } catch (error) {
      console.error("Error loading phones:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsers(selectedOrganization.id);
      const [err, usersData] = response;
      if (err) {
        console.error("Error loading users:", err);
        return;
      }
      if (usersData) {
        setUsers(usersData);
      }
      console.log(usersData);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    // Función para cargar los datos de la organización seleccionada

    // Cargar datos cuando se selecciona una organización
    if (selectedOrganization.id) {
      loadPhones();
      loadUsers();
    }
  }, [selectedOrganization]);

  return (
    <div className="App">
      <Header
        setOrganization={handleChangeOrganization}
        organizations={organizations}
        selectedOrganization={selectedOrganization}
      />
      <div style={{ display: "flex" }}>
        <Container
          users={users}
          phones={phones}
          selectedOrganization={selectedOrganization}
          handleCreateUser={handleCreateUser}
          handleUpdatePhones={handleUpdatePhones}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default App;
