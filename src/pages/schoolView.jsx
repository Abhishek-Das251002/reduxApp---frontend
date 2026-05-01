import { useEffect } from "react";
import Navbar from "../app/navbar";
import useAllStudents from "../features/students/getAllStudents";
import { fetchStudents } from "../features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateSchoolStats, setTopStudent } from "../features/students/studentsSlice";
const School = () => {
    const dispatch = useDispatch()
    const {students, schoolStats, topStudent } = useSelector(state => state.student)

    useEffect(() => {
        dispatch(fetchStudents())

        if(students.length !== 0){
            const totalStudents = students.length;
            const avgAttendence = (students.reduce((acc, curr) => curr.attendance ? acc = acc + curr.attendance : acc, 0)/students.length).toFixed(2)
            const avgMarks = (students.reduce((acc, curr) => curr.marks ? acc = acc + curr.marks: acc, 0)/students.length).toFixed(2)
            const schoolTopper = students.reduce((acc, curr) => curr.marks > acc.marks ? acc = curr: acc).name

            dispatch(updateSchoolStats({totalStudents: totalStudents, averageAtt: avgAttendence, averageMarks: avgMarks, topper: schoolTopper}))
            dispatch(setTopStudent(schoolTopper))
        }     
    },[])
    
    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1>School View</h1>
                <p>Total Students: {schoolStats.totalStudents}</p>
                <p>Average Attendance: {schoolStats.averageAtt}</p>
                <p>Average Marks: {schoolStats.averageMarks}</p>
                <p>Top Student: {topStudent ? topStudent : "-"}</p>
            </div>
        </div>
    )
}

export default School;