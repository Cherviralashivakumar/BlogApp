import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
// import EditBlog from "./pages/EditBlog";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route 
                path="/create" 
                element={
                  // <ProtectedRoute>
                    <CreateBlog />
                  // </ProtectedRoute>
                } 
              />
              {/* <Route 
                path="/edit/:id" 
                element={
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                } 
              /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
