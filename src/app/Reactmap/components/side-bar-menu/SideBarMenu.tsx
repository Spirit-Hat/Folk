import React, {ReactNode, useEffect, useRef, useState} from "react";
import "./SidebarMenu.scss";
import { useWindowSize } from "../BodyWrapper";
import {AnimatePresence, motion} from 'framer-motion'
import "../BodyWrapper.scss";

interface SidebarMenuProps {
    children: ReactNode;
}
const SVG = {thumbBtnLeft: "M16,25c0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.6-1.6,0-2.2l-9.8-9.8l9.8-9.8c0.6-0.6,0.6-1.6,0-2.2s-1.6-0.6-2.2,0L4,11.4C3.4,12,3.4,13,4,13.6l10.9,10.9C15.2,24.8,15.6,25,16,25z"}
const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
    const [width] = useWindowSize();
    const [isOpen, setIsOpen] = useState(width >= 1440 ? true : false)
    const sideBarWrapper = useRef<HTMLDivElement>(null);

    const MouseMoveHandler = (event: MouseEvent) => {
        if (!isOpen && width <= 1440 && event.clientX <= width * 0.025) {
            setIsOpen(true);
        } else if (isOpen && sideBarWrapper?.current && event.clientX >= sideBarWrapper.current.clientWidth && width <= 1440) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', (e) => MouseMoveHandler(e));
        return () => {
            window.removeEventListener('mousemove', (e) => MouseMoveHandler(e));
        };
    })

    return (
        <React.Fragment>
            <AnimatePresence mode="wait" initial={false}>
                {(isOpen || width >= 1440) && (
                    <motion.div
                        {...boxSideBar} ref={sideBarWrapper}
                        className={"sidebarMainWrapper "  + ["sidebar-position-abs"] + " side-bar-menu"}>
                            {children}
                    </motion.div>
                )}
            </AnimatePresence>
            {!isOpen && width <= 1440 && (
                <div className={"thumbBtnLeftWrapper"}>
                    <button className={"thumbBtnLeft"} onClick={() => setIsOpen(true)}>
                        <svg viewBox="0 0 26 24">
                            <path d={SVG.thumbBtnLeft}/>
                        </svg>
                    </button>
                </div>
            )}
        </React.Fragment>
    );
};

const boxSideBar = {
    initial: {x: "-360px"},
    animate: {x: 0},
    exit: {x: "-360px"},
    transition: {duration: 0.175},
}

export default SidebarMenu;
