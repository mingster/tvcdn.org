"use client";
import { Loader } from "@/components/ui/loader";
import { getHostname } from "@/lib/utils";
import type { Store } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GlobalHomePage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	const router = useRouter();
	const routeToStore = async () => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/store/get-by-hostname`;
		const body = JSON.stringify({
			customDomain: getHostname(),
		});

		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		})
			.then((response) => response.json())
			.then((data) => {
				//console.log(data.length===0);
				//console.log('featch result: ' + JSON.stringify(data));
				let url = "/unv"; // the default built-in path if no store found

				if (data.length !== 0) {
					//if pending order, move on to payment
					const stores = data as Store[];
					//console.log('featch result: ' + JSON.stringify(stores));
					//console.log('store.id: ' + stores[0].id);

					const storeId = stores[0].id;
					if (storeId) {
						url = `./${storeId}`;
					}
				}

				router.push(url);
			})
			.catch((error) => {
				console.error(error);
				toast(error.message);
				throw new Error("Something went wrong.");
			});
	}


	routeToStore();

	if (!mounted) return <></>;

	return <Loader />;
}
