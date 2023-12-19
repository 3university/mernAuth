import axios from "axios"
import { useEffect, useState } from "react"
axios.defaults.withCredentials=true
let firstRender = true

const Welcome = () =>{

    const [userDetials, setUserDetials] = useState()

    const refreshToken = async() =>{
        const res = await axios.get("http://localhost:4000/api/refresh", {
            withCredentials:true
        }).catch((error)=>{
            console.log("failed to send the request for refresh token")
        })
        const data = await res.data
        return data
    }

    const sendUserDetailsRequest = async() =>{
        const res = await axios.get("http://localhost:4000/api/user", {
            withCredentials:true
        }).catch((error)=>{console.log("failed to get user data")})
        const data = await res.data
        return data
    }

    useEffect(()=>{
        if(firstRender){
            firstRender = false
            sendUserDetailsRequest().then((data)=>{setUserDetials(data.user)})
        }

        // making the refreshtoken run after every 28s
        let refreshInterval = setInterval(()=>{
            refreshToken().then(data =>{setUserDetials(data.user)})
        }, 1000*28)

        // useeffect cleanup funtion to destory refreshInterval
        return ()=>{clearInterval(refreshInterval)}
    }, [])


    return(
        <div>
            {userDetials && <h1>{userDetials.name}</h1>}
        </div>
    )
}

export default Welcome