import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SidebarNav from './SidebarNav'
import AppContent from './AppContent'

export default function Layouts() {
    const [collapsed, setCollapsed] = React.useState(false);
    //need to add condition to not show the side bar when accesed oublic urls
    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [whenCollapsed, setWhenCollapsed] = useState('calc(100% - 75px)')
    const handleResize = () => {
        setWindowWidth(window.innerWidth);

        // 575
    };
    useEffect(() => {
        // Add a window resize event listener when the component mounts
        window.addEventListener("resize", handleResize);
        handleResize()
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        if (windowWidth < 575) {
            setWhenCollapsed('calc(100% - 0px)')
        } else {
            setWhenCollapsed('calc(100% - 75px)')
        }
    }, [windowWidth])

    function toggleOn() {
        setOpen(!open);
    }

    return (
        <div className='p-0 m-0 d-flex'>
            <div style={{ maxHeight: '100%' }}>
                <SidebarNav myCollapse={{ collapsed, setCollapsed }} />
            </div>
            <div className='container-fluid p-0 m-0' style={{
                width: collapsed ? whenCollapsed : 'calc(100% - 245px)',
                marginRight: '0px',
                transition: 'ease-in-out',
                position: 'fixed',
                right: '0'
            }}>
                <Navbar myCollapse={{ collapsed, setCollapsed }} />
                <div className='p-2 container-fluid' style={{ maxHeight: '90vh', overflowY: 'scroll', backgroundColor: '#dfdfdf', minHeight: '90vh' }}>
                    <AppContent />
                </div>

            </div>

        </div>
    )
}
