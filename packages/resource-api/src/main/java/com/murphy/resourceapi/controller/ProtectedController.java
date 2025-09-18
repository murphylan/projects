package com.murphy.resourceapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
public class ProtectedController {
    @GetMapping("/api/protected")
    public String protectedEndpoint(@AuthenticationPrincipal Jwt jwt) {
        return "Hello, " + jwt.getSubject() + "! Your authorities: " + jwt.getClaimAsStringList("authorities");
    }
}
