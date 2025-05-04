import { IsSignInResponse } from "@/lib/auth/utils";
import { sqlClient } from "@/lib/prismadb";
import { getUtcNow } from "@/lib/utils";
import { TicketStatus } from "@/types/enum";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

///!SECTION create new ticket from store's support page.
export async function POST(
	req: Request,
	props: { params: Promise<{ storeId: string }> },
) {
	const params = await props.params;
	try {
		const userId = await IsSignInResponse();
		if (typeof userId !== "string") {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const store = await sqlClient.store.findUnique({
			where: {
				id: params.storeId,
			},
		});
		if (!store) {
			return new NextResponse("Store not found", { status: 501 });
		}

		const body = await req.json();
		const { department, subject, message } = body;

		const obj = await sqlClient.supportTicket.create({
			data: {
				storeId: params.storeId,
				threadId: uuidv4(),
				senderId: userId,
				recipentId: store.ownerId,
				status: TicketStatus.Open,
				department,
				subject,
				message,
				updatedAt: getUtcNow(),
			},
		});

		/*
    const obj2 = await sqlClient.supportTicket.update({
      where: {
        id: obj.id,
      },
      data: {
        threadId: obj.id,
      },
    });
    console.log(`create ticket: ${JSON.stringify(obj)}`);
    */

		return NextResponse.json(obj);
	} catch (error) {
		console.log("[TICKET_POST]", error);

		return new NextResponse(`Internal error${error}`, { status: 500 });
	}
}
