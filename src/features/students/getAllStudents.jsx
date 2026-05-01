import { useDispatch, useSelector } from "react-redux"
import { fetchStudents } from "./studentsSlice"
import { useEffect } from "react"

const useAllStudents = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchStudents())
    },[])

    const allStudents = useSelector((state) => state.student.students)
    
    return allStudents
}

export default useAllStudents;