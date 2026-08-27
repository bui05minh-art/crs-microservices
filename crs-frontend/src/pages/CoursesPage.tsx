import { useState } from 'react';

import { useCourses } from '../api/useCourses';

import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';

export default function CoursesPage() {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);

    const {
        courses,
        totalPages,
        state,
        errorMessage,
        refetch,
    } = useCourses(keyword, page);

    const handleSearch = (newKeyword: string) => {
        setKeyword(newKeyword);
        setPage(0);
    };

    return (
        <div className="app-page">
            <div className="app-container">

                <div className="page-header">
                    <div className="page-icon">
                        🎓
                    </div>

                    <h1 className="page-title">
                        Danh sách môn học
                    </h1>

                    <p className="page-subtitle">
                        Tìm kiếm và xem danh sách các môn học hiện có
                    </p>
                </div>

                <div className="search-card">
                    <SearchBox
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên môn học..."
                    />
                </div>

                <div className="course-card">
                    <CourseList
                        courses={courses}
                        state={state}
                        errorMessage={errorMessage}
                        onRetry={refetch}
                    />
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

            </div>
        </div>
    );
}