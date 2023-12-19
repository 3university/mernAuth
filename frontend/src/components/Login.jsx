import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () =>{
    const history = useNavigate()

    const [loginInputs, setLoginInputs] = useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setLoginInputs(prev=>({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    const sendLoginRequest = async() =>{
        const res = await axios.post("http://localhost:4000/api/login", {
            email: loginInputs.email,
            password: loginInputs.password
        }).catch((error)=>{
            console.log("Error while sending data to backend", error.message)
        })
        console.log(res.data.message)
        const userData =  await res.data.message
        return userData
    }
    

    const handleLoginSubmit = (e) =>{
        e.preventDefault()
        sendLoginRequest().then(()=>history("/user"))
    }

    return(
        <div>
            <form onSubmit={handleLoginSubmit}>
                <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" width={300} justifyContent="center" alignItems="center" marginTop={5}>
                    <Typography variant="h3">Login Form</Typography>
                        <TextField onChange={handleChange} name="email" value={loginInputs.email} label="Email" margin="normal"/>
                        <TextField onChange={handleChange} name="password" value={loginInputs.password} label="Password" margin="normal"/>
                        <Button type="submit">Login</Button>
                </Box>
            </form>
        </div>
    )
}
export default Login