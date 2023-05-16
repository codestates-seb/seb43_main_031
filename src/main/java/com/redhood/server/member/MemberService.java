package com.redhood.server.member;

import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
<<<<<<< HEAD
=======
import com.redhood.server.security.CustomAuthorityUtils;
>>>>>>> be-feat/member
import com.redhood.server.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
<<<<<<< HEAD
=======
import java.util.Objects;
>>>>>>> be-feat/member
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final CustomAuthorityUtils customAuthorityUtils;


	public Member signUp(Member member) {
		//verifyExistsEmail(member.getEmail());
		String encryptedPassword  = passwordEncoder.encode(member.getPassword());
		member.setPassword(encryptedPassword);
		member.setCreatedDate(LocalDateTime.now());
		member.setRoles(customAuthorityUtils.createRoles(member.getEmail()));
		Member saveMember = memberRepository.save(member);
		return saveMember;
	}

	public Member login(Member member){
		Member findMember = verifyExistsEmail(member.getEmail());
		if(!passwordEncoder.matches(member.getPassword(), findMember.getPassword())){
			throw new UsernameNotFoundException("비밀번호를 다시 확인해주세요.");
		}
		return findMember;
	}

	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
	public Member updateMember(long memberId,
	                           Member member,
	                           UserDetailsImpl user){
		Member findMember = verifyLogInMemberMatchesMember(user.getUserId(), memberId);

		//현재 로그인한 사용자와 수정할려는 사용자가 같은지 확인
		Optional.ofNullable(member.getNickName())
				.ifPresent(name -> findMember.setNickName(name));
		Optional.ofNullable(member.getPassword())
				.ifPresent(password -> findMember.setPassword(password));
		Optional.ofNullable(member.getPhone())
				.ifPresent(phone -> findMember.setPhone(phone));
		Optional.ofNullable(member.getImages())
				.ifPresent(images -> findMember.setImages(images));
		findMember.setUpdateDate(LocalDateTime.now());
		return memberRepository.save(findMember);
	}

	public List<Member> findMembers(){
		return memberRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Member findMember(UserDetailsImpl user, long memberId){
		return verifyLogInMemberMatchesMember(user.getUserId(), memberId);
	}

	public Member deleteMember(UserDetailsImpl user, long memberId){
		Member findMember = verifyLogInMemberMatchesMember(user.getUserId(), memberId);
		findMember.setMemberStatus(Member.MemberStatus.DORMANT);
		return memberRepository.save(findMember);
	}
	public Member verifyLogInMemberMatchesMember(long userId, long memberId) {
		Member findMember = findVerifiedMember(memberId);
		Member userMember = findVerifiedMember(userId);

		if(!findMember.equals(userMember)){
			throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		}
		return findMember;
	}

	@Transactional(readOnly = true)
	public Member findVerifiedMember(long memberId){
		Optional<Member> optionalMember = memberRepository.findById(memberId);
		Member findMember = optionalMember.orElseThrow(() ->
                          new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
		return findMember;
	}

	private Member verifyExistsEmail(String email) {
		Optional<Member> optionalMember = memberRepository.findByEmail(email);
		return optionalMember.orElseThrow(() ->
                      new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));
	}

}
