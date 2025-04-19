import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ["en", "th"];
export const defaultLocale = "en";

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const currentLocale = cookieStore.get("NEXT_LOCALE")?.value || defaultLocale;
    const locale = currentLocale;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});