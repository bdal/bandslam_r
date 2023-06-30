import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <>
        <div id="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to ={`/home`}>Home</Link>
                    </li>
                    <li>
                        <Link to ={`/upload`}>Upload</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div id="detail">
            <Outlet/>
        </div>
        </>
    )
}

export default Root