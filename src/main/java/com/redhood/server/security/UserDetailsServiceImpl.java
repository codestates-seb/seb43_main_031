package com.redhood.server.security;

import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService{
	private final MemberRepository memberRepository;
	//private final OAuth2AuthorizedClientService authorizedClientService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

//		// 사용자의 권한 정보
//		Collection<GrantedAuthority> authorities = getAuthorities(member.getRoles());
//		// OAuth 인증 정보 가져오기
//		OAuth2AuthenticationToken authentication = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
//		OAuth2AuthorizedClient authorizedClient = getAuthorizedClient(authentication);
//		Map<String, Object> oauthAttributes = authorizedClient.getPrincipal().getAttributes();
//
//		// OAuth 인증을 통해 가져온 추가 정보를 UserDetails에 추가
//		// 예를 들어, 카카오 사용자 정보의 닉네임이나 프로필 사진 등
//		String nickname = (String) oauthAttributes.get("nickname");
//
//		return new User(member.getEmail(), member.getPassword(), authorities, nickname);
//	}
//
//	private Collection<GrantedAuthority> getAuthorities(List<Role> roles) {
//		return roles.stream()
//				.map(role -> new SimpleGrantedAuthority(role.getName()))
//				.collect(Collectors.toList());
//	}
//
//	private OAuth2AuthorizedClient getAuthorizedClient(OAuth2AuthenticationToken authentication) {
//		String clientRegistrationId = authentication.getAuthorizedClientRegistrationId();
//		String principalName = authentication.getName();
//		return authorizedClientService.loadAuthorizedClient(clientRegistrationId, principalName);
//	}
		return new UserDetailsImpl(member);
	}
}
