package com.redhood.server.reply.dto;

import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.member.MemberDto;
import com.redhood.server.reply.entity.Apply;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ApplyDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post {
        @NotNull
        private long boardId;

        private String content;
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        @NotNull
        private String content;
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response {

        private Long applyId;

        private String content;

        private Apply.ApplyStatus applyStatus;

        private LocalDateTime createdDate;

        private LocalDateTime updateDate;

        private MemberDto.ReplyResponse member;

        private BoardResponseDto.ReplyResponse board;

    }

}
