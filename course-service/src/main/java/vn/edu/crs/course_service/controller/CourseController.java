package vn.edu.crs.course_service.controller;

import vn.edu.crs.course_service.dto.CourseDTO;
import vn.edu.crs.course_service.service.CourseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // Lấy danh sách + tìm kiếm + phân trang môn học
    @GetMapping
    public Page<CourseDTO> getAll(
            @RequestParam(required = false) String keyword,
            Pageable pageable) {

        return courseService.search(keyword, pageable);
    }

    // Tìm kiếm môn học
    @GetMapping("/search")
    public Page<CourseDTO> search(
            @RequestParam(required = false) String keyword,
            Pageable pageable) {

        return courseService.search(keyword, pageable);
    }

    // Thêm môn học
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseDTO create(@Valid @RequestBody CourseDTO dto) {
        return courseService.create(dto);
    }

    // Cập nhật môn học
    @PutMapping("/{id}")
    public CourseDTO update(
            @PathVariable Long id,
            @Valid @RequestBody CourseDTO dto) {

        return courseService.update(id, dto);
    }

    // Xóa môn học
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
    // Xem chi tiết 1 môn học
    @GetMapping("/{id}")
    public CourseDTO getById(
            @PathVariable Long id
    ) {
        return courseService.getById(id);
    }
}