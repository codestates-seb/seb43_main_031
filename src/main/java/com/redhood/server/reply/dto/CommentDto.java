package com.redhood.server.reply.dto;

import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.member.MemberDto;
import com.redhood.server.reply.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class CommentDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post {

        private long boardId;
        private long commentId;
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

        private Comment.CommentStatus commentStatus;

        private MemberDto.ReplyResponse member;

        private BoardResponseDto.ReplyResponse board;

        private CommentDto.Reply comment;

    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Reply {

        private Long commentId;


    }
}
