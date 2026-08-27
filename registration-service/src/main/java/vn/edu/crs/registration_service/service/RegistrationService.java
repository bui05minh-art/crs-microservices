package vn.edu.crs.registration_service.service;

import vn.edu.crs.registration_service.client.CourseClient;
import vn.edu.crs.registration_service.dto.RegistrationRequestDTO;
import vn.edu.crs.registration_service.entity.Registration;
import vn.edu.crs.registration_service.repository.RegistrationRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.List;
@Service
@RequiredArgsConstructor
public class RegistrationService {

    private static final String DA_DANG_KY = "DA_DANG_KY";
    private static final String DA_HUY = "DA_HUY";

    private final RegistrationRepository registrationRepository;
    private final CourseClient courseClient;

    public Registration register(RegistrationRequestDTO dto) {

        // Kiểm tra sinh viên đã đăng ký môn này chưa
        if (registrationRepository
                .existsByStudentIdAndCourseIdAndTrangThai(
                        dto.getStudentId(),
                        dto.getCourseId(),
                        DA_DANG_KY)) {

            throw new IllegalStateException(
                    "Sinh vien da dang ky mon hoc nay roi"
            );
        }

        // Gọi course-service để trừ chỗ
        courseClient.reserveSeat(dto.getCourseId());

        // Nếu trừ chỗ thành công mới lưu đăng ký
        Registration registration = new Registration();

        registration.setStudentId(dto.getStudentId());
        registration.setCourseId(dto.getCourseId());
        registration.setTrangThai(DA_DANG_KY);
        registration.setNgayDangKy(LocalDateTime.now());

        return registrationRepository.save(registration);
    }

    public void cancel(Long registrationId) {

        Registration registration =
                registrationRepository
                        .findById(registrationId)
                        .orElseThrow(() ->
                                new NoSuchElementException(
                                        "Khong tim thay dang ky id = "
                                                + registrationId
                                )
                        );

        if (DA_HUY.equals(registration.getTrangThai())) {

            throw new IllegalStateException(
                    "Dang ky nay da duoc huy truoc do"
            );
        }

        // Hoàn lại chỗ bên course-service
        courseClient.releaseSeat(
                registration.getCourseId()
        );

        registration.setTrangThai(DA_HUY);

        registrationRepository.save(registration);
    }
    public List<Registration> getMyRegistrations(Long studentId) {
        return registrationRepository.findByStudentId(studentId);
    }
}