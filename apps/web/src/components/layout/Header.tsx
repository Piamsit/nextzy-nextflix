'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Search, Bell, ChevronDown, Cast } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { NetflixLogo } from '../logo/NetflixLogo';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageToggle } from '../LanguageToggle';
import { useTranslations } from 'next-intl';

export default function Header() {
    const t = useTranslations();
    const isMobile = useIsMobile();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const homeItems = [
        { title: t("home"), href: '/' },
    ];

    const primaryItems = [
        { title: t("tvShows"), href: '/tv-shows' },
        { title: t("movies"), href: '/movies' },
    ];

    const dropdownItems = [
        { title: t("newAndPopular"), href: '/new' },
        { title: t("myList"), href: '/my-list' },
        { title: t("browseByLanguages"), href: '/browse' },
    ];

    if (isMobile) {
        return (
            <header className='fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm pb-2'>
                <div className="flex items-center justify-between w-full p-5">
                    <Link href="/" className="w-24 h-7 relative" aria-label="Netflix Home" title="Netflix Home">
                        <Image
                            src="/netflix-n.png"
                            alt="Netflix logo"
                            width={24}
                            height={24}
                            priority
                        />
                    </Link>

                    <div className="flex justify-center items-center space-x-4">
                        <LanguageToggle />
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white"
                            aria-label="Cast to device"
                        >
                            <Cast className="size-8 text-gray-200" />
                        </Button>
                        <div className="w-8 h-8 bg-gray-600 rounded" />
                    </div>
                </div>

                <div className="flex justify-center items-center gap-6 md:gap-10 w-full mt-4">
                    {primaryItems.map((item) => (
                        <span
                            key={item.title}
                            className="text-lg md:text-2xl text-gray-300 hover:text-white transition-colors"
                            aria-label={item.title}
                        >
                            {item.title}
                        </span>
                    ))}

                    <div className="flex items-center group">
                        <span className="text-lg md:text-2xl">{t("categories")}</span>
                        <ChevronDown
                            className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                            aria-label="Expand categories menu"
                        />
                    </div>

                </div>

            </header >
        )
    }

    return (
        <header
            className={cn(
                'fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-15 py-4 flex items-center justify-between',
                {
                    'bg-black/80 backdrop-blur-sm': scrolled,
                    'bg-gradient-to-b from-black/80 to-transparent': !scrolled,
                }
            )}
        >
            <div className='flex items-center justify-between w-full'>
                <div className="flex items-center space-x-4 md:space-x-8">
                    <Link href="/" className="w-24 h-7 relative" aria-label="Netflix Home" title="Netflix Home">
                        <NetflixLogo />
                    </Link>

                    <NavigationMenu className="hidden md:flex items-center gap-4 text-xs px-2">
                        <NavigationMenuList className="space-x-4">
                            {[...homeItems, ...primaryItems, ...dropdownItems].map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <span
                                        className={cn(
                                            'text-sm text-gray-300 hover:text-white transition-colors',
                                            item.href === pathname && 'font-bold text-white'
                                        )}
                                    >
                                        {item.title}
                                    </span>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        size="icon"
                        variant={"ghost"}
                        className="cursor-pointer hover:bg-transparent"
                        aria-label="Search"
                    >
                        <Search className="size-6 text-gray-200" />
                    </Button>
                    <span className="text-sm text-gray-200 cursor-pointer">{t("kids")}</span>
                    <Button
                        size="icon"
                        variant={"ghost"}
                        className="cursor-pointer hover:bg-transparent"
                        aria-label="Notifications"
                    >
                        <Bell className="size-6 text-gray-200" />
                    </Button>
                    <LanguageToggle />
                    <ThemeToggle />
                    <div className="flex items-center group">
                        <div className="w-8 h-8 bg-gray-600 rounded" />
                        <ChevronDown
                            className="size-4 text-emerald-700 transition-transform group-hover:rotate-180"
                            aria-label="Profile menu"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}