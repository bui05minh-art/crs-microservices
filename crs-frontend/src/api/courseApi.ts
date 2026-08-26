import axiosClient from './axiosClient';
import type { Course, PagedResponse } from '../types/course';

export const getCourses = (
    keyword?: string,
    page = 0,
    size = 10
) => {
    return axiosClient.get<PagedResponse<Course>>('/api/courses', {
        params: { keyword, page, size },
    });
};
// Thêm môn học
export const createCourse = async (data: {
    tenMonHoc: string;
    soTinChi: number;
    soChoToiDa: number;
}) => {
    const response = await axiosClient.post(
        '/api/courses',
        data
    );

    return response.data;
};


// Sửa môn học
export const updateCourse = async (
    id: number,
    data: {
        tenMonHoc: string;
        soTinChi: number;
        soChoToiDa: number;
    }
) => {
    const response = await axiosClient.put(
        `/api/courses/${id}`,
        data
    );

    return response.data;
};


// Xóa môn học
export const deleteCourse = async (
    id: number
) => {
    const response = await axiosClient.delete(
        `/api/courses/${id}`
    );

    return response.data;
};