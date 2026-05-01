import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import Navbar from "./app/navbar";
import StudentsList from "./features/students/studentList";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate()

  return (
    <div>
        <Navbar/>
        <div className="container">
        <div className="my-3">
            <h1>Student View</h1>
            <button className="btn btn-warning" onClick={() => navigate("/addStudent")}>Add student</button>
        </div>
        <StudentsList/>
        </div>
    </div>
  )
}

export default App;
