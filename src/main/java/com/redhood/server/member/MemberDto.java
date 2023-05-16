package com.redhood.server.member;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {
	@Setter
	@Getter
	public static class Post{
		@NotBlank(message = "내용을 입력해 주세요.")
		private String nickName;

		@NotBlank(message = "내용을 입력해 주세요.")
		@Email(message = "이메일 형식으로 작성해 주세요.")
		private String email;

		@NotBlank(message = "내용을 입력해 주세요.")
		@Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하로 입력해주세요.")
		private String password;

		@Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$",
		        message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
		private String phone;
	}
	@Getter
	public static class Login{
		@NotBlank(message ="내용을 입력해 주세요.")
		@Email(message = "이메일 형식으로 작성해 주세요.")
		private String email;
		@NotBlank(message = "내용을 입력해 주세요.")
		@Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하로 입력해주세요.")
		private String password;

	}
	@Getter
	@Setter
	public static class Patch{
		private Long memberId;
		@NotBlank(message = "내용을 입력해 주세요.")
		private String nickName;
		@NotBlank(message = "내용을 입력해 주세요.")
		@Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하로 입력해주세요.")
		private String password;
		@NotBlank(message = "내용을 입력해 주세요.")
		@Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$",
				message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
		private String phone;
		private String images;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Response{
		private Long memberId;
		private String email;
		private String nickName;
		//private String password;
		private String phone;
		private String images;
		private List<String> roles;
		private Member.MemberStatus memberStatus;
		private LocalDateTime createdDate;
		private LocalDateTime updateDate;
	}
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class ReplyResponse{
		private Long memberId;
		private String email;
		private String nickName;
		//private String password;
		private List<String> roles;
		private Member.MemberStatus memberStatus;
		private LocalDateTime createdDate;
		private LocalDateTime updateDate;

	}
}
