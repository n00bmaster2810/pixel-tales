import {useContext} from "react";
import {MenuContext, type MenuContextType} from "./MenuContext.tsx";

export const useMenu = (): MenuContextType => {
    const context = useContext(MenuContext)
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider')
    }
    return context
}