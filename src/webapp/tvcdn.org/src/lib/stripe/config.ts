import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
	// https://github.com/stripe/stripe-node#configuration
	// https://stripe.com/docs/api/versioning
	apiVersion: "2025-04-30.basil",
	typescript: true,

	// Register this as an official Stripe plugin.
	// https://stripe.com/docs/building-plugins#setappinfo
	appInfo: {
		name: "Next.js Subscription Starter",
		version: "0.0.0",
		url: "https://github.com/vercel/nextjs-subscription-payments",
	},
});
