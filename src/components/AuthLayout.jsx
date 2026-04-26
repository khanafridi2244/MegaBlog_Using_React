import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        const timer = setTimeout(() => setLoader(false), 0)
        return () => clearTimeout(timer)
    }, [authStatus, navigate, authentication])

    return loader ? (
        <div className="min-h-screen flex items-center justify-center bg-bg-page">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin-slow w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
                <p className="text-text-secondary text-sm animate-pulse-soft">Loading...</p>
            </div>
        </div>
    ) : <>{children}</>
}

