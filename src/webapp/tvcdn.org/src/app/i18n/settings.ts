export const fallbackLng = "en";
export const languages = [fallbackLng, "tw", "cn"];
export const defaultNS = "translation"; //default json filename
export const cookieName = "i18next";

export function getOptions(
	lng = fallbackLng,
	ns: string | string[] = defaultNS,
) {
	return {
		// Enables useful output in the browser’s
		// dev console.
		debug: false,

		supportedLngs: languages,
		// preload: languages,

		// Specifies the default language (locale) used
		// when a user visits our site for the first time.
		// We use English here, but feel free to use
		// whichever locale you want.

		// We need to remove this explicit setting
		// of the the active locale, or it will
		// override the auto-detected locale.
		//lng,

		fallbackLng,

		// Fallback locale used when a translation is
		// missing in the active locale. Again, use your
		// preferred locale here.
		fallbackNS: defaultNS,

		defaultNS,

		ns,
		// backend: {
		//   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
		// }

		// Normally, we want `escapeValue: true` as it
		// ensures that i18next escapes any code in
		// translation messages, safeguarding against
		// XSS (cross-site scripting) attacks. However,
		// React does this escaping itself, so we turn
		// it off in i18next.
		interpolation: {
			escapeValue: false,
		},
	};
}
