import { CheckStoreAdminApiAccess } from "@/app/api/storeAdmin/api_helper";
import { sqlClient } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	props: { params: Promise<{ storeId: string; productId: string }> },
) {
	const params = await props.params;
	CheckStoreAdminApiAccess(params.storeId);

	const body = await req.json();

	await sqlClient.productCategories.create({
		data: { ...body },
	});

	return NextResponse.json("success", { status: 200 });
}

export async function DELETE(
	req: Request,
	props: { params: Promise<{ storeId: string; productId: string }> },
) {
	const params = await props.params;
	CheckStoreAdminApiAccess(params.storeId);

	const body = await req.json();
	const { categoriesToRemove } = body;

	//console.log(`categoriesToRemove: ${categoriesToRemove}`);

	await sqlClient.productCategories.deleteMany({
		where: {
			/*
      categoryId: {
        contains: categoriesToRemove,
      },*/
			productId: params.productId,
		},
	});

	return NextResponse.json("success", { status: 200 });
}
