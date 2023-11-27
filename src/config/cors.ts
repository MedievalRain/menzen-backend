import { FRONTEND_DOMAIN } from "./env";

export const corsOptions = {
  origin: FRONTEND_DOMAIN,
  methods: "GET,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
