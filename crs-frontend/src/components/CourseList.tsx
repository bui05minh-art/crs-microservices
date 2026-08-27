import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
    courses: Course[];
    state: LoadState;
    errorMessage: string;
    onRetry: () => void;

    onEdit?: (course: Course) => void;
    onDelete?: (course: Course) => void;
}

export default function CourseList({
                                       courses,
                                       state,
                                       errorMessage,
                                       onRetry,
                                       onEdit,
                                       onDelete,
                                   }: CourseListProps) {

    if (state === 'loading') {
        return (
            <div className="state-box">
                <div className="loading-spinner"></div>

                <p>
                    Đang tải danh sách môn học...
                </p>
            </div>
        );
    }

    if (state === 'error') {
        return (
            <div className="state-box error-state">
                <div className="state-icon">
                    ⚠️
                </div>

                <p>{errorMessage}</p>

                <button
                    className="retry-button"
                    onClick={onRetry}
                >
                    ↻ Thử lại
                </button>
            </div>
        );
    }

    if (state === 'empty') {
        return (
            <div className="state-box">
                <div className="state-icon">
                    🔍
                </div>

                <h3>
                    Không tìm thấy môn học
                </h3>

                <p>
                    Không có môn học nào phù hợp
                    với từ khóa tìm kiếm.
                </p>
            </div>
        );
    }

    const showActions =
        !!onEdit || !!onDelete;

    return (
        <div className="table-wrapper">

            <table className="course-table">

                <thead>
                <tr>
                    <th>
                        📘 Tên môn học
                    </th>

                    <th className="center-column">
                        ⭐ Số tín chỉ
                    </th>

                    <th className="center-column">
                        🪑 Số chỗ còn lại
                    </th>

                    {showActions && (
                        <th className="center-column">
                            ⚙️ Thao tác
                        </th>
                    )}
                </tr>
                </thead>

                <tbody>
                {courses.map((course) => (
                    <tr key={course.id}>

                        <td className="course-name">
                            {course.tenMonHoc}
                        </td>

                        <td className="center-column">
                                <span className="credit-badge">
                                    {course.soTinChi}
                                </span>
                        </td>

                        <td className="center-column">
                                <span
                                    className={
                                        course.soChoConLai === 0
                                            ? 'slot-badge slot-full'
                                            : 'slot-badge'
                                    }
                                >
                                    {course.soChoConLai}
                                    {' / '}
                                    {course.soChoToiDa}
                                </span>
                        </td>

                        {showActions && (
                            <td className="center-column">

                                <div className="action-buttons">

                                    {onEdit && (
                                        <button
                                            type="button"
                                            className="edit-button"
                                            onClick={() =>
                                                onEdit(course)
                                            }
                                        >
                                            ✏️ Sửa
                                        </button>
                                    )}

                                    {onDelete && (
                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() =>
                                                onDelete(course)
                                            }
                                        >
                                            🗑️ Xóa
                                        </button>
                                    )}

                                </div>

                            </td>
                        )}

                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    );
}