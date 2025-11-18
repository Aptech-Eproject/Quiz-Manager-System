import { Route } from "react-router-dom"

import Home from '../pages/Home';
import QuizzesList from '../../features/quiz/pages/QuizzesList';
import FavoriteQuizzes from '../../features/quiz/pages/FavoriteQuizzes';
import Login from '../../features/auth/pages/Login';
import Register from '../../features/auth/pages/Register';
import SetPassword from '../../features/auth/pages/SetPassword';

function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes-list" element={<QuizzesList />} />
            <Route path="/favorite-quizzes" element={<FavoriteQuizzes />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/set-password" element={<SetPassword />} />
        </>
    )
}

export default PublicRoutes