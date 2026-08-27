import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import axios from 'axios';

import {
    getMyRegistrations,
    cancelRegistration,
} from '../api/registrationApi';

import { getCourseById } from '../api/courseApi';

import { useToast } from '../hooks/useToast';

import Toast from '../components/Toast';

import type { Registration } from '../types/registration';
import type { ApiErrorResponse } from '../types/apiError';

interface RegistrationRow extends Registration {
    courseName: string;
}

export default function MyRegistrationsPage() {
    const [rows, setRows] =
        useState<RegistrationRow[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [loadError, setLoadError] =
        useState<string | null>(null);

    const [cancellingId, setCancellingId] =
        useState<number | null>(null);

    const {
        toast,
        showToast,
        clearToast,
    } = useToast();

    const loadData = useCallback(async () => {
        try {
            const res =
                await getMyRegistrations();

            const activeRegistrations =
                res.data.filter(
                    (registration) =>
                        registration.trangThai ===
                        'DA_DANG_KY'
                );

            const enriched =
                await Promise.all(
                    activeRegistrations.map(
                        async (registration) => {
                            try {
                                const courseRes =
                                    await getCourseById(
                                        registration.courseId
                                    );

                                return {
                                    ...registration,
                                    courseName:
                                    courseRes.data.tenMonHoc,
                                };

                            } catch {
                                return {
                                    ...registration,
                                    courseName:
                                        `Môn học #${registration.courseId} (không tìm thấy thông tin)`,
                                };
                            }
                        }
                    )
                );

            setRows(enriched);
            setLoadError(null);

        } catch (err) {
            let message =
                'Không tải được danh sách đăng ký.';

            if (
                axios.isAxiosError<ApiErrorResponse>(err) &&
                err.response?.data?.message
            ) {
                message =
                    err.response.data.message;
            }

            setLoadError(message);

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadData();
    }, [loadData]);
    const handleCancel = async (
        row: RegistrationRow
    ) => {
        const confirmed =
            window.confirm(
                `Hủy đăng ký môn "${row.courseName}"?`
            );

        if (!confirmed) {
            return;
        }

        setCancellingId(row.id);

        try {
            await cancelRegistration(row.id);

            showToast(
                `Đã hủy đăng ký môn "${row.courseName}"`,
                'success'
            );

            await loadData();

        } catch (err) {
            let message =
                'Hủy đăng ký không thành công.';

            if (
                axios.isAxiosError<ApiErrorResponse>(err) &&
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
            setCancellingId(null);
        }
    };

    return (
        <div className="app-page">
            <div className="app-container">

                <div className="page-header">
                    <div className="page-icon">
                        📚
                    </div>

                    <h1 className="page-title">
                        Môn học đã đăng ký
                    </h1>

                    <p className="page-subtitle">
                        Xem và quản lý các học phần đã đăng ký
                    </p>
                </div>

                <div className="course-card">

                    {loading && (
                        <div className="state-box">
                            <div className="loading-spinner"></div>

                            <p>
                                Đang tải...
                            </p>
                        </div>
                    )}

                    {!loading && loadError && (
                        <div className="state-box error-state">
                            <div className="state-icon">
                                ⚠️
                            </div>

                            <p>
                                {loadError}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        !loadError &&
                        rows.length === 0 && (
                            <div className="state-box">

                                <div className="state-icon">
                                    📭
                                </div>

                                <h3>
                                    Chưa có môn học
                                </h3>

                                <p>
                                    Bạn chưa đăng ký môn học nào.
                                </p>

                            </div>
                        )}
                    {!loading &&
                        !loadError &&
                        rows.length > 0 && (
                            <div className="table-wrapper">

                                <table className="course-table">

                                    <thead>
                                    <tr>
                                        <th>
                                            📘 Tên môn học
                                        </th>

                                        <th>
                                            📅 Ngày đăng ký
                                        </th>

                                        <th className="center-column">
                                            ⚙️ Thao tác
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {rows.map((row) => (
                                        <tr key={row.id}>

                                            <td className="course-name">
                                                {row.courseName}
                                            </td>

                                            <td>
                                                {new Date(
                                                    row.ngayDangKy
                                                ).toLocaleString(
                                                    'vi-VN'
                                                )}
                                            </td>

                                            <td className="center-column">

                                                <button
                                                    type="button"
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleCancel(row)
                                                    }
                                                    disabled={
                                                        cancellingId ===
                                                        row.id
                                                    }
                                                >
                                                    {cancellingId ===
                                                    row.id
                                                        ? 'Đang hủy...'
                                                        : 'Hủy đăng ký'}
                                                </button>

                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>

                                </table>
                            </div>
                        )}

                </div>

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