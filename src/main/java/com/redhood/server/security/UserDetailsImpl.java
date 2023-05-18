package com.redhood.server.security;

import com.redhood.server.member.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {
	private final Member member;

	/* 유저의 권한 목록 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return member.getRoles().stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
	}

	@Override
	public String getPassword() {
		//회원의 암호화 된 비밀번호 반환
		return member.getPassword();
	}

	@Override
	public String getUsername() {
		//회원의 암호화된 로그인 아이디를 반환
		return member.getEmail();
	}

	public Long getUserId(){
		return member.getMemberId();
	}

	/*
	계정 만료 여부를 반환
	true : 잠기지 않음
	false : 잠김
	*/
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	/*
	계정 잠금 여부를 반환
	true : 잠기지 않음
	false : 잠김
	*/
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	/*
	자격 증명(비밀번호) 만료를 반환
	true : 잠기지 않음
	false : 잠김
	*/
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/*
	회원의 활성화 여부를 반환
	true : 잠기지 않음
	false : 잠김
	*/
	@Override
	public boolean isEnabled() {
		return true;
	}

}
