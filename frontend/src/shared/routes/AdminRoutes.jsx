import { Navigate, Route } from "react-router-dom";

import ProtectedRouter from "../router/ProtectedRouter";
import AdminLayout from "../layout/AdminLayout";
import AdminQuizzesList from "../../features/quiz/pages/AdminQuizzesList";
import CreateQuizRouter from "../../features/quiz/router/CreateQuizRouter";
import QuizManageLayout from "../../features/quiz/layout/QuizManageLayout";
import QuizStats from "../../features/quiz/pages/QuizStats";
import QuizBuilder from "../../features/quiz/pages/QuizBuilder";

export default function AdminRoutes() {
    return (
        <>
            <Route
                element={<ProtectedRouter />} allowedRoles={['admin']}
            >
                {/* <Route path='/admin/' element={<AdminLayout />}> */}
                <Route path='/admin/'>
                    <Route index element={<Navigate to='/admin/quizzes-list' />} />
                    <Route path='quizzes-list' element={<AdminQuizzesList />} />
                    <Route path='create-quiz/*' element={<CreateQuizRouter />} />

                    <Route path="manage/" element={<QuizManageLayout />}>
                        <Route path='quiz/:quizId/builder' element={<QuizBuilder />} />
                        <Route path='quiz/:quizId/statistics' element={<QuizStats />} />
                    </Route>
                </Route>
            </Route>
        </>
    )
}
