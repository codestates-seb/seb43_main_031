package com.redhood.server.security.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
	private final UserDetailsService userDetailsService;

	@Value("${jwt.secret}")
	private String secretKey;

	private long accessTokenValidity = 4 * 60 * 60 * 1000;


	@PostConstruct
	protected void init(){
		secretKey = Base64.getEncoder().encodeToString(this.secretKey.getBytes(StandardCharsets.UTF_8));
	}

	//토큰 생성
	public String createToken(String email, List<String> roles){
		Claims claims = Jwts.claims().setSubject(email); //JWT payload에 저장되는 정보단위
		claims.put("roles", roles); //정보는 key/value 쌍으로 저장
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + accessTokenValidity);

		return Jwts.builder()
				       .setClaims(claims) //정보 저장
				       .setIssuedAt(new Date()) //토큰 발행 시간 정보
				       .setExpiration(expiryDate) //토큰 유효 시각 설정
							 .signWith(SignatureAlgorithm.HS256, secretKey)
				       .compact();
	}

	//JWT 토큰에서 인증 정보 조회
	public Authentication getAuthentication(String token){
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserEmail(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	//토큰에서 회원 정보 추출
	public String getUserEmail(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	//토큰 유효성, 만료일자 확인
	public boolean validateToken(String jwtToken){
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		}catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e){
			logger.info("잘못된 JWT 서명입니다.");
		}catch (ExpiredJwtException e){
			logger.info("만료된 JWT 토큰입니다.");
		}catch (UnsupportedJwtException e){
			logger.info("지원되지 않는 JWT 토큰입니다.");
		}catch (IllegalArgumentException e){
			logger.info("JWT 토큰이 잘못되었습니다.");
		}catch (Exception e) {
			logger.info("Exception e", e);
		}
		return false;
	}

	//Request의 Header에서 Token 값 가져오기
	public String resolveToken(HttpServletRequest request){
		return request.getHeader("Authorization");
	}
}
