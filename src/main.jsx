import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import App from './App.jsx'
import AddStudent from './features/students/addNewStudent.jsx'
import StudentDetail from './pages/studentDetails.jsx'
import Class from './pages/classView.jsx'
import School from './pages/schoolView.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/addStudent",
    element: <AddStudent/>
  },
  {
    path: "/details/:id",
    element: <StudentDetail/>
  },
  {
    path: "/addStudent/:id",
    element: <AddStudent/>
  },
  {
    path: "/classes",
    element: <Class/>
  },
  {
    path: "/school",
    element: <School/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
