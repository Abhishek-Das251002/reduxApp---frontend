import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchStudents = createAsyncThunk("/students/fetchAllStudents", async () => {
    const response = await axios.get("https://redux-app-backend-sigma.vercel.app/students")

    return response.data
})

export const postStudents = createAsyncThunk("/students/postNewStudent", async (studentData) => {
    const response = await axios.post("https://redux-app-backend-sigma.vercel.app/students", studentData)

    return response.data
})


export const updateStudent = createAsyncThunk("/students/updateStudentData", async ({id, updatedData}) => {
    const response = await axios.put(`https://redux-app-backend-sigma.vercel.app/students/${id}`, updatedData)

    console.log(response)
    return response.data
})

export const deleteStudent = createAsyncThunk("/students/deleteStudent", async (id) => {
    const response = await axios.delete(`https://redux-app-backend-sigma.vercel.app/students/${id}`)

    console.log(response)
    return response.data
})

const initialState = {
    students: [],
    status: "idle",
    error: null,
    filter: "",
    sortBy: "name",
    schoolStats: {},
    topStudent: ""
}

export const studentSlice = createSlice({
    name: "students", 
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSortby: (state, action) => {
            state.sortBy = action.payload
        },
        updateSchoolStats: (state, action) => {
            state.schoolStats = action.payload
        },
        setTopStudent: (state, action) => {
            state.topStudent = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = "success";
            state.students = action.payload
        })
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload.message
        })
        builder.addCase(postStudents.fulfilled, (state, action) => {
            state.students.push(action.payload)
        }) 
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.students = state.students.map(student => student._id === action.payload._id ? action.payload : student)
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.students = state.students.filter(student => student._id !== action.payload.student._id)
        })
    } 
})

export const {setFilter, setSortby, updateSchoolStats, setTopStudent} = studentSlice.actions;
export default studentSlice.reducer;