package com.redhood.server.member;

import lombok.Getter;

@Getter
public class MemberRegistrationApplicationEvent {
	private Member member;

	public MemberRegistrationApplicationEvent(Member member) {
		this.member = member;
	}
}
