import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"

const Signup = () =>{

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

    

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(inputs)
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