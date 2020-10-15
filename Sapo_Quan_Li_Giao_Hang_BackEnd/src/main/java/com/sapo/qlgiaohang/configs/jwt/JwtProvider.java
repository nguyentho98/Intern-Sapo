package com.sapo.qlgiaohang.configs.jwt;

import com.sapo.qlgiaohang.dto.auth.UserResDTO;
import com.sapo.qlgiaohang.dto.auth.authResDTO;
import com.sapo.qlgiaohang.repositoties.UserRepository;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Component
public class JwtProvider {
    
    @Autowired
    UserRepository repository;
    
    private String JWT_SECRET = "shippingsapo";
    
    private long JWT_EXPIRATION = 604800000L;
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    public authResDTO generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        UserResDTO user = new UserResDTO(repository.findUserEntityByEmail(email));
        String token = createToken(claims, email);
        return new authResDTO(user.getId(), user.getFullName(), token);
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder().setClaims(claims).setSubject(subject)
                .setIssuedAt(now).setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET).compact();
    }
    
    public Boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
