import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { login as loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

import type { ApiErrorResponse } from '../types/apiError';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] =
        useState<string | null>(null);

    const [submitting, setSubmitting] =
        useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        // KIEM TRA NUT DANG NHAP CO CHAY KHONG
        console.log('BAT DAU LOGIN');

        setError(null);
        setSubmitting(true);

        try {
            const res = await loginApi({
                username,
                password,
            });

            // KIEM TRA AUTH-SERVICE TRA VE GI
            console.log(
                'LOGIN RESPONSE:',
                res.data
            );

            // LUU TOKEN + USER
            login(res.data);

            console.log(
                'DA LUU LOGIN, CHUYEN SANG /courses'
            );

            // CHUYEN SANG DANH SACH MON HOC
            navigate('/courses');

        } catch (err) {

            // HIEN LOI CHI TIET TREN CONSOLE
            console.error(
                'LOGIN ERROR:',
                err
            );

            if (
                axios.isAxiosError<
                    ApiErrorResponse
                >(err) &&
                err.response?.data?.message
            ) {
                setError(
                    err.response.data.message
                );
            } else {
                setError(
                    'Đăng nhập thất bại, vui lòng thử lại.'
                );
            }

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-icon">
                    🎓
                </div>

                <h2>
                    Đăng nhập hệ thống CRS
                </h2>

                <p className="login-subtitle">
                    Đăng nhập để sử dụng các chức năng của hệ thống
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="login-group">
                        <label>
                            Tên đăng nhập
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    <div className="login-group">
                        <label>
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={submitting}
                    >
                        {submitting
                            ? 'Đang xử lý...'
                            : 'Đăng nhập'}
                    </button>

                </form>

            </div>

        </div>
    );
}