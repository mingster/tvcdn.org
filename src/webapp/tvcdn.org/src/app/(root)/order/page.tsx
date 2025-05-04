import getStoreById from "@/actions/get-store-by_id";
import { Navbar } from "@/components/global-navbar";
import Container from "@/components/ui/container";
import { Loader } from "@/components/ui/loader";
import { sqlClient } from "@/lib/prismadb";
import { transformDecimalsToNumbers } from "@/lib/utils";
import type { Store } from "@/types";
import { Suspense } from "react";
import { DisplayStoreOrdersToday } from "./display-order-today";

// 點餐記錄 - show order history from local storage.
//NOTE - why local storage?  because we allow anonymous user to place order.
//
type Params = Promise<{ storeId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function StoreOrderStatusPage(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const params = await props.params;

	const searchParams = await props.searchParams;
	const storeId = searchParams.storeId as string;

	console.log("searchParams", searchParams);
	console.log("storeId", storeId);

	const store = (await getStoreById(storeId)) as Store;

	return (
		<Suspense fallback={<Loader />}>
			<div className="bg-no-repeat bg-[url('/images/beams/hero@75.jpg')] dark:bg-[url('/images/beams/hero-dark@90.jpg')]">
				<Navbar title="" />
				<Container>
					<DisplayStoreOrdersToday store={store} />
				</Container>
			</div>
		</Suspense>
	);
}
