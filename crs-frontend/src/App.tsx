import { useState } from 'react';

import { useCourses } from './api/useCourses';
import SearchBox from './components/SearchBox';
import CourseList from './components/CourseList';
import Pagination from './components/Pagination';

function App() {

    const [keyword, setKeyword] =
        useState('');

    const [page, setPage] =
        useState(0);

    const {
        courses,
        totalPages,
        state,
        errorMessage,
        refetch
    } = useCourses(keyword, page);

    const handleSearch = (
        newKeyword: string
    ) => {

        setKeyword(newKeyword);

        // Mỗi lần tìm kiếm mới
        // luôn quay về trang đầu
        setPage(0);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #f5f7fb, #eef2ff)',
                padding: '50px 20px',
                boxSizing: 'border-box'
            }}
        >

            <div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        marginBottom: '28px'
                    }}
                >

                    <h1
                        style={{
                            margin: 0,
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#111827'
                        }}
                    >
                        Danh sách môn học
                    </h1>

                    <p
                        style={{
                            marginTop: '8px',
                            marginBottom: 0,
                            color: '#6b7280',
                            fontSize: '15px'
                        }}
                    >
                        Quản lý và tìm kiếm thông tin môn học
                    </p>

                </div>


                {/* SEARCH */}

                <SearchBox
                    onSearch={handleSearch}
                />


                {/* COURSE LIST */}

                <CourseList
                    courses={courses}
                    state={state}
                    errorMessage={errorMessage}
                    onRetry={refetch}
                />


                {/* PAGINATION */}

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

            </div>

        </div>
    );
}

export default App;