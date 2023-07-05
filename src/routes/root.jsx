import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <>
        <div id="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to ={`/viewer`}>Viewer</Link>
                    </li>
                    <li>
                        <Link to ={`/upload`}>Upload</Link>
                    </li>
                    <li>
                        <Link to ={`/temp`}>Temp</Link>
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