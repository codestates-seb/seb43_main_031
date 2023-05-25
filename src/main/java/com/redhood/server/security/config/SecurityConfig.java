package com.redhood.server.security.config;
import com.redhood.server.security.jwt.JwtAuthenticationFilter;
import com.redhood.server.security.jwt.JwtTokenProvider;

import com.redhood.server.security.jwt.MemberAccessDeniedHandler;
import com.redhood.server.security.jwt.MemberAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

	//@Autowired
	//private UserOAuth2Service userOAuth2Service;
	//@Autowired
	//private Auth2AuthenticationSuccessHandler auth2AuthenticationSuccessHandler;
	private final JwtTokenProvider jwtTokenProvider;


	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.httpBasic().disable()
				.cors().configurationSource(corsConfigurationSource())
				.and()
				//csrf 보안 토큰 disable처리
				.csrf().disable()
				//토큰 기반 인증이므로 세션 사용 안함
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.formLogin().disable()
				.httpBasic().disable()
				.exceptionHandling()
				.authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
				.accessDeniedHandler(new MemberAccessDeniedHandler())
				.and()
				//URL 관리(요청에 대한 사용 권한 체크)
				.authorizeHttpRequests(authorize -> authorize
						.antMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
						.antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
						.antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")

						.antMatchers(HttpMethod.POST, "/boards/**").hasRole("USER")
						.antMatchers(HttpMethod.PATCH, "/boards/**").hasRole("USER")
						.antMatchers(HttpMethod.DELETE, "/boards/**").hasRole("USER")

						.antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER")
						.antMatchers(HttpMethod.PATCH, "/comments/**").hasRole("USER")
						.antMatchers(HttpMethod.DELETE, "/comments/**").hasRole("USER")

						.antMatchers(HttpMethod.POST, "/applys/**").hasRole("USER")
						.antMatchers(HttpMethod.PATCH, "/applys/**").hasRole("USER")
						.antMatchers(HttpMethod.DELETE, "/applys/**").hasRole("USER")

						.antMatchers(HttpMethod.POST, "/chats/**").hasRole("USER")
						.antMatchers(HttpMethod.GET, "/chats/**").hasRole("USER")
						.antMatchers(HttpMethod.PATCH, "/chats/**").hasRole("USER")
						.antMatchers(HttpMethod.DELETE, "/chats/**").hasRole("USER")

						.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.anyRequest().permitAll())  // 그외 나머지 요청은 누구나 접근 가능
						.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
						UsernamePasswordAuthenticationFilter.class);
//						.oauth2Login()
//						.userInfoEndpoint()
//						.userService(userOAuth2Service);.oauth2Login()
//						.userInfoEndpoint()
//						.userService(userOAuth2Service);

						//.successHandler(auth2AuthenticationSuccessHandler);
		return http.build();
	}

	//cors 허용 적용
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
		configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
		configuration.addAllowedMethod("*");
		configuration.addAllowedHeader("*");
		configuration.addAllowedHeader("content-type");
		configuration.addExposedHeader("Authorization");
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}

