import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IngredientsPage from "./pages/IngredientsPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ingredients" element={ <ProtectedRoute><IngredientsPage /></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><SavedRecipesPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;