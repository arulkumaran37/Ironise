package com.fitforge.health;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Health Check", description = "Endpoints for checking backend status and readiness")
public class HealthController {

    @GetMapping("/health")
    @Operation(summary = "Check backend system health", description = "Returns operational status and message of the FitForge backend API.")
    public ResponseEntity<HealthResponse> getHealthStatus() {
        HealthResponse response = new HealthResponse("UP", "FitForge backend is healthy");
        return ResponseEntity.ok(response);
    }
}
