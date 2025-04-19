'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Search, Bell, ChevronDown, Cast } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { NetflixLogo } from '../logo/netflix-logo';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
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
        { title: 'Home', href: '/' },
    ]

    const primaryItems = [
        { title: 'TV Shows', href: '/tv-shows' },
        { title: 'Movies', href: '/movies' },
    ]

    const dropdownItems = [
        { title: 'New & Popular', href: '/new' },
        { title: 'My List', href: '/my-list' },
        { title: 'Browse by Languages', href: '/browse' },
    ]

    if (isMobile) {
        return (
            <header className='absolute top-0 w-full z-50 bg-transparent'>
                <div className="flex items-center justify-between w-full p-5">
                    <Link href="/" className="w-24 h-7 relative">
                        <Image
                            src="/netflix-n.png"
                            alt="Netflix N"
                            width={24}
                            height={24}
                            priority
                        />
                    </Link>

                    <div className="flex justify-center items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-white">
                            <Cast className="size-8 text-gray-200" />
                        </Button>
                        <div className="w-8 h-8 bg-gray-600 rounded" />
                    </div>
                </div>

                <div className="flex justify-center items-center gap-6 md:gap-10 w-full mt-4">
                    {primaryItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="text-lg md:text-2xl text-gray-300 hover:text-white transition-colors"
                        >
                            {item.title}
                        </Link>
                    ))}

                    <div className="flex items-center group">
                        <span className='text-lg md:text-2xl'>Categories</span>
                        <ChevronDown
                            className={'ml-1 h-4 w-4 transition-transform group-hover:rotate-180'}
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
                    <Link href="/" className="w-24 h-7 relative">
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
                    <Button size="icon" className="text-white">
                        <Search className="size-6 text-gray-200" />
                    </Button>
                    <span className="text-sm text-gray-200">Kids</span>
                    <Button size="icon" className="text-white hidden md:flex">
                        <Bell className="size-6 text-gray-200" />
                    </Button>
                    <div className="flex items-center group">
                        <div className="w-8 h-8 bg-gray-600 rounded" />
                        <ChevronDown className="size-4 text-emerald-700 transition-transform group-hover:rotate-180" />
                    </div>
                </div>
            </div>
        </header>
    );
}