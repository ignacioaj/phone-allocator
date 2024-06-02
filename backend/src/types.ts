export type User = {
  id: number;
  name?: string;
  surname?: string;
  phone_id?: number;
  organization_id?: number;
};

export type Phone = {
  phone_number: number;
  organization_id?: number;
  user_id?: number;
};
