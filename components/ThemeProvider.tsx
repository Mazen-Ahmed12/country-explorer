"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    isDark: false,
    toggle:()=>{},
});

export default function ThemeProvider({children}: {children: React.ReactNode}){
    const [isDark,setIsDark] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark)
    }, [isDark])

    function toggle(){
        setIsDark(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{isDark, toggle}}>
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme(){
    return useContext(ThemeContext);
}