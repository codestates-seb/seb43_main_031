package com.redhood.server.reply.dto;

import com.redhood.server.board.BoardDto;
import com.redhood.server.member.MemberDto;
import com.redhood.server.reply.entity.Apply;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ChatDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post {
        @NotNull
        private long applyId;

        @NotNull
        private String content;
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response {

        private Long chatId;

        private String content;

        private MemberDto.Response member;

    }
}
