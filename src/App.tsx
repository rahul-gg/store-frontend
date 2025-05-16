import { BrowserRouter, Route, Routes } from "react-router"
import { SignUp } from "./pages/sign-up"
import { AuthProvider } from "./context/auth-context"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<>Home</>} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
