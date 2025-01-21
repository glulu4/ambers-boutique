// 'use client'

// import {useState} from 'react'
// import {
//     Dialog,
//     DialogPanel,
//     Disclosure,
//     DisclosureButton,
//     DisclosurePanel,
//     Popover,
//     PopoverButton,
//     PopoverGroup,
//     PopoverPanel,
// } from '@headlessui/react'
// import {
//     Bars3Icon,
//     XMarkIcon,
// } from '@heroicons/react/24/outline'
// import {ChevronDownIcon} from '@heroicons/react/20/solid'
// import SecondaryText from './text/SecondaryText'

// interface NavItem {
//     name: string;
//     href: string;
// }

// interface NavDropdown {
//     name: string;
//     items: NavItem[];
// }

// interface NavigationProps {
//     items: (NavItem | NavDropdown)[];
//     className?: string;
//     logo?: React.ReactNode;
//     renderCustomItem?: (item: NavItem | NavDropdown) => React.ReactNode;
// }

// const isDropdown = (item: NavItem | NavDropdown): item is NavDropdown => {
//     return 'items' in item;
// }

// export default function Navigation({
//     items,
//     className = "",
//     logo,
//     renderCustomItem
// }: NavigationProps) {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//     const renderDefaultItem = (item: NavItem | NavDropdown) => {
//         if (isDropdown(item)) {
//             return (
//                 <Popover className="relative" key={item.name}>
//                     <PopoverButton className="flex items-center gap-x-1 ">
                    
//                         <SecondaryText className=' text-primaryRed font-semibold'>
//                             {item.name}
//                     </SecondaryText>
                        
//                         <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-primaryRed" />
//                     </PopoverButton>

//                     <PopoverPanel
//                         transition
//                         className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//                     >
//                         {item.items.map((subItem) => (
//                             <a
//                                 key={subItem.name}
//                                 href={subItem.href}
//                                 className="block rounded-lg px-3 py-2 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
//                             >
//                                 <SecondaryText className=' text-primaryRedHover font-semibold'>
//                                     {subItem.name}
//                                 </SecondaryText>
//                             </a>
//                         ))}
//                     </PopoverPanel>
//                 </Popover>
//             )
//         }

//         return (
//             <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-sm/6 font-semibold text-gray-900"
//             >
//                 <SecondaryText className=' text-primaryRed font-semibold'>
//                     {item.name}
//                 </SecondaryText>
//             </a>
//         )
//     }

//     const renderMobileItem = (item: NavItem | NavDropdown) => {
//         if (isDropdown(item)) {
//             return (
//                 <Disclosure as="div" className="-mx-3" key={item.name}>
//                     <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 ">
//                         <SecondaryText className=' text-primaryRed font-semibold'>
//                             {item.name}
//                         </SecondaryText>
//                         <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180 text-primaryRed" />
//                     </DisclosureButton>
//                     <DisclosurePanel className="mt-2 space-y-2">
//                         {item.items.map((subItem) => (
//                             <DisclosureButton
//                                 key={subItem.name}
//                                 as="a"
//                                 href={subItem.href}
//                                 className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
//                             >
//                                 <SecondaryText className=' text-primaryRedHover font-semibold'>
//                                     {subItem.name}
//                                 </SecondaryText>
                                
//                             </DisclosureButton>
//                         ))}
//                     </DisclosurePanel>
//                 </Disclosure>
//             )
//         }

//         return (
//             <a
//                 key={item.name}
//                 href={item.href}
//                 className="-mx-3 block rounded-lg px-3 py-2 "
//             >

//                 <SecondaryText className=' py-1 text-primaryRed font-semibold'>
//                     {item.name}
//                 </SecondaryText>
//             </a>
//         )
//     }

//     return (
//         <header className={`bg-white ${className}`}>
//             <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
//                 {logo && <div className="flex">{logo}</div>}

//                 <div className="flex lg:hidden">
//                     <button
//                         type="button"
//                         onClick={() => setMobileMenuOpen(true)}
//                         className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//                     >
//                         <span className="sr-only">Open main menu</span>
//                         <Bars3Icon aria-hidden="true" className="size-6" />
//                     </button>
//                 </div>

//                 <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//                     {items.map((item) =>
//                         renderCustomItem ? renderCustomItem(item) : renderDefaultItem(item)
//                     )}
//                 </PopoverGroup>
//             </nav>

//             <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//                 <div className="fixed inset-0 z-10" />
//                 <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//                     <div className="flex items-center justify-between flex-row-reverse">
//                         <button
//                             type="button"
//                             onClick={() => setMobileMenuOpen(false)}
//                             className="-m-2.5 rounded-md p-2.5 text-gray-700"
//                         >
//                             <span className="sr-only">Close menu</span>
//                             <XMarkIcon aria-hidden="true" className="size-6" />
//                         </button>
//                     </div>
//                     <div className="mt-6 flow-root">
//                         <div className="-my-6 divide-y divide-gray-500/10">
//                             <div className="space-y-2 py-6">
//                                 {items.map(renderMobileItem)}
//                             </div>
//                         </div>
//                     </div>
//                 </DialogPanel>
//             </Dialog>
//         </header>
//     )
// }



'use client'

import {useState} from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import SecondaryText from './text/SecondaryText'

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
    className?: string;
    logo?: React.ReactNode;
    renderCustomItem?: (item: NavItem | NavDropdown) => React.ReactNode;
}

const isDropdown = (item: NavItem | NavDropdown): item is NavDropdown => {
    return 'items' in item;
}

export default function Navigation({
    items,
    className = "",
    logo,
    renderCustomItem
}: NavigationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const renderDefaultItem = (item: NavItem | NavDropdown) => {
        if (isDropdown(item)) {
            return (
                <Popover className="relative" key={item.name}>
                    <PopoverButton className="flex items-center gap-x-1">
                        <SecondaryText size="medium" className='text-primaryRed font-semibold'>
                            {item.name}
                        </SecondaryText>
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-primaryRed" />
                    </PopoverButton>

                    <PopoverPanel
                        className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5"
                    >
                        {item.items.map((subItem) => (
                            <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block rounded-lg px-3 py-2 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                <SecondaryText className='text-primaryRedHover font-semibold'>
                                    {subItem.name}
                                </SecondaryText>
                            </a>
                        ))}
                    </PopoverPanel>
                </Popover>
            )
        }

        return (
            <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
            >
                <SecondaryText className='text-primaryRed font-semibold'>
                    {item.name}
                </SecondaryText>
            </a>
        )
    }

    const renderMobileItem = (item: NavItem | NavDropdown) => {
        if (isDropdown(item)) {
            return (
                <Disclosure as="div" className="-mx-3" key={item.name}>
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5">
                        <SecondaryText className='text-primaryRed font-semibold'>
                            {item.name}
                        </SecondaryText>
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180 text-primaryRed" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                        {item.items.map((subItem) => (
                            <DisclosureButton
                                key={subItem.name}
                                as="a"
                                href={subItem.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                <SecondaryText className='text-primaryRedHover font-semibold'>
                                    {subItem.name}
                                </SecondaryText>
                            </DisclosureButton>
                        ))}
                    </DisclosurePanel>
                </Disclosure>
            )
        }

        return (
            <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2"
            >
                <SecondaryText className='py-1 text-primaryRed font-semibold'>
                    {item.name}
                </SecondaryText>
            </a>
        )
    }

    return (
        <header className={`bg-white ${className}`}>
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between  lg:px-8">
                {logo && <div className="flex">{logo}</div>}

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    {items.map((item) =>
                        renderCustomItem ? renderCustomItem(item) : renderDefaultItem(item)
                    )}
                </PopoverGroup>
            </nav>

            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="relative z-50 lg:hidden  transition-opacity duration-500 ease-in-out"
                transition
            >
                {/* Blurred backdrop */}
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

                {/* Slide-out panel */}
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-50 w-[90%] overflow-y-auto bg-white px-6 py-6 shadow-xl transition-transform duration-300 ease-in-out transform"
                    style={{
                        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                    }}
                >
                    <div className="flex items-center justify-between flex-row-reverse">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {items.map(renderMobileItem)}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}