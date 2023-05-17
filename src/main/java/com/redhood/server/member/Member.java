package com.redhood.server.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.redhood.server.audit.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Timestamped {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String nickName;

	@Column(nullable = false, length = 11)
	private String phone;

	private String images;

	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> roles = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private MemberStatus memberStatus = MemberStatus.ACTIVE;


	public enum MemberStatus {
		ACTIVE("활동중"),
		DORMANT("휴면 상태");
		@Getter
		private String memberDec;
		MemberStatus(String memberDec) {
			this.memberDec = memberDec;
		}
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void encodePassword(PasswordEncoder passwordEncoder){
		this.password = passwordEncoder.encode(password);
	}

}
