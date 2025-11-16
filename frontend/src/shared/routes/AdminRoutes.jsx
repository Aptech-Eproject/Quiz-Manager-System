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
                <Route path='/admin/' element={<AdminLayout />}>
                    <Route index element={<Navigate to='/admin/quizzes-list' />} />
                    <Route path='quizzes-list' element={<AdminQuizzesList />} />
                    <Route path='create-quiz/*' element={<CreateQuizRouter />} />

                    {/* lúc code sửa 1 => quizId */}

                    {/* <Route path='/:quizId/manage/builder' element={<QuizBuilder />} /> */}
                    {/* <Route path='/:quizId/manage/stats' element={<QuizStats />} /> */}

                    <Route path="manage/" element={<QuizManageLayout />}>
                        <Route path='quiz/1/' element={<Navigate to='/admin/manage/quiz/1/builder' />} />
                        <Route path='quiz/1/builder' element={<QuizBuilder />} />
                        <Route path='quiz/1/statistics' element={<QuizStats />} />
                    </Route>
                </Route>
            </Route>
        </>
    )
}
