// this is config for next-auth v5
//
import NextAuth from "next-auth";
//import { nanoid } from 'nanoid';

import Discord from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import LineProdiver from "next-auth/providers/line";
//import Nodemailer from "next-auth/providers/nodemailer";

/*
import EmailProvider from "next-auth/providers/email";

import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
*/

import refresh_google_token from "@/lib/auth/refresh_google_token";
import { sqlClient } from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import type { Provider } from "next-auth/providers";

import { stripe } from "@/lib/stripe/config";

//const prisma = new PrismaClient();
const isDevelopmentMode = process.env.NODE_ENV === "development";

/*
const getUser = async (email: string) =>
  await prisma.user.findFirst({
    where: {
      email,
    },
  });

export const getToken = (test: string) => {
  return process.env.NEXTAUTH_SECRET + test;
};
*/
const providers: Provider[] = [
	GoogleProvider,
	LineProdiver,
	FacebookProvider,
	Discord,
];

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === "function") {
			const providerData = provider();

			return { id: providerData.id, name: providerData.name };
		}

		return { id: provider.id, name: provider.name };
	})
	.filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
	//export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(sqlClient) as Adapter,
	secret: process.env.AUTH_SECRET,
	session: {
		//strategy: 'jwt',
		strategy: "database",
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 365 * 24 * 60 * 60, // 365 days
		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours
		// The session token is usually either a random UUID or string, however if you
		// need a more customized session token string, you can define your own generate function.
		//generateSessionToken: () => {
		//    return randomUUID?.() ?? randomBytes(32).toString("hex")
		//}
	},
	providers: [
		/*
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          id: 'clpeskcno000089avfp9mig0x',
          name: 'Ming the man',
          email: 'm@mingster.com',
          image: 'https://i.pravatar.cc/150?u=m@ming.com',
          role: 'ADMIN',
        };
        return user;
      },
    }),
    */
		/*
    https://next-auth.js.org/providers/google
    https://console.cloud.google.com/?project=legod-397304
    */
		GoogleProvider({
			clientId: `${process.env.AUTH_GOOGLE_ID}`,
			clientSecret: `${process.env.AUTH_GOOGLE_SECRET}`,
			//allowDangerousEmailAccountLinking: true,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),

		// https://blog.errorbaker.tw/posts/ruofan/next-auth/
		// https://developers.line.biz/console/channel/2000556006
		LineProdiver({
			clientId: `${process.env.AUTH_LINE_ID}`,
			clientSecret: `${process.env.AUTH_LINE_SECRET}`,
			//allowDangerousEmailAccountLinking: true,
		}),
		// https://discord.com/developers/applications/1287781517506121739/oauth2
		Discord({
			clientId: `${process.env.AUTH_DISCORD_ID}`,
			clientSecret: `${process.env.AUTH_DISCORD_SECRET}`,
			//allowDangerousEmailAccountLinking: true,
		}),
		//https://legod.vercel.app/api/auth/callback/facebook
		// http://localhost:3001/api/auth/callback/facebook
		// https://developers.facebook.com/apps/557644063270057/settings/
		FacebookProvider({
			clientId: `${process.env.AUTH_FACEBOOK_ID}`,
			clientSecret: `${process.env.AUTH_FACEBOOK_SECRET}`,
			//allowDangerousEmailAccountLinking: true,
		}),
		/*
		Nodemailer({
			server: `smtp://${process.env.EMAIL_SERVER_USER}:${process.env.EMAIL_SERVER_PASSWORD}@${process.env.EMAIL_SERVER_HOST}:${process.env.EMAIL_SERVER_PORT}`,
			from: process.env.EMAIL_FROM,
			maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
			normalizeIdentifier(identifier: string): string {
				// Get the first two elements only,
				// separated by `@` from user input.
				let [local, domain] = identifier.toLowerCase().trim().split("@");
				// The part before "@" can contain a ","
				// but we remove it on the domain part
				domain = domain.split(",")[0];
				local = local.trim(); //just to avoid typescript lint error

				return `${local}@${domain}`;

				// You can also throw an error, which will redirect the user
				// to the sign-in page with error=EmailSignin in the URL
				// if (identifier.split("@").length > 2) {
				//   throw new Error("Only one email allowed")
				// }
			},
			async generateVerificationToken() {
				return crypto.randomUUID();
			},
		}),

		*/

	],
	pages: {
		//signIn: "/signin",
		//signOut: '/signout',
		//error: '/auth/error', // Error code passed in query string as ?error=
		//verifyRequest: '/verify-request', // (used for check email message)
		//newUser: '/signup' // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	//Callbacks are asynchronous functions you can use to control what happens when an action is performed.
	callbacks: {
		async signIn({ user, account, email }) {
			if (isDevelopmentMode) {
				if (account) console.log(`signIn account: ${JSON.stringify(account)}`);
				if (user) console.log(`signIn user: ${JSON.stringify(user)}`);
				if (email) console.log(`signIn email: ${JSON.stringify(email)}`);
			}

			// for email provider, if the email exists in the User collection, email them a magic login link
			// for non-existing email, disallow sign in for now.
			if (account?.provider === "email") {
				const userExists = await sqlClient.user.findUnique({
					where: {
						email: user?.email ?? "",
					},
				});

				if (userExists) {
					return true;
				}

				return false;
				/* else {return "/register";}*/
			}

			// allow other configured oAuth providers pass through
			return true;
		},
		/*
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    */
		async session({ session, token, user }) {
			if (token) {
				// token only available when strategy is jwt
				session.id = token.id;
			}

			if (isDevelopmentMode) {
				/*
        console.log(`session: ${JSON.stringify(session)}`);
        console.log(`user: ${JSON.stringify(user)}`);
        console.log(`token: ${JSON.stringify(token)}`);
        */
			}

			// determine user role
			if (session.user?.email) {
				const dbuser = await sqlClient.user.findUnique({
					where: {
						email: session.user.email,
					},
					/*
					include: {
						NotificationTo: {
							take: 20, //select latest 20 notifications
							include: {
								Sender: true,
							},
							orderBy: {
								updatedAt: "desc",
							},
						},
					},*/
				});

				//ANCHOR - role is defined in session.usertype in @/types/next.auth.d.ts
				session.user.id = `${user?.id}`;
				session.user.role = dbuser?.role ?? "";
				//session.user.notifications = dbuser?.NotificationTo ?? [];

				/*
        // refresh google token if needed
        const [googleAccount] = await sqlClient.account.findMany({
          where: { userId: session.user.id, provider: "google" },
        });
        if (googleAccount) {
          //refresh_google_token(googleAccount);
        }
        */
				//session.user.id = token.sub + '';
				return Promise.resolve(session);
			}

			return session;
		},

		//async jwt({ token, user, account, profile }) {
		async jwt({ token, user, account }) {
			// Persist the OAuth access_token and/or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				token.id = user?.id;
			}

			return token;
		},
	},
	//debug: process.env.NODE_ENV === 'development' ? true : false,
	events: {
		//automatically create an account in the Stripe dashboard when a user logs in for the first time.
		//Later, the stripeCustomerId will be added to that user's account in our database.
		createUser: async ({ user }) => {
			await stripe.customers
				.create({
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					email: user.email!,
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					name: user.name!,
				})
				.then(async (customer) => {
					return sqlClient.user.update({
						where: { id: user.id },
						data: {
							stripeCustomerId: customer.id,
						},
					});
				});
		},
	},
});
