export type User = {
  id: number;
  organization_id: number;
  phone_id: number;
  name: string;
  surname: string;
};

export type Phone = {
  phone_number: number;
  organization_id?: number;
  user_id?: number;
};

export type Organization = {
  id: number;
  name?: string;
};
