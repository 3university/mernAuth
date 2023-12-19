import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () =>{

    const history = useNavigate()

    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setInputs(prev=>({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    const sendRequest = async() =>{
        const res = await axios.post("http://localhost:4000/api/signup", {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch((error)=>{
            console.log("Error while sending data to backend", error.message)
        })
        const userData =  await res.data.message
        return userData
    }
    

    const handleSubmit = (e) =>{
        e.preventDefault()
        sendRequest().then(()=>history("/login"))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" width={300} justifyContent="center" alignItems="center" marginTop={5}>
                    <Typography variant="h3">Signup Form</Typography>
                        <TextField onChange={handleChange} name="name" value={inputs.name} label="Name" margin="normal"/>
                        <TextField onChange={handleChange} name="email" value={inputs.email} label="Email" margin="normal"/>
                        <TextField onChange={handleChange} name="password" value={inputs.password} label="Password" margin="normal"/>
                        <Button type="submit">Sign Up</Button>
                </Box>
            </form>
        </div>
    )
}

export default Signup