package com.labourconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@SpringBootApplication
@RestController
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins(
							"http://localhost:8000", 
							"http://127.0.0.1:5500", 
							"http://localhost:5500", 
							"https://dhanshriawari7-Eng.github.io"
						) // Frontend origins
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowCredentials(true) // Crucial for sessions/cookies
						.allowedHeaders("*");
			}
		};
	}

	@GetMapping("/api/health")
	public ResponseEntity<String> healthCheck() {
		return ResponseEntity.ok("Server is awake and running!");
	}

}
