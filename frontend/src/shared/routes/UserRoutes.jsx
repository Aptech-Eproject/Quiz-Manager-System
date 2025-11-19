import { Route } from 'react-router-dom'

import ProtectedRouter from "../router/ProtectedRouter";
import QuizPlay from '../../features/quiz/pages/QuizPlay'
import QuizPreview from '../../features/quiz/pages/QuizPreview';

export default function UserRoutes() {
    return (
        <>
            <Route element={<ProtectedRouter allowedRoles={['user','admin']} />}>
                <Route path='/quiz/:quizId/play' element={<QuizPlay />} />
                <Route path='/quiz/:quizId/preview/' element={<QuizPreview />} />
            </Route>
        </>
    )
}
