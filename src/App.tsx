import { BrowserRouter, Route, Routes } from "react-router"
import { SignUp } from "./pages/sign-up"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
