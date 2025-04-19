"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LanguageToggle({ className }: { className?: string }) {
	const locale = useLocale();
	const router = useRouter();

	const handleLanguageChange = () => {
		const newLocale = locale === "en" ? "th" : "en";
		document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
		router.refresh();
	};

	return (
		<Button
			variant="ghost"
			className={`h-8 w-8 px-0 cursor-pointer hover:bg-transparent hover:text-white ${className}`}
			onClick={handleLanguageChange}
			aria-label={`Toggle to ${locale === "en" ? "English" : "Thai"} language`}
		>
			{locale === "en" ? "EN" : "TH"}
		</Button>
	);
}
