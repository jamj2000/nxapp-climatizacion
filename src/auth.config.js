import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import { getUserByEmail } from "@/lib/data";

const authConfig = {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        console.log('AUTHORIZE')
        const user = await getUserByEmail(credentials.email)
        return user
      },
    }),
  ],

};

export default authConfig;