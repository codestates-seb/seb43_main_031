package com.redhood.server.reply.dto;

import com.redhood.server.board.BoardDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.member.MemberDto;
import com.redhood.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class CommentDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post {
        @NotNull
        private long boardId;

        @NotNull
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

        private Long commentId;

        private String content;

        private LocalDateTime createdDate;

        private LocalDateTime updateDate;

        private MemberDto.Response member;

        private BoardDto.Response board;

    }
}
