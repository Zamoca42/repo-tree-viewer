import type { DefaultSession, DefaultUser } from "@auth/core/types";
import { JWT } from "@auth/core/jwt";

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      username?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string;
  }

  interface Profile {
    login?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
  }
}
