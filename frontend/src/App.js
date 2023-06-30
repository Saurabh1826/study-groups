import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Header from './Header'
import Nav from './Nav'
import Login from './Login'
import Register from './Register'
import MyCourses from './MyCourses'
import CoursePage from './CoursePage'
import AddCourse from './AddCourse'
import NotFound from './NotFound'

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title='Header' />
        <Nav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myCourses/' element={<MyCourses />} />
          <Route path='/coursePage/:courseId' element={<CoursePage />} />
          <Route path='/addCourse/' element={<AddCourse />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
