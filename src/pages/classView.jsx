import Navbar from "../app/navbar";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/students/studentsSlice";
import { setSortby } from "../features/students/studentsSlice";
import { useEffect, useState } from "react";
import useAllStudents from "../features/students/getAllStudents";

const Class = () => {
    const dispatch = useDispatch()
    // const allStudents = useAllStudents()
    const {students, filter, sortBy} = useSelector((state) => state.student)

    function handleFilter(e){
        const {name, value} = e.target;
        if(name === "filterStudent"){
            dispatch(setFilter(value))
        }else{
            console.log(value)
            dispatch(setSortby(value))
        }
    }

    let newFilteredArray;
    const filteredStudents = filter ? students.filter(student => student.gender === filter) : students

    newFilteredArray = filteredStudents?.map(student => ({
    ...student,
    marks: student.marks == null ? 0 : student.marks,
    attendance: student.attendance == null ? 0 : student.attendance
    }));
        
    const sortedStudents = newFilteredArray.sort((a, b) => sortBy !== "name" ? a[sortBy] - b[sortBy]: a.name.localeCompare(b.name))

    console.log(sortBy)
    console.log(sortedStudents)
    return (
        <div>
            <Navbar/>
            <div className="my-3 container">
                <h2>Class View</h2>
                <label>Filter by Gender: </label>
                <select name="filterStudent" className="ms-2" onChange={handleFilter}>
                    <option value="">All</option>
                    <option value="male">Boys</option>
                    <option value="female">Girls</option>
                </select><br /><br />
                <label>Sort by: </label>
                <select className="ms-2" onChange={handleFilter}>
                    <option value="name">Name</option>
                    <option value="marks">Marks</option>
                    <option value="attendance">Attendance</option>
                </select>
                <ul className="mt-3">
                {sortedStudents?.map(student => (
                    <li>{student.name} - {student.gender} - Marks: {student.marks ? student.marks : "unknown"} - Attendance: {student.attendance ? student.attendance : "unknown"}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Class;