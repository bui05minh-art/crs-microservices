import { useState } from 'react';

import { useCourses } from './api/useCourses';

import {
    createCourse,
    updateCourse,
    deleteCourse,
} from './api/courseApi';

import SearchBox from './components/SearchBox';
import CourseList from './components/CourseList';
import Pagination from './components/Pagination';
import CourseForm from './components/CourseForm';

import type {
    Course,
    CourseFormValues,
} from './types/course';


function App() {

    // =========================
    // TÌM KIẾM
    // =========================

    const [keyword, setKeyword] =
        useState('');


    // =========================
    // PHÂN TRANG
    // =========================

    const [page, setPage] =
        useState(0);


    // =========================
    // MÔN ĐANG SỬA
    // =========================

    const [editingCourse, setEditingCourse] =
        useState<Course | null>(null);


    // =========================
    // TRẠNG THÁI SUBMIT
    // =========================

    const [submitting, setSubmitting] =
        useState(false);


    // =========================
    // LỖI SERVER
    // =========================

    const [serverError, setServerError] =
        useState<string | null>(null);


    // =========================
    // LẤY DANH SÁCH MÔN HỌC
    // =========================

    const {
        courses,
        totalPages,
        state,
        errorMessage,
        refetch,
    } = useCourses(
        keyword,
        page
    );


    // =========================
    // TÌM KIẾM
    // =========================

    const handleSearch = (
        newKeyword: string
    ) => {

        setKeyword(newKeyword);

        // Khi tìm kiếm thì quay về trang đầu
        setPage(0);
    };


    // =========================
    // THÊM / SỬA
    // =========================

    const handleSubmit = async (
        values: CourseFormValues
    ) => {

        try {

            setSubmitting(true);

            setServerError(null);


            // Dữ liệu gửi lên backend
            const data = {

                tenMonHoc:
                    values.tenMonHoc.trim(),

                soTinChi:
                    Number(values.soTinChi),

                soChoToiDa:
                    Number(values.soChoToiDa),

            };


            // =====================
            // TRƯỜNG HỢP SỬA
            // =====================

            if (editingCourse) {

                await updateCourse(
                    editingCourse.id,
                    data
                );

            }


                // =====================
                // TRƯỜNG HỢP THÊM
            // =====================

            else {

                await createCourse(data);

            }


            // Thành công
            setEditingCourse(null);

            setServerError(null);


            // Lấy lại danh sách
            await refetch();

        } catch (error: any) {

            console.error(error);


            // Lấy message từ backend
            setServerError(
                error?.response?.data?.message ??
                'Có lỗi xảy ra. Vui lòng thử lại.'
            );

        } finally {

            setSubmitting(false);

        }
    };


    // =========================
    // BẤM SỬA
    // =========================

    const handleEdit = (
        course: Course
    ) => {

        setServerError(null);

        setEditingCourse(course);
    };


    // =========================
    // HỦY SỬA
    // =========================

    const handleCancel = () => {

        setEditingCourse(null);

        setServerError(null);
    };


    // =========================
    // XÓA
    // =========================

    const handleDelete = async (
        course: Course
    ) => {

        const confirmed =
            window.confirm(
                `Bạn có chắc muốn xóa môn "${course.tenMonHoc}" không?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setServerError(null);


            await deleteCourse(
                course.id
            );


            // Lấy lại danh sách
            await refetch();

        } catch (error: any) {

            console.error(error);


            setServerError(
                error?.response?.data?.message ??
                'Không thể xóa môn học.'
            );

        }
    };


    return (

        <div
            style={{
                minHeight: '100vh',

                background:
                    'linear-gradient(135deg, #f5f7fb, #eef2ff)',

                padding: '40px 20px',

                boxSizing: 'border-box',
            }}
        >

            <div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}
            >

                {/* =====================
            TIÊU ĐỀ
        ====================== */}

                <div
                    style={{
                        marginBottom: '28px',
                    }}
                >

                    <h1
                        style={{
                            margin: 0,
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#111827',
                        }}
                    >
                        Quản lý môn học
                    </h1>


                    <p
                        style={{
                            marginTop: '8px',
                            color: '#6b7280',
                        }}
                    >
                        Thêm, sửa, xóa và tìm kiếm môn học
                    </p>

                </div>


                {/* =====================
            FORM
        ====================== */}

                <CourseForm

                    /*
                     * key giúp form được tạo lại
                     * khi chuyển sang môn khác.
                     */
                    key={
                        editingCourse?.id ?? 'new'
                    }

                    editingCourse={
                        editingCourse
                    }

                    onSubmit={
                        handleSubmit
                    }

                    onCancel={
                        handleCancel
                    }

                    submitting={
                        submitting
                    }

                    serverError={
                        serverError
                    }

                />


                {/* =====================
            TÌM KIẾM
        ====================== */}

                <SearchBox
                    onSearch={
                        handleSearch
                    }
                />


                {/* =====================
            DANH SÁCH
        ====================== */}

                <CourseList

                    courses={
                        courses
                    }

                    state={
                        state
                    }

                    errorMessage={
                        errorMessage
                    }

                    onRetry={
                        refetch
                    }

                    onEdit={
                        handleEdit
                    }

                    onDelete={
                        handleDelete
                    }

                />


                {/* =====================
            PHÂN TRANG
        ====================== */}

                <Pagination

                    currentPage={
                        page
                    }

                    totalPages={
                        totalPages
                    }

                    onPageChange={
                        setPage
                    }

                />

            </div>

        </div>
    );
}


export default App;