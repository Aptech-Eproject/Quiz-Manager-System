import { Outlet, useLocation } from "react-router-dom";

import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
    const location = useLocation();

    const hideHeaderRoutes = [
        '/admin/create-quiz/step-1',
        '/admin/create-quiz/step-2',

        // `/admin/:quizId/manage/builder`
        // `/admin/:quizId/manage/statistics`

        `/admin/manage/quiz/1/builder`,
        `/admin/manage/quiz/1/statistics`
    ];

    const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

    return (
        <div className="bg-white">
            {shouldShowHeader && <AdminHeader />}

            <Outlet />
        </div>
    )
}
