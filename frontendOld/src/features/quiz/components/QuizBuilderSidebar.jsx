import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { quizAPI } from "../../../shared/services/api";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import {
    Edit2,
    Loader2,
    RefreshCw,
    Send
} from "lucide-react";

export default function QuizBuilderSidebar({ quizId, quizData, thumbnailFile, validateQuizData }) {
    const location = useLocation();
    const checkActive = (path) => location.pathname === path;
    const navigate = useNavigate();

    const [isPublishing, setIsPublishing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handlePublishQuiz = async () => {
        if (quizData.status !== 'draft') return;

        const errors = validateQuizData();
        if (errors.length > 0) {
            Swal.fire({
                title: 'Validation Failed',
                html: `
                    <div style="text-align: left; padding: 10px;">
                        <p style="margin-bottom: 15px; color: #374151;">
                            Please fix the following errors before publishing:
                        </p>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            ${errors.map(error => `
                                <li style="
                                    padding: 8px 12px;
                                    margin-bottom: 8px;
                                    background: #f5f5f5;        /* xám rất nhạt */
                                    color: #333;                 /* chữ đậm vừa */
                                    border-radius: 6px;
                                    font-size: 14px;
                                    border: 1px solid #e5e7eb;  /* đường viền mảnh để nổi nhẹ */
                                ">
                                    ⚠️ ${error}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `,
                icon: 'error',
                confirmButtonText: 'Got it',
                confirmButtonColor: '#2563eb',
                background: '#ffffff',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    confirmButton: 'swal-custom-button'
                }
            });

            return;
        }

        setIsPublishing(true);

        try {
            const formData = new FormData();

            formData.append('title', quizData.title || '');
            formData.append('category', quizData.category || '');
            formData.append('description', quizData.description || '');
            formData.append('duration', quizData.duration || 0);
            formData.append('level', quizData.level || '');
            formData.append('pass_score', quizData.pass_score || 70);
            if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

            await quizAPI.publish(quizId, quizData);
            await new Promise(resolve => setTimeout(resolve, 800));

            toast.success('Quiz published successfully!');
            navigate("/admin/quizzes-list");

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown';
            toast.error(`Failed to publish quiz: ${errorMessage}`);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleUpdateQuiz = async () => {
        if (isUpdating) return;

        const errors = validateQuizData();
        if (errors.length > 0) {
            Swal.fire({
                title: 'Validation Failed',
                html: `
                    <div style="text-align: left; padding: 10px;">
                        <p style="margin-bottom: 15px; color: #374151;">Please fix the following errors before updating:</p>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            ${errors.map(error => `
                                <li style="
                                        padding: 8px 12px;
                                        margin-bottom: 8px;
                                        background: #f5f5f5;        /* xám rất nhạt */
                                        color: #333;                 /* chữ đậm vừa */
                                        border-radius: 6px;
                                        font-size: 14px;
                                        border: 1px solid #e5e7eb;  /* đường viền mảnh để nổi nhẹ */
                                    ">
                                    ⚠️ ${error}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `,
                icon: 'error',
                confirmButtonText: 'Got it',
                confirmButtonColor: '#2563eb',
                background: '#ffffff',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    confirmButton: 'swal-custom-button'
                }
            });
            return;
        }

        setIsUpdating(true);

        try {
            const formData = new FormData();

            formData.append('title', quizData.title || '');
            formData.append('category', quizData.category || '');
            formData.append('description', quizData.description || '');
            formData.append('duration', quizData.duration || 0);
            formData.append('level', quizData.level || '');
            formData.append('pass_score', quizData.pass_score || 70);

            if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

            await quizAPI.update(quizId, formData);
            await new Promise(resolve => setTimeout(resolve, 800));

            toast.success('Quiz updated successfully!');
            navigate("/admin/quizzes-list");

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown';
            toast.error(`Failed to update quiz: ${errorMessage}`);
        } finally {
            setIsUpdating(false);
        }
    };


    return (
        <div className="min-w-55 h-full pt-10 flex flex-col space-y-8">
            <div className="flex flex-col space-y-10 w-full">
                {/* Create your quiz */}
                <div className="flex flex-col">
                    <p className="py-2 text-[18px] font-bold">
                        Create your quiz
                    </p>
                    <Link
                        to={`/admin/manage/quiz/${quizId}/builder`}
                        className={`py-1.5 px-9 text-left text-[16px] cursor-pointer hover:bg-gray-200 
                            ${checkActive(`/admin/manage/quiz/${quizId}/builder`) ? `border-l-4` : ''}`}
                    >
                        Builder
                    </Link>
                </div>

                {/* Manage your course */}
                <div className="flex flex-col">
                    <p className="py-2 text-[18px] font-bold">
                        Manage your course
                    </p>
                    <Link
                        to={`/admin/manage/quiz/${quizId}/statistics`}
                        className={`py-1.5 px-9 text-left text-[16px] cursor-pointer hover:bg-gray-200
                        ${checkActive(`/admin/manage/quiz/${quizId}/statistics`) ? `border-l-4` : ''}`}
                    >
                        Statistics
                    </Link>

                </div>
            </div>

            {/* Submit Button */}
            {quizData.status === 'draft' ? (
                <button
                    onClick={handlePublishQuiz}
                    disabled={isPublishing}
                    className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold w-full py-2 px-5 rounded-sm cursor-pointer transition shadow-xl flex items-center justify-center gap-2 ${isPublishing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-600'
                        }`}
                >
                    {isPublishing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Publishing...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Publish Quiz
                        </>
                    )}
                </button>
            ) : (
                <button
                    onClick={handleUpdateQuiz}
                    disabled={isUpdating}
                    className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold w-full py-2 px-5 rounded-sm cursor-pointer transition shadow-xl flex items-center justify-center gap-4 ${isUpdating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-600'
                        }`}
                >
                    {isUpdating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Edit2 className="w-5 h-5" />
                            Update Quiz
                        </>
                    )}
                </button>
            )}
        </div>
    )
}