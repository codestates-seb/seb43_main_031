package com.redhood.server.security.config;

import com.redhood.server.security.jwt.JwtAuthenticationFilter;
import com.redhood.server.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Collections;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final JwtTokenProvider jwtTokenProvider;

	// 암호화에 필요한 passwordEncoder 를 Bean으로 등록
	@Bean
	public PasswordEncoder passwordEncoder(){
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	// authenticationManager 를 Bean 등록
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web
				.ignoring().
				antMatchers("/h2/**");
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				// HTTP 기본 인증 비활성화
				.httpBasic().disable()
				.cors().configurationSource(corsConfigurationSource())
				.and()
				//csrf 보안 토큰 disable처리
				.csrf().disable()
				//토큰 기반 인증이므로 세션 사용 안함
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
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
					.anyRequest().permitAll()  // 그외 나머지 요청은 누구나 접근 가능
					)
				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
						UsernamePasswordAuthenticationFilter.class);
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
