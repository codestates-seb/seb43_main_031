package com.redhood.server.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardPostDto {
    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;
    @NotBlank(message = "내용은 공백이 아니어야 합니다.")
    private String content;
    private long cost;
    @Future
    private LocalDateTime expiredDateTime;
    @NotBlank(message = "지역동 선택은 필수입니다.")
    private String dongTag;
    @NotBlank(message = "지역구 선택은 필수입니다.")
    private String guTag;
    @NotBlank(message = "상세주소는 공백이 아니어야 합니다.")
    private String detailAddress;
    private boolean completed;
}
