package com.suricato;

import com.cloudinary.Cloudinary;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class SuricatoApplicationTests {

    @MockBean
    private Cloudinary cloudinary;

    @Test
    void contextLoads() {
    }
}