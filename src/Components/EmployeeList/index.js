import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
const EmployeeList = () => {
  const[employees,setEmployees]=useState([])

  useEffect(()=>{
    getAllEmployees();
  },[])
  const getAllEmployees=async()=>{
    try{
const response=await axios.get('http://localhost:5000/employees')
setEmployees(response.data);
    }catch(err){
      console.log('Error',err)
    }
  }

  const handleDelete=async(empID)=>{
try{
const response=await axios.delete(`http://localhost:5000/employees/${empID}`)
if(response){
  getAllEmployees();

}
}catch(error){
  console.log("Error")
}
  }
  return (
    <div className='employeelist'>
    <h3>EmployeeList</h3>
    <table className='table table-striped'>
<thead>
<tr>
  <th>Name</th>
  <th>Email</th>
  <th>Mobile Number</th>
  <th>Address</th>
  <th>d.o.b</th>
  <th>Role</th>
  <th>Action</th>
</tr>
</thead>
<tbody>
{employees.length > 0 && employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobileNumber}</td>
                            <td>{employee.address}</td>
                            <td>{employee.dob}</td>
                            <td>{employee.profession}</td>
                            <td>
                            <NavLink  className="btn btn-link"  to={`/employees/${employee._id}/update`}>Edit</NavLink>
                      <button className="btn btn-link" onClick={()=>handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
</tbody>
    </table>
    </div>
  )
}

export default EmployeeList
//<NavLink className="btn btn-link" to="/employees/1/update">Edit</NavLink>
//<button className="btn btn-link">Delete</button>