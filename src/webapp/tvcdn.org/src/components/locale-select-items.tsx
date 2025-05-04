import type { Locale } from "@prisma/client";
import useSWR, { Fetcher } from "swr";

import { SelectItem } from "@/components/ui/select";

import { cookieName, getOptions, languages } from "@/app/i18n/settings";

export const LocaleSelectItems: React.FC = () => {
	//const option = getOptions();
	//console.log(`supportedLngs: ${option.supportedLngs}`);

	const url = `${process.env.NEXT_PUBLIC_API_URL}/common/get-locales`;

	const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
	const { data, error, isLoading } = useSWR(url, fetcher);

	let locales: Locale[] = [];
	if (!isLoading && !error) locales = data;

	//console.log(`locales:${JSON.stringify(locales)}`);

	return (
		<>
			{locales.map((locale) => (
				<SelectItem key={locale.id} value={locale.lng}>
					{locale.name} ({locale.id})
				</SelectItem>
			))}
		</>
	);
};
