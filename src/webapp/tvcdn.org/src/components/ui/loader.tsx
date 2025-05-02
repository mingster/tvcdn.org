"use client";

import { ClipLoader } from "react-spinners";

export const Loader = () => {
	return (
		<div className="w-full">
			<div className="flex h-screen place-items-center place-content-center">
				<ClipLoader color="#3498db" size={50} />
			</div>
		</div>
	);
};
