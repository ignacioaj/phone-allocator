import express, { Request, Response } from "express";
import { getOrganizations } from "./get_organizations";
import { getPhones } from "./get_phones";
import { getUsers } from "./get_users";
import { createUser } from "./create_user";
import { updatePhones } from "./update_phones";
import { deleteUser } from "./delete_user";

const router = express.Router();

router.get("/api/organizations", async (req: Request, res: Response) => {
  try {
    const organizations = await getOrganizations();
    res.json(organizations);
  } catch (err) {
    console.error("Error getting organizations:", err);
    res.status(500).json({ error: "Error getting organizations" });
  }
});

router.get("/api/phones", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const phones = await getPhones(id);
    res.json(phones);
  } catch (err) {
    console.error("Error getting phones:", err);
    res.status(500).json({ error: "Error getting phones" });
  }
});

router.get("/api/users", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const users = await getUsers(id);
    res.json(users);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ error: "Error getting users" });
  }
});

router.delete("/api/users", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const users = await deleteUser(id);
    res.json(users);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Error deleting users" });
  }
});

router.post("/api/users", async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const result = await createUser(user);
    res
      .status(200)
      .json({ success: true, message: "User created succesfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

router.patch("/api/phones", async (req: Request, res: Response) => {
  const phone = req.body;

  try {
    const result = await updatePhones(phone);
    res
      .status(200)
      .json({ success: true, message: "Phone updated successfully" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ success: false, message: "Error updating phone" });
  }
});

export default router;
function updatePhone(phone: any) {
  throw new Error("Function not implemented.");
}
