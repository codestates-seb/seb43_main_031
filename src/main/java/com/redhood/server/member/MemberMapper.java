package com.redhood.server.member;

import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
	public Member memberPostToMember(MemberDto.Post postDto){
		Member member = new Member();

		member.setNickName(postDto.getNickName());
		member.setEmail(postDto.getEmail());
		member.setPassword(postDto.getPassword());
		member.setPhone(postDto.getPhone());
		return member;
	}
	public Member memberPostToMember(MemberDto.Login postDto){
		Member member = new Member();
		member.setEmail(postDto.getEmail());
		member.setPassword(postDto.getPassword());
		return member;
	}

	public Member memberPatchToMember(MemberDto.Patch patchDto){
		Member member = new Member();

		member.setMemberId(patchDto.getMemberId());
		member.setNickName(patchDto.getNickName());
		member.setPhone(patchDto.getPhone());
		member.setPassword(patchDto.getPassword());
		member.setImages(patchDto.getImages());
		return member;
	}

	public MemberDto.Response memberToMemberResponseDto(Member member){
		MemberDto.Response response = new MemberDto.Response();

		response.setMemberId(member.getMemberId());
		response.setEmail(member.getEmail());
		//response.setPassword(member.getPassword());
		response.setNickName(member.getNickName());
		response.setImages(member.getImages());
		response.setPhone(member.getPhone());
		response.setRoles(member.getRoles());
		response.setCreatedDate(member.getCreatedDate());
		response.setUpdateDate(member.getUpdateDate());
		response.setMemberStatus(member.getMemberStatus());
		return response;
	}

}
