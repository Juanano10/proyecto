import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
 providers:[
    CredentialsProvider({
        name: "credentials",
        credentials:{
            email: { label: "email", type: "email", placeholder: "jsmith" },
      password: { label: "Password", type: "password", placeholder:"********"}
        },
         authorize(credentials, req) {

            const user = { id: "1", name: "juan", email:"juan@gmail.com"};
            return user;
            
        },
    })
 ]
})

export { handler as GET, handler as POST }