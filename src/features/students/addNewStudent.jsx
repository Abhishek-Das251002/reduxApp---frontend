import { useState } from "react";
import Navbar from "../../app/navbar";
import { useDispatch } from "react-redux";
import { postStudents } from "./studentsSlice";
import { updateStudent } from "./studentsSlice";
import { useParams } from "react-router-dom";
import AllStudents from "./getAllStudents";

const AddStudent = () => {
    const {id} = useParams()
    const allStudents = AllStudents()

    const currentStudent = allStudents.find(std => std._id === id)

    const [studentDetails, setStudentDetails] = useState({
        name: "",
        age: "",
        grade: "",
        gender: "",
    })

    const [updateStudentDetails, setUpdateDetails] = useState({
        name: currentStudent?.name || "",
        age: currentStudent?.age || "",
        grade: currentStudent?.grade || "", 
        gender: currentStudent?.gender || "",
        attendance: currentStudent?.attendance ? currentStudent.attendance : "",
        marks: currentStudent?.marks ? currentStudent.marks : "",
    })
    
    const dispatch = useDispatch()

    function handleChange(e){
        const {value, name} = e.target;
        if(id){
            if(name === "age" || name === "attendance" || name === "marks"){
                setUpdateDetails(prev => ({...prev, [name]: parseFloat(value)}))
            }else{
                setUpdateDetails(prev => ({...prev, [name]: value}))
            }
        }else{
            if(name === "age"){
                setStudentDetails(prev => ({...prev, [name]: parseFloat(value)}))
            }else{
                setStudentDetails(prev => ({...prev, [name]: value}))
            }
        }
    }

    
    function handleSubmit(e){
        e.preventDefault()

        if(id){
            dispatch(updateStudent({id, updatedData: updateStudentDetails}))
            // setUpdateDetails({
            //     name: currentStudent.name,
            //     age: currentStudent.age,
            //     grade: currentStudent.grade, 
            //     gender: currentStudent.gender,
            //     attendance: currentStudent.attendance ? currentStudent.attendance : "",
            //     marks: currentStudent.marks ? currentStudent.marks : "",
            // })
        }else{
            dispatch(postStudents(studentDetails))
            setStudentDetails({
                name: "",
                age: "",
                grade: "",
                gender: ""
            })
        } 
    }

    console.log(updateStudentDetails)

    return (
        <div>
        <Navbar/>
        <div className="container mt-4">
            <h3>Add Student</h3>
            {id 
            ?
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={updateStudentDetails.name} name="name" onChange={handleChange} required/> <br /><br />
                <input type="number" placeholder="Age" value={updateStudentDetails.age} name="age" onChange={handleChange} required/><br /><br />
                <input type="text" placeholder="Grade" value={updateStudentDetails.grade} name="grade" onChange={handleChange} required/><br /><br />
                <div>
                    <label>Gender : </label>
                    <input type="radio"  className="ms-2 me-1" value="male" name="gender" checked={updateStudentDetails.gender === "male"} onChange={handleChange} required/> Male
                    <input type="radio" className="ms-2 me-1" value="female" name="gender" checked={updateStudentDetails.gender === "female"} onChange={handleChange}/> Female
                </div><br />
                <input type="number" placeholder="Attendance" value={updateStudentDetails.attendance} name="attendance" onChange={handleChange}/><br /><br />
                <input type="number" placeholder="Marks" value={updateStudentDetails.marks} name="marks" onChange={handleChange}/><br /><br />
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            :
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={studentDetails.name} name="name" onChange={handleChange} required/> <br /><br />
                <input type="number" placeholder="Age" value={studentDetails.age} name="age" onChange={handleChange} required/><br /><br />
                <input type="text" placeholder="Grade" value={studentDetails.grade} name="grade" onChange={handleChange} required/><br /><br />
                <div>
                    <label>Gender : </label>
                    <input type="radio"  className="ms-2 me-1" value="male" name="gender" checked={studentDetails.gender === "male"} onChange={handleChange} required/> Male
                    <input type="radio" className="ms-2 me-1" value="female" name="gender" checked={studentDetails.gender === "female"} onChange={handleChange}/> Female
                </div><br />
                <button type="submit">Add Student</button>
            </form>
            }
        </div>            
        </div>
    )
}

export default AddStudent;

