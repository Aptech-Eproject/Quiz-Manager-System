import { Route } from 'react-router-dom'

import ProtectedRouter from "../router/ProtectedRouter";
import QuizPlay from '../../features/quiz/pages/QuizPlay'

export default function UserRoutes() {
    return (
        <>
            <Route element={<ProtectedRouter allowedRoles={['user']} />}>
                {/* <Route path='/quiz/:id/play' element='' /> */}
                <Route path='/quiz/1/play' element={<QuizPlay />} />
            </Route>
        </>
    )
}
