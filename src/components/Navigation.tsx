'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {
    CloseButton,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {Bars2Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {ShoppingBag} from 'lucide-react'
import {useCart} from '@/context/cartContext'
import {INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE_NAME} from '@/config'
import {cn} from '@/lib/utils'

interface NavItem {
    name: string;
    href: string;
}

interface NavDropdown {
    name: string;
    items: NavItem[];
}

interface NavigationProps {
    items: (NavItem | NavDropdown)[];
}

const CART_HREF = "/cart";

// Delay between each mobile menu link fading in
const STAGGER_MS = 70;

const isDropdown = (item: NavItem | NavDropdown): item is NavDropdown => {
    return 'items' in item;
}

// Small uppercase link with a red underline that slides in on hover / when active
const desktopLinkClass = (active: boolean) => cn(
    "relative py-1 font-body text-xs font-medium uppercase tracking-[0.25em] text-neutral-800 transition-colors duration-200 hover:text-primaryRed",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-primaryRed after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
    active ? "text-primaryRed after:scale-x-100" : "after:scale-x-0"
);

function CartLink({count, className, onClick}: {count: number; className?: string; onClick?: () => void}) {
    return (
        <Link
            href={CART_HREF}
            onClick={onClick}
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            className={cn("relative inline-flex p-2 text-neutral-800 transition-colors duration-200 hover:text-primaryRed", className)}
        >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
                <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primaryRed font-body text-[10px] font-semibold text-white">
                    {count}
                </span>
            )}
        </Link>
    )
}

export default function Navigation({items}: NavigationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const {cartTotal} = useCart()

    const closeMenu = () => setMobileMenuOpen(false)

    const renderDesktopItem = (item: NavItem | NavDropdown) => {
        if (isDropdown(item)) {
            const active = item.items.some((subItem) => subItem.href === pathname)
            return (
                <Popover className="relative" key={item.name}>
                    <PopoverButton className={cn(desktopLinkClass(active), "group flex items-center gap-1 outline-none")}>
                        {item.name}
                        <ChevronDownIcon aria-hidden="true" className="size-4 transition-transform duration-200 group-data-[open]:rotate-180" />
                    </PopoverButton>

                    <PopoverPanel
                        transition
                        anchor={{to: "bottom", gap: 16}}
                        className="z-20 w-60 border border-neutral-200 bg-white py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] transition duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    >
                        {item.items.map((subItem) => (
                            <CloseButton
                                as={Link}
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                    "block px-6 py-2 font-secHeading text-lg text-neutral-700 transition-all duration-200 hover:bg-neutral-50 hover:pl-7 hover:text-primaryRed",
                                    subItem.href === pathname && "text-primaryRed"
                                )}
                            >
                                {subItem.name}
                            </CloseButton>
                        ))}
                    </PopoverPanel>
                </Popover>
            )
        }

        return (
            <Link key={item.name} href={item.href} className={desktopLinkClass(item.href === pathname)}>
                {item.name}
            </Link>
        )
    }

    const renderMobileItem = (item: NavItem | NavDropdown, index: number) => {
        const style = {animationDelay: `${150 + index * STAGGER_MS}ms`}

        if (isDropdown(item)) {
            return (
                <div key={item.name} className="animate-fade-in-right" style={style}>
                    <p className="font-heading text-4xl text-neutral-900">{item.name}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 pl-1">
                        {item.items.map((subItem) => (
                            <li key={subItem.name}>
                                <Link
                                    href={subItem.href}
                                    onClick={closeMenu}
                                    className={cn(
                                        "font-body text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-primaryRed",
                                        subItem.href === pathname && "text-primaryRed"
                                    )}
                                >
                                    {subItem.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }

        return (
            <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                style={style}
                className={cn(
                    "block animate-fade-in-right font-heading text-4xl text-neutral-900 transition-colors hover:text-primaryRed",
                    item.href === pathname && "text-primaryRed"
                )}
            >
                {item.name}
            </Link>
        )
    }

    return (
        <header className="lg:w-full">
            {/* Desktop */}
            <nav aria-label="Global" className="relative hidden items-center justify-center border-y border-neutral-200 py-4 lg:flex">
                <PopoverGroup className="flex items-center gap-x-14">
                    {items.map(renderDesktopItem)}
                </PopoverGroup>
                <CartLink count={cartTotal} className="absolute right-0" />
            </nav>

            {/* Mobile trigger */}
            <div className="flex items-center gap-1 lg:hidden">
                <CartLink count={cartTotal} />
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="inline-flex p-2 text-neutral-800"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars2Icon aria-hidden="true" className="size-6" />
                </button>
            </div>

            {/* Mobile slide-out */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
                />

                <DialogPanel
                    transition
                    className="fixed inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-cream px-8 pb-10 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[closed]:translate-x-full"
                >
                    <div className="flex items-center justify-between">
                        <span className="font-accent text-3xl text-neutral-900">{SITE_NAME}</span>
                        <button type="button" onClick={closeMenu} className="-mr-2 p-2 text-neutral-800">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" strokeWidth={1.25} />
                        </button>
                    </div>

                    <div className="mt-12 flex flex-col gap-8">
                        {items.map(renderMobileItem)}
                        <Link
                            href={CART_HREF}
                            onClick={closeMenu}
                            style={{animationDelay: `${150 + items.length * STAGGER_MS}ms`}}
                            className={cn(
                                "block animate-fade-in-right font-heading text-4xl text-neutral-900 transition-colors hover:text-primaryRed",
                                pathname === CART_HREF && "text-primaryRed"
                            )}
                        >
                            Cart{cartTotal > 0 && <span className="ml-2 align-top font-body text-sm text-primaryRed">({cartTotal})</span>}
                        </Link>
                    </div>

                    <div className="mt-auto pt-10">
                        <div className="h-px w-12 bg-primaryRed" />
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block font-body text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-primaryRed"
                        >
                            {INSTAGRAM_HANDLE}
                        </a>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
