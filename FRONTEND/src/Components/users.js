import {  useState } from "react";
import { useEffect } from "react";
import { deleteUser } from "../services/api";
import { getpublisher } from "../services/api";

function User()
{
    const [info, setInfo] = useState([]);

    useEffect( () => {
        getpublisherdetails();
    });
    
    const getpublisherdetails= async() =>
    {
        const result= await getpublisher();
        setInfo(result.data);
    }
    
    const handledelete = async (id) => {
        await deleteUser(id);
        getpublisherdetails();
      }
      
    return(
        <div>
            <img style={{width:"120px", height:"150px", marginLeft:"600px"}} src="logo.png" alt=".."/>
            <h1 style={{fontFamily:"monospace"}}> Recently created Accounts</h1>
                 <table className="table table-bordered">
                    <tr style={{backgroundColor:"black", color:"white"}} >
                        
                       
                        <th >Publisher name</th>
                        
                       
                        <th>Email address</th>
                    </tr>

                    {

                        info.map((details) => (
                            <tr >
                                <td>{details.username}</td>
                               
                                <td>{details.email}</td>
                                <td><button style={{backgroundColor:'darkred', color:"white", border:"none", shape:"roundco"}} onClick={() => handledelete(details._id)} >Delete</button></td>
                            </tr>
                        ))


                    }

                </table>
                

        </div>
    )
}
export default User;