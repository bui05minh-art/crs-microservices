import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">

            <div className="navbar-left">
                <Link
                    to="/courses"
                    className="nav-brand"
                >
                    🎓 CRS
                </Link>

                <Link
                    to="/courses"
                    className="nav-link"
                >
                    Danh sách môn học
                </Link>

                {isAuthenticated &&
                    user?.role === 'ADMIN' && (
                        <Link
                            to="/admin/courses"
                            className="nav-link"
                        >
                            Quản trị môn học
                        </Link>
                    )}

                {isAuthenticated &&
                    user?.role === 'STUDENT' && (
                        <Link
                            to="/register-course"
                            className="nav-link"
                        >
                            Đăng ký học phần
                        </Link>
                    )}
            </div>

            <div className="navbar-right">

                {isAuthenticated ? (
                    <>
                        <span className="user-info">
                            Xin chào, {user?.username}
                            {' '}
                            ({user?.role})
                        </span>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="login-nav-button"
                    >
                        Đăng nhập
                    </Link>
                )}

            </div>

        </nav>
    );
}