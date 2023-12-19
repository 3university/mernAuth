import axios from "axios"
import { useEffect, useState } from "react"
axios.defaults.withCredentials=true


const Welcome = () =>{

    const [userDetials, setUserDetials] = useState()

    const sendUserDetailsRequest = async() =>{
        const res = await axios.get("http://localhost:4000/api/user", {
            withCredentials:true
        }).catch((error)=>{console.log("failed to get user data")})
        const data = await res.data
        return data
    }

    useEffect(()=>{
        sendUserDetailsRequest().then((data)=>{setUserDetials(data.user)})
    }, [])


    return(
        <div>
            {userDetials && <h1>{userDetials.name}</h1>}
        </div>
    )
}

export default Welcome