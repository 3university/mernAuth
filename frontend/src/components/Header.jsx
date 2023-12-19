import {AppBar, Box, Toolbar, Typography, Tab, Tabs} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () =>{

    const [value, setValue] = useState()
    return(
        <div>
            <AppBar position="sticky">
               <Toolbar>
                <Typography varient="h1">mernAuth</Typography>
                <Box sx={{marginLeft:"auto"}}>
                    <Tabs indicatorColor="secondary" onChange ={(e,val)=>{setValue(val)}} value={value} textColor="inherit">
                        <Tab to="/login" LinkComponent={Link} label="Login"></Tab>
                        <Tab to="/signup" LinkComponent={Link} label="Signup"></Tab>
                    </Tabs>
                </Box>
               </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header