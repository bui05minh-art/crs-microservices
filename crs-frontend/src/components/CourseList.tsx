import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
    courses: Course[];
    state: LoadState;
    errorMessage: string;
    onRetry: () => void;
}

export default function CourseList({
                                       courses,
                                       state,
                                       errorMessage,
                                       onRetry
                                   }: CourseListProps) {

    // Loading
    if (state === 'loading') {
        return (
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '50px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                    color: '#6b7280'
                }}
            >
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: '500'
                    }}
                >
                    Đang tải danh sách môn học...
                </div>
            </div>
        );
    }

    // Error
    if (state === 'error') {
        return (
            <div
                style={{
                    background: '#fff7f7',
                    border: '1px solid #fecaca',
                    borderRadius: '16px',
                    padding: '30px',
                    color: '#b91c1c',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
                }}
            >
                <p
                    style={{
                        marginTop: 0,
                        marginBottom: '15px',
                        fontSize: '15px'
                    }}
                >
                    {errorMessage}
                </p>

                <button
                    onClick={onRetry}
                    style={{
                        background: '#dc2626',
                        color: '#ffffff',
                        border: 'none',
                        padding: '9px 18px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Thử lại
                </button>
            </div>
        );
    }

    // Empty
    if (state === 'empty') {
        return (
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '50px',
                    textAlign: 'center',
                    color: '#6b7280',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
                }}
            >
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: '500'
                    }}
                >
                    Không tìm thấy môn học nào phù hợp.
                </div>
            </div>
        );
    }

    // Success
    return (
        <div
            style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
            }}
        >

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}
            >

                <thead>
                <tr
                    style={{
                        background: '#f8fafc',
                        textAlign: 'left'
                    }}
                >

                    <th
                        style={{
                            padding: '17px 20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#374151',
                            borderBottom: '1px solid #e5e7eb'
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
                            borderBottom: '1px solid #e5e7eb',
                            textAlign: 'center'
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
                            borderBottom: '1px solid #e5e7eb',
                            textAlign: 'center'
                        }}
                    >
                        Số chỗ còn lại
                    </th>

                </tr>
                </thead>

                <tbody>

                {courses.map((course: Course) => {

                    const isFull =
                        course.soChoConLai === 0;

                    return (
                        <tr
                            key={course.id}
                            style={{
                                borderBottom: '1px solid #f1f5f9',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    '#f8fafc';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    '#ffffff';
                            }}
                        >

                            <td
                                style={{
                                    padding: '18px 20px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#1f2937'
                                }}
                            >
                                {course.tenMonHoc}
                            </td>

                            <td
                                style={{
                                    padding: '18px 20px',
                                    textAlign: 'center'
                                }}
                            >
                  <span
                      style={{
                          display: 'inline-block',
                          minWidth: '35px',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          background: '#eef2ff',
                          color: '#4f46e5',
                          fontWeight: '700',
                          fontSize: '13px'
                      }}
                  >
                    {course.soTinChi}
                  </span>
                            </td>

                            <td
                                style={{
                                    padding: '18px 20px',
                                    textAlign: 'center'
                                }}
                            >
                  <span
                      style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          background: isFull
                              ? '#fee2e2'
                              : '#dcfce7',
                          color: isFull
                              ? '#dc2626'
                              : '#16a34a',
                          fontWeight: '700',
                          fontSize: '13px'
                      }}
                  >
                    {course.soChoConLai}
                      {' / '}
                      {course.soChoToiDa}
                  </span>
                            </td>

                        </tr>
                    );
                })}

                </tbody>

            </table>
        </div>
    );
}