import { useSelector, useDispatch } from "react-redux"
import { fetchStudents } from "./studentsSlice"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

const StudentsList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudents())
    },[])

    const {students, status, error} = useSelector((state) => state.student)

    console.log(students)

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {status === "loading" && <p>Loading....</p>}
                {status === "error" && <p>{error}</p>}
                {students.map(student => (
                    <li><NavLink to={`/details/${student._id}`}>{student.name} (Age: {student.age})</NavLink></li>
                ))}
            </ul>
        </div>
    )
}

export default StudentsList