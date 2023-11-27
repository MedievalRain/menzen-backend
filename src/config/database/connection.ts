import postgres from "postgres";
import { POSTGRES_URL } from "../env";

export const sql = postgres(POSTGRES_URL, { transform: postgres.camel });
