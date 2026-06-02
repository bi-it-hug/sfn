import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"

interface MicrosoftProfile {
    sub: string
    name: string
    email: string
    picture?: string
}

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "microsoft",
            name: "Microsoft",
            type: "oauth",
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
            authorization:
                "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&scope=openid profile email User.Read",
            token: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            userinfo: "https://graph.microsoft.com/oidc/userinfo",
            profile(profile: MicrosoftProfile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                } as User
            },
        },
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            return session
        },
    },
}

export default NextAuth(authOptions)
