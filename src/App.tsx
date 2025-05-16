import { BrowserRouter, Route, Routes } from "react-router"
import { SignUp } from "./pages/sign-up"
import { AuthProvider } from "./context/auth-context"
import { SignIn } from "./pages/sign-in"
import { Home } from "./pages/home"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
