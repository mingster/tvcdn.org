"use client";

import { DataTableColumnHeader } from "@/components/dataTable-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { CellAction } from "./cell-action";

export type DataColumn = {
	id: string;
	name: string;
	payUrl: string;
	priceDescr: string;
	fee: number;
	feeAdditional: number;
	clearDays: number;

	isDefault: boolean;
	isDeleted: boolean;

	updatedAt?: string;

	StorePaymentMethodMapping?: number;
	StoreOrder?: number;
};

export const columns: ColumnDef<DataColumn>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Name" />;
		},
		cell: ({ row }) => (
			<Link
				className="pl-5"
				title="edit this payment method"
				href={`./paymentMethods/${row.original.id}/`}
			>
				{row.getValue("name")}
			</Link>
		),
	},
	{
		accessorKey: "payUrl",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="payUrl" />;
		},
	},
	/*{
      accessorKey: "priceDescr",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="price description" />;
      },
    },*/
	{
		accessorKey: "fee",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="fee" />;
		},
	},
	{
		accessorKey: "feeAdditional",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="fee additional" />;
		},
	},
	{
		accessorKey: "clearDays",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="clear days" />;
		},
	},
	{
		accessorKey: "isDefault",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="isDefault" />;
		},
		cell: ({ row }) => {
			const val =
				row.getValue("isDefault") === true ? (
					<CheckIcon className="text-green-400  size-4" />
				) : (
					<XIcon className="text-red-400 size-4" />
				);

			return <div className="pl-3">{val}</div>;
		},
	},
	{
		accessorKey: "isDeleted",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="isDeleted" />;
		},
		cell: ({ row }) => {
			const val =
				row.getValue("isDeleted") === true ? (
					<CheckIcon className="text-green-400  size-4" />
				) : (
					<XIcon className="text-red-400 size-4" />
				);

			return <div className="pl-3">{val}</div>;
		},
	},
	{
		accessorKey: "StorePaymentMethodMapping",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="# of store" />;
		},
	},
	{
		accessorKey: "StoreOrder",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="# of order" />;
		},
	},
	/*
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="updated" />;
    },
  },*/
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
