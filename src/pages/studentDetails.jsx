import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";
import { useEffect } from "react";
import Navbar from "../app/navbar";
import { deleteStudent } from "../features/students/studentsSlice";

const StudentDetail = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchStudents())
    },[])

    const {students} = useSelector(state => state.student)

    const currStudent = students.filter(student => student._id == id)

    function handleDelete(id){
        dispatch(deleteStudent(id))
        navigate("/")
    }

    return (
        <div>
            <Navbar/>
            <div className="container my-3">
            <h2>Student Detail</h2>
            {currStudent.map(student => (
                <div>
                <div>
                    <p>Name: {student.name}</p>
                    <p>Age: {student.age}</p>
                    <p>Grade: {student.grade}</p>
                    {student.attendance && <p>Attendance: {student.attendance}</p>}
                    {student.marks && <p>Marks: {student.marks}</p>}
                </div>
                <button className="btn btn-warning" onClick={() => navigate(`/addStudent/${student._id}`)}>Edit Details</button>
                <button className="btn btn-danger ms-3" onClick={() => handleDelete(student._id)}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default StudentDetail;