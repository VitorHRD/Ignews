import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from "faunadb"
import { fauna } from '../../../services/fauna'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const UserEmail = user.email
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(UserEmail)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { UserEmail } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(UserEmail)
              )
            )
          )
        )
        return true
      }
      catch {
        return false
      }
    }
  }

})