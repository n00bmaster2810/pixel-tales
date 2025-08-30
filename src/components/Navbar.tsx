import '../App.css'
import {memo, useCallback} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {HiMenu, HiX} from 'react-icons/hi'

import {useMenu} from "../context/UseMenu.tsx";

const NAV_ITEMS = [
    {path: '/', label: 'Portfolio'},
    {path: '/about', label: 'About'},
    {path: '/contact', label: 'Contact'},
    {path: '/blog', label: 'Blog'},
] as const

const NavItem = memo(({path, label, isActive, onClick}: {
    path: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <Link
        to={path}
        onClick={onClick}
        className={`font-display font-normal uppercase text-[14px] sm:text-[15px] md:text-[16px] 
            text-light opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity 
            ${isActive ? 'opacity-100' : ''}`}
    >
        {label}
    </Link>
))

const Navbar = () => {
    const {isOpen, setIsOpen} = useMenu()
    const location = useLocation()
    
    // Memoize toggle function to prevent unnecessary re-renders
    const toggleMenu = useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen, setIsOpen])
    
    // Memoize close function to prevent unnecessary re-renders
    const closeMenu = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    return (
        <nav className="relative z-50">
            <div
                className="flex flex-row justify-between items-center px-4 sm:px-6 md:px-8 pt-8 sm:pt-16 md:pt-26 ml-4 sm:ml-8 md:ml-54">
                <Link to="/"
                      className="font-display font-bold uppercase text-2xl sm:text-2xl md:text-3xl leading-relaxed md:leading-16 text-mid-light opacity-100 hover:opacity-60 transition-opacity">
                    Pixel tales
                </Link>

                <button
                    onClick={toggleMenu}
                    className="sm:hidden text-light transition-all duration-300"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <HiX className="w-6 h-6"/> : <HiMenu className="w-6 h-6"/>}
                </button>
            </div>

            <div className={`
                relative flex flex-row pt-3 sm:pt-4 md:pt-5 
                px-4 sm:px-6 md:px-8 ml-4 sm:ml-8 md:ml-54
                sm:space-x-[20px] md:space-x-[30px]
                max-sm:w-full max-sm:px-0 max-sm:ml-0
                max-sm:shadow-lg max-sm:transform max-sm:transition-all max-sm:duration-300 max-sm:ease-in-out
                max-sm:flex-col max-sm:space-x-0
                ${isOpen ? 'max-sm:opacity-100' : 'max-sm:hidden'}
            `}>
                <div className="max-sm:px-4 max-sm:py-4 w-full">
                    <div
                        className="flex flex-row sm:space-x-[20px] md:space-x-[30px] max-sm:flex-col max-sm:space-y-4 max-sm:ml-4">
                        {NAV_ITEMS.map(({path, label}) => {
                            const isActive = location.pathname === path;
                            return (
                                <NavItem
                                    key={path}
                                    path={path}
                                    label={label}
                                    isActive={isActive}
                                    onClick={closeMenu}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default memo(Navbar)
