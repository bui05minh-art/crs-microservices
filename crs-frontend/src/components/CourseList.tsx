import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
    courses: Course[];
    state: LoadState;
    errorMessage: string;
    onRetry: () => void;

    // Buổi 7
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
}

export default function CourseList({
                                       courses,
                                       state,
                                       errorMessage,
                                       onRetry,
                                       onEdit,
                                       onDelete,
                                   }: CourseListProps) {

    // =========================
    // TRẠNG THÁI LOADING
    // =========================
    if (state === 'loading') {
        return (
            <div
                style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#6b7280',
                }}
            >
                <p style={{ fontSize: '16px' }}>
                    Đang tải danh sách môn học...
                </p>
            </div>
        );
    }


    // =========================
    // TRẠNG THÁI ERROR
    // =========================
    if (state === 'error') {
        return (
            <div
                style={{
                    padding: '24px',
                    textAlign: 'center',
                    color: '#b91c1c',
                    background: '#fef2f2',
                    borderRadius: '12px',
                    border: '1px solid #fecaca',
                }}
            >
                <p style={{ marginBottom: '12px' }}>
                    {errorMessage}
                </p>

                <button
                    onClick={onRetry}
                    style={{
                        padding: '9px 18px',
                        border: 'none',
                        borderRadius: '8px',
                        background: '#dc2626',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: '600',
                    }}
                >
                    Thử lại
                </button>
            </div>
        );
    }


    // =========================
    // TRẠNG THÁI EMPTY
    // =========================
    if (state === 'empty') {
        return (
            <div
                style={{
                    padding: '50px 20px',
                    textAlign: 'center',
                    color: '#6b7280',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                }}
            >
                <div
                    style={{
                        fontSize: '40px',
                        marginBottom: '10px',
                    }}
                >
                    📚
                </div>

                <p
                    style={{
                        margin: 0,
                        fontSize: '16px',
                    }}
                >
                    Không tìm thấy môn học nào phù hợp.
                </p>
            </div>
        );
    }


    // =========================
    // TRẠNG THÁI SUCCESS
    // =========================
    return (
        <div
            style={{
                width: '100%',
                overflowX: 'auto',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            }}
        >

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                }}
            >

                {/* =========================
            HEADER
        ========================= */}
                <thead>
                <tr
                    style={{
                        background: '#f8fafc',
                        borderBottom: '1px solid #e5e7eb',
                    }}
                >

                    <th
                        style={{
                            padding: '17px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#374151',
                            textAlign: 'left',
                        }}
                    >
                        Tên môn học
                    </th>


                    <th
                        style={{
                            padding: '17px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#374151',
                            textAlign: 'center',
                        }}
                    >
                        Số tín chỉ
                    </th>


                    <th
                        style={{
                            padding: '17px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#374151',
                            textAlign: 'center',
                        }}
                    >
                        Số chỗ còn lại
                    </th>


                    <th
                        style={{
                            padding: '17px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#374151',
                            textAlign: 'center',
                        }}
                    >
                        Thao tác
                    </th>

                </tr>
                </thead>


                {/* =========================
            BODY
        ========================= */}
                <tbody>

                {courses.map((course) => (

                    <tr
                        key={course.id}
                        style={{
                            borderBottom: '1px solid #f1f5f9',
                        }}
                    >

                        {/* Tên môn học */}
                        <td
                            style={{
                                padding: '18px 20px',
                                fontSize: '15px',
                                fontWeight: '600',
                                color: '#1f2937',
                            }}
                        >
                            {course.tenMonHoc}
                        </td>


                        {/* Số tín chỉ */}
                        <td
                            style={{
                                padding: '18px 20px',
                                textAlign: 'center',
                            }}
                        >
                <span
                    style={{
                        display: 'inline-block',
                        minWidth: '36px',
                        padding: '7px 10px',
                        borderRadius: '20px',
                        background: '#eef2ff',
                        color: '#4f46e5',
                        fontSize: '13px',
                        fontWeight: '700',
                    }}
                >
                  {course.soTinChi}
                </span>
                        </td>


                        {/* Số chỗ còn lại */}
                        <td
                            style={{
                                padding: '18px 20px',
                                textAlign: 'center',
                            }}
                        >
                <span
                    style={{
                        display: 'inline-block',
                        padding: '7px 13px',
                        borderRadius: '20px',

                        background:
                            course.soChoConLai === 0
                                ? '#fee2e2'
                                : '#ecfdf5',

                        color:
                            course.soChoConLai === 0
                                ? '#dc2626'
                                : '#15803d',

                        fontSize: '13px',
                        fontWeight: '700',
                    }}
                >
                  {course.soChoConLai} / {course.soChoToiDa}
                </span>
                        </td>


                        {/* Thao tác */}
                        <td
                            style={{
                                padding: '18px 20px',
                                textAlign: 'center',
                            }}
                        >

                            {/* Nút Sửa */}
                            <button
                                onClick={() => onEdit(course)}
                                style={{
                                    marginRight: '8px',
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: '#eef2ff',
                                    color: '#4f46e5',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                }}
                            >
                                Sửa
                            </button>


                            {/* Nút Xóa */}
                            <button
                                onClick={() => onDelete(course)}
                                style={{
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: '#fef2f2',
                                    color: '#dc2626',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                }}
                            >
                                Xóa
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}