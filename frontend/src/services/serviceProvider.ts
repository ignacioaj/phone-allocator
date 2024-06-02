import { Organization, Phone, User } from "../types";

export const getOrganizations = async (): Promise<
  [Error | undefined, Organization[] | undefined]
> => {
  try {
    const res = await fetch(`http://localhost:5000/api/organizations`, {
      method: "GET",
    });
    const json = await res.json();
    return [undefined, json as Organization[]];
  } catch (error) {
    if (error instanceof Error) return [error, undefined];
    return [new Error("Unknown error occurred"), undefined];
  }
};

export const getPhones = async (
  id: number
): Promise<[Error | undefined, Phone[] | undefined]> => {
  try {
    const res = await fetch(`http://localhost:5000/api/phones?id=${id}`, {
      method: "GET",
    });
    const json = await res.json();
    return [undefined, json as Phone[]];
  } catch (error) {
    if (error instanceof Error) return [error, undefined];
    return [new Error("Unknown error occurred"), undefined];
  }
};

export const getUsers = async (
  id: number
): Promise<[Error | undefined, User[] | undefined]> => {
  try {
    const res = await fetch(`http://localhost:5000/api/users?id=${id}`, {
      method: "GET",
    });
    const json = await res.json();
    return [undefined, json as User[]];
  } catch (error) {
    if (error instanceof Error) return [error, undefined];
    return [new Error("Unknown error occurred"), undefined];
  }
};

export const createUser = async (
  user: User
): Promise<[Error | undefined, User[] | undefined]> => {
  try {
    const res = await fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    return [undefined, json as User[]];
  } catch (error) {
    if (error instanceof Error) return [error, undefined];
    return [new Error("Unknown error occurred"), undefined];
  }
};

export const deleteUser = async (id: number): Promise<[Error | undefined]> => {
  try {
    await fetch(`http://localhost:5000/api/users?id=${id}`, {
      method: "DELETE",
    });
    return [undefined];
  } catch (error) {
    if (error instanceof Error) return [error];
    return [new Error("Unknown error occurred")];
  }
};

export const updatePhone = async (
  phone: Phone
): Promise<[Error | undefined, Phone[] | undefined]> => {
  try {
    const res = await fetch(`http://localhost:5000/api/phones`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phone),
    });
    const json = await res.json();
    return [undefined, json as Phone[]];
  } catch (error) {
    if (error instanceof Error) return [error, undefined];
    return [new Error("Unknown error occurred"), undefined];
  }
};
