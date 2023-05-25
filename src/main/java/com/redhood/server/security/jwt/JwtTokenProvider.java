package com.redhood.server.security.jwt;

import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;

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
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.jar.JarException;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
	private final UserDetailsService userDetailsService;

	@Value("${jwt.secret}")
	private String secretKey;
	@Value("${jwt.access-token-expiration-minutes}")
	private long accessTokenExpirationMinutes;
	@Value("${jwt.refresh-token-expiration-minutes}")
	private long  refreshTokenExpirationMinutes;

	@PostConstruct
	protected void init(){
		secretKey = Base64.getEncoder().encodeToString(this.secretKey.getBytes(StandardCharsets.UTF_8));
	}

	public String createAccessToken(String email, List<String> roles){
		return createToken(email, roles, accessTokenExpirationMinutes);
	}

	public String createRefreshToken(String email, List<String> roles) {
		return createToken(email, roles, refreshTokenExpirationMinutes);
	}

	//토큰 생성
	public String createToken(String email, List<String> roles, long tokenValidTime){
		Claims claims = Jwts.claims().setSubject(email); //JWT payload에 저장되는 정보단위
		claims.put("roles", roles); //정보는 key/value 쌍으로 저장
		Date now = new Date();
		Date expiration = new Date(now.getTime() + tokenValidTime * 1000);

		String token = Jwts.builder()
				.setClaims(claims) // 정보 저장
				.setIssuedAt(now) // 토큰 발행 시간 정보
				.setExpiration(expiration) // 토큰 유효 시각 설정
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();

		return token;
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
	public boolean validateToken(String jwtToken) throws IOException {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			logger.info("잘못된 JWT 토큰입니다.");
				throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		} catch (ExpiredJwtException e) {
			logger.info("만료된 JWT 토큰입니다.");
			throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		} catch (UnsupportedJwtException e) {
			logger.info("지원되지 않는 JWT 토큰입니다.");
			throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		} catch (IllegalArgumentException e) {
			logger.info("JWT 토큰이 잘못되었습니다.");
			throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		} catch (Exception e) {
			logger.info("Exception e", e);
			throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		}
	}


	//Request의 Header에서 Token 값 가져오기
	public String resolveToken(HttpServletRequest request){
		String authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader !=null && authorizationHeader.startsWith("Bearer ")){
			return authorizationHeader.substring(7);
		}
		String refreshTokenHeader = request.getHeader("Refresh-Token");
		if (refreshTokenHeader != null){
			return refreshTokenHeader;
		}
		return null;
	}
}
