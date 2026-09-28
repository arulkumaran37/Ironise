package com.fitforge.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI fitForgeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Ironise / FitForge Platform API")
                        .description("REST API specifications for Ironise - Gamified Fitness & On-Device AI Platform")
                        .version("v0.0.1")
                        .contact(new Contact()
                                .name("FitForge Engineering")
                                .email("support@fitforge.internal"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
