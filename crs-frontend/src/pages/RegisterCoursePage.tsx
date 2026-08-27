import { useState } from 'react';
import axios from 'axios';

import { useCourses } from '../api/useCourses';
import { registerCourse } from '../api/registrationApi';

import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';

import type { Course } from '../types/course';
import type { ApiErrorResponse } from '../types/apiError';

export default function RegisterCoursePage() {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);

    const [registeringId, setRegisteringId] =
        useState<number | null>(null);

    const { user } = useAuth();

    const {
        toast,
        showToast,
        clearToast,
    } = useToast();

    const {
        courses,
        totalPages,
        state,
        errorMessage,
        refetch,
    } = useCourses(keyword, page);

    const handleSearch = (
        newKeyword: string
    ) => {
        setKeyword(newKeyword);
        setPage(0);
    };

    const handleRegister = async (
        course: Course
    ) => {
        if (!user) {
            return;
        }

        setRegisteringId(course.id);

        try {
            await registerCourse({
                studentId: user.id,
                courseId: course.id,
            });

            showToast(
                `Đăng ký thành công môn "${course.tenMonHoc}"`,
                'success'
            );

            refetch();

        } catch (err) {

            let message =
                'Đăng ký không thành công, vui lòng thử lại.';

            if (
                axios.isAxiosError<
                    ApiErrorResponse
                >(err) &&
                err.response?.data?.message
            ) {
                message =
                    err.response.data.message;
            }

            showToast(
                message,
                'error'
            );

        } finally {
            setRegisteringId(null);
        }
    };

    return (
        <div className="app-page">
            <div className="app-container">

                <div className="page-header">

                    <div className="page-icon">
                        📝
                    </div>

                    <h1 className="page-title">
                        Đăng ký học phần
                    </h1>

                    <p className="page-subtitle">
                        Chọn môn học còn chỗ để đăng ký
                    </p>

                </div>

                <div className="search-card">

                    <SearchBox
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm môn học..."
                    />

                </div>

                <div className="course-card">
                    <CourseList
                        courses={courses}
                        state={state}
                        errorMessage={errorMessage}
                        onRetry={refetch}
                        onRegister={handleRegister}
                        registeringId={registeringId}
                    />

                </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={clearToast}
                    />
                )}

            </div>
        </div>
    );
}