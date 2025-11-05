import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from 'react-router'
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"

function App() {
  
  return (
    <>
    <Toaster/>

    {/* bật chế độ Routing */}
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage/>}/>

        {/* *: đường dẫn k phù hợp sẽ vào path này */}
        <Route path="*" element={<NotFound/>}/>

        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
