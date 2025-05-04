import { sqlClient } from "@/lib/prismadb";
import { TicketStatus } from "@/types/enum";
import type { SupportTicket } from "@prisma/client";
import { NextResponse } from "next/server";
import { CheckStoreAdminApiAccess } from "../../../api_helper";

// returns all countries currently in db
export async function GET(
	req: Request,
	props: { params: Promise<{ storeId: string }> },
) {
	const params = await props.params;
	try {
		CheckStoreAdminApiAccess(params.storeId);

		const pendingTickets = (await sqlClient.supportTicket.findMany({
			where: {
				storeId: params.storeId,
				status: TicketStatus.Active || TicketStatus.Open,
			},
		})) as SupportTicket[];

		return NextResponse.json(pendingTickets);
	} catch (error) {
		console.error("[GET_PENDING_ORDERS]", error);

		return new NextResponse("Internal error", { status: 500 });
	}
}
