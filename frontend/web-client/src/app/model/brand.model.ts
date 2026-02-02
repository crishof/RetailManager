import { UUID } from "node:crypto";

export interface IBrand {
  id: UUID;
  name: string;
  logoUrl: string;
}
