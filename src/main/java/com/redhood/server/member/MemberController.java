package com.redhood.server.member;


import com.redhood.server.security.UserDetailsImpl;
import com.redhood.server.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Stream;


@Validated
@CrossOrigin
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberMapper mapper;

	@GetMapping("/hello-oauth2")
	public String home(){
		return "hello-oauth2";
	}


	@PostMapping
	public ResponseEntity signUp(@Valid @RequestBody MemberDto.Post postDto){
		Member member = mapper.memberPostToMember(postDto);
		Member response = memberService.signUp(member);
		return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.CREATED);
	}
	@PostMapping("/login")
	public ResponseEntity loginMember(@Valid @RequestBody MemberDto.Login postDto){
		Member member = mapper.memberPostToMember(postDto);
		Member response = memberService.login(member);
		String token = jwtTokenProvider.createToken(response.getEmail(), response.getRoles());
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("Authorization", token.trim());
		return new ResponseEntity(mapper.memberToMemberResponseDto(response), httpHeaders, HttpStatus.OK);
	}

	@PatchMapping("/{member-id}")
	public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
	                                  @Valid @RequestBody MemberDto.Patch patchDto,
	                                  @AuthenticationPrincipal UserDetailsImpl user){

		Member member = mapper.memberPatchToMember(patchDto);
		Member response = memberService.updateMember(memberId, member, user);
		return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity getMembers(){
		List<Member> members = memberService.findMembers();
		Stream<MemberDto.Response> response =
				members.stream().map(member ->
						                     mapper.memberToMemberResponseDto(member));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/{member-id}")
	public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId,
	                                @AuthenticationPrincipal UserDetailsImpl user){
		Member findMember = memberService.findMember(user, memberId);
		MemberDto.Response response = mapper.memberToMemberResponseDto(findMember);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/{member-id}")
	public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId,
	                                   @AuthenticationPrincipal UserDetailsImpl user){
		Member response = memberService.deleteMember(user, memberId);return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.NO_CONTENT);
	}
}
