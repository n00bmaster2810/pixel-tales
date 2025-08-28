import {createContext, type ReactNode, useState} from 'react'

export interface MenuContextType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const MenuContext = createContext<MenuContextType>({
    isOpen: false,
    setIsOpen: () => undefined
})

MenuContext.displayName = 'MenuContext'

export const MenuProvider = ({children}: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)

    const value = {
        isOpen,
        setIsOpen
    }

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )
}

