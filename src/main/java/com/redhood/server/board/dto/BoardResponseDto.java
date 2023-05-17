package com.redhood.server.board.dto;

import com.redhood.server.member.MemberDto;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponseDto {
    private long boardId;
    private String nickName;
    private String title;
    private String content;
    private long cost;
    private long viewCount;
    private LocalDateTime expiredDateTime;
    private String dongTag;
    private String guTag;
    private String detailAddress;
    private boolean completed;
    private MemberDto.Response member;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class ReplyResponse{
    public long boardId;
    }
}


