import { Link } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import { useState } from "react";
import Review from "./Review";
function Admin(){
    

    return(
        
        <div>
   <img className="navbar-brand" src='logo.png' alt='nothing' style={{width:"100px", height:"100px", marginLeft:"700px"}}/>
   <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid" style={{backgroundColor:"Black", height:"40px"}}>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       

        <li className="nav-item" >
         <Link style={{textDecoration:"none" , color:"black",color:"white"}} to="/Reader">
       <h3 style={{marginLeft:"100px", fontFamily:"Poppins" }}>Welcome To LifeStyle Blog </h3> 
        </Link>
        </li>

        <li className="nav-item" >
         <Link style={{textDecoration:"none" , color:"black", fontFamily:"Bold", color:"white"}} to="/">
       <p style={{marginLeft:"1000px",fontSize:20, fontFamily:"Poppins"}}>Logout </p> 
        </Link>
        </li>
        </ul>
        </div>
        </div>
        </nav>
    
     
        <div style={{postion:"relative"}} className="maintxt">
                 <img style={{marginLeft:"-10px",postion:"absolute", width:"1600px", height:"800px"}}  src="lo.jpg" className="img-responsive"/>              
       <Link to="/Users"><button style={{ marginTop:"-700px", position:"absolute", backgroundColor:"black", color:"white", height:"50px", marginLeft:"500px"}}> Manage Users</button>
       </Link>
       <Link to="/Blogs"><button style={{ marginTop:"-600px", position:"absolute", backgroundColor:"black", color:"white", height:"50px", marginLeft:"500px"}}> Manage Blogs</button>
       </Link>
      
        </div>
        </div>

    )
}
export default Admin;