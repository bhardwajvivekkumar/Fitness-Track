import "./App.css";
import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState } from "react";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorial from "./pages/Tutorial";
import Blogs from "./pages/blogs";
import BlogDetail from "./pages/BlogDetail";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const [user, SetUser] = useState(true);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {user ? (
          <Container>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/Workouts" exact element={<Workouts />} />
              <Route path="/tutorials" exact element={<Tutorial />} />
              <Route path="/blogs" exact element={<Blogs />} />
              <Route path="/blog/:index" exact element={<BlogDetail />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
