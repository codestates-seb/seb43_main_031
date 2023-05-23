package com.redhood.server.reply.entity;

import com.redhood.server.audit.Timestamped;
import com.redhood.server.board.entity.Board;
import com.redhood.server.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Comment extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(length = 400, nullable = false)
    private String content;
    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private CommentStatus commentStatus;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;
    @ManyToOne
    @JoinColumn(name = "REPLY_ID")
    private Comment comment;

    public enum CommentStatus {
        COMMENT_ONE("댓글"),
        COMMENT_TWO("대댓글"),
        COMMENT_DELET("삭제");

        @Getter
        private String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}
