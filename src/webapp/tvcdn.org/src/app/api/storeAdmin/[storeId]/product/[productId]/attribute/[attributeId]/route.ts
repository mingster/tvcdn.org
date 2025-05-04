import { CheckStoreAdminApiAccess } from "@/app/api/storeAdmin/api_helper";
import { sqlClient } from "@/lib/prismadb";
import { transformDecimalsToNumbers } from "@/lib/utils";

import { NextResponse } from "next/server";

///!SECTION update product attribute in database.
export async function PATCH(
	req: Request,
	props: { params: Promise<{ storeId: string; productId: string }> },
) {
	const params = await props.params;
	try {
		CheckStoreAdminApiAccess(params.storeId);

		if (!params.productId) {
			return new NextResponse("product id is required", { status: 400 });
		}

		const body = await req.json();
		const obj = await sqlClient.productAttribute.update({
			where: {
				productId: params.productId,
			},
			data: { ...body },
		});

		//console.log(`updated product attribute: ${JSON.stringify(obj)}`);
		transformDecimalsToNumbers(obj);

		return NextResponse.json(obj);
	} catch (error) {
		console.log("[PRODUCT_ATTRIBUTE_PATCH]", error);

		return new NextResponse(`Internal error${error}`, { status: 500 });
	}
}
