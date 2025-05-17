import { BrowserRouter, Route, Routes } from "react-router"
import { SignUp } from "./pages/sign-up"
import { AuthProvider } from "./context/auth-context"
import { SignIn } from "./pages/sign-in"
import { Home } from "./pages/home"
import { Layout } from "./pages/Layout"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
