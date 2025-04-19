"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle({ className }: { className?: string }) {
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			variant="ghost"
			className={`size-8 cursor-pointer hover:bg-transparent hover:text-white ${className}`}
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			<SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
