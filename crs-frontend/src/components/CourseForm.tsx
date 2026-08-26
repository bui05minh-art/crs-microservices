import { useState } from 'react';
import type { SyntheticEvent } from 'react';

import type {
    Course,
    CourseFormValues,
} from '../types/course';

interface CourseFormProps {
    editingCourse: Course | null;

    onSubmit: (
        values: CourseFormValues
    ) => Promise<void>;

    onCancel: () => void;

    submitting: boolean;

    serverError: string | null;
}

export default function CourseForm({
                                       editingCourse,
                                       onSubmit,
                                       onCancel,
                                       submitting,
                                       serverError,
                                   }: CourseFormProps) {

    // =========================
    // DỮ LIỆU FORM
    // =========================

    const [values, setValues] =
        useState<CourseFormValues>({
            tenMonHoc:
                editingCourse?.tenMonHoc ?? '',

            soTinChi:
                editingCourse
                    ? String(editingCourse.soTinChi)
                    : '',

            soChoToiDa:
                editingCourse
                    ? String(editingCourse.soChoToiDa)
                    : '',
        });


    // =========================
    // LỖI VALIDATE
    // =========================

    const [clientErrors, setClientErrors] =
        useState<Partial<CourseFormValues>>({});


    // =========================
    // VALIDATE
    // =========================

    const validate = (): boolean => {

        const errors:
            Partial<CourseFormValues> = {};


        // Tên môn học
        if (!values.tenMonHoc.trim()) {

            errors.tenMonHoc =
                'Tên môn học không được để trống';

        }


        // Số tín chỉ
        const soTinChi =
            Number(values.soTinChi);

        if (
            !values.soTinChi ||
            Number.isNaN(soTinChi) ||
            soTinChi <= 0
        ) {

            errors.soTinChi =
                'Số tín chỉ phải là số lớn hơn 0';

        }


        // Số chỗ tối đa
        const soChoToiDa =
            Number(values.soChoToiDa);

        if (
            !values.soChoToiDa ||
            Number.isNaN(soChoToiDa) ||
            soChoToiDa <= 0
        ) {

            errors.soChoToiDa =
                'Số chỗ tối đa phải là số lớn hơn 0';

        }


        setClientErrors(errors);

        return Object.keys(errors).length === 0;
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (
        e: SyntheticEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        // Kiểm tra dữ liệu
        if (!validate()) {
            return;
        }


        // Gửi dữ liệu lên App
        await onSubmit(values);

    };


    return (

        <form
            onSubmit={handleSubmit}
            style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '16px',
                marginBottom: '24px',
                border: '1px solid #e5e7eb',
                boxShadow:
                    '0 4px 20px rgba(0, 0, 0, 0.06)',
            }}
        >

            {/* =========================
          TIÊU ĐỀ
      ========================= */}

            <h2
                style={{
                    marginTop: 0,
                    marginBottom: '22px',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#111827',
                }}
            >
                {editingCourse
                    ? 'Sửa môn học'
                    : 'Thêm môn học mới'}
            </h2>


            {/* =========================
          TÊN MÔN HỌC
      ========================= */}

            <div
                style={{
                    marginBottom: '18px',
                }}
            >

                <label
                    style={{
                        display: 'block',
                        marginBottom: '7px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Tên môn học
                </label>

                <input
                    type="text"
                    value={values.tenMonHoc}
                    placeholder="Nhập tên môn học"

                    onChange={(e) =>
                        setValues({
                            ...values,
                            tenMonHoc: e.target.value,
                        })
                    }

                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '11px 13px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                    }}
                />

                {clientErrors.tenMonHoc && (

                    <p
                        style={{
                            margin: '6px 0 0',
                            color: '#dc2626',
                            fontSize: '13px',
                        }}
                    >
                        {clientErrors.tenMonHoc}
                    </p>

                )}

            </div>


            {/* =========================
          SỐ TÍN CHỈ
      ========================= */}

            <div
                style={{
                    marginBottom: '18px',
                }}
            >

                <label
                    style={{
                        display: 'block',
                        marginBottom: '7px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Số tín chỉ
                </label>

                <input
                    type="number"
                    min="1"
                    value={values.soTinChi}
                    placeholder="Ví dụ: 3"

                    onChange={(e) =>
                        setValues({
                            ...values,
                            soTinChi: e.target.value,
                        })
                    }

                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '11px 13px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                    }}
                />

                {clientErrors.soTinChi && (

                    <p
                        style={{
                            margin: '6px 0 0',
                            color: '#dc2626',
                            fontSize: '13px',
                        }}
                    >
                        {clientErrors.soTinChi}
                    </p>

                )}

            </div>


            {/* =========================
          SỐ CHỖ TỐI ĐA
      ========================= */}

            <div
                style={{
                    marginBottom: '18px',
                }}
            >

                <label
                    style={{
                        display: 'block',
                        marginBottom: '7px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Số chỗ tối đa
                </label>

                <input
                    type="number"
                    min="1"
                    value={values.soChoToiDa}
                    placeholder="Ví dụ: 50"

                    onChange={(e) =>
                        setValues({
                            ...values,
                            soChoToiDa: e.target.value,
                        })
                    }

                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '11px 13px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                    }}
                />

                {clientErrors.soChoToiDa && (

                    <p
                        style={{
                            margin: '6px 0 0',
                            color: '#dc2626',
                            fontSize: '13px',
                        }}
                    >
                        {clientErrors.soChoToiDa}
                    </p>

                )}

            </div>


            {/* =========================
          LỖI SERVER
      ========================= */}

            {serverError && (

                <div
                    style={{
                        marginBottom: '18px',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#b91c1c',
                        fontSize: '14px',
                    }}
                >
                    {serverError}
                </div>

            )}


            {/* =========================
          NÚT
      ========================= */}

            <div>

                <button
                    type="submit"
                    disabled={submitting}

                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        background:
                            submitting
                                ? '#9ca3af'
                                : '#4f46e5',
                        color: '#ffffff',
                        cursor:
                            submitting
                                ? 'not-allowed'
                                : 'pointer',
                        fontWeight: '600',
                    }}
                >
                    {submitting
                        ? 'Đang lưu...'
                        : editingCourse
                            ? 'Cập nhật'
                            : 'Thêm mới'}
                </button>


                {editingCourse && (

                    <button
                        type="button"
                        onClick={onCancel}

                        style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            background: '#ffffff',
                            color: '#374151',
                            cursor: 'pointer',
                            fontWeight: '600',
                        }}
                    >
                        Hủy
                    </button>

                )}

            </div>

        </form>
    );
}