export interface Issue {
  id: number;
  name: string;
  description: string;
  assignee: string;
  status: number;
  closed: boolean;
}

export interface User {
  userName: string;
  email: string;
  id: string;
}

export interface Collaborator {
  username: string;
}