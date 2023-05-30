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
public class Apply extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applyId;

    @Column(length = 16)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ApplyStatus applyStatus = ApplyStatus.APPLY_REQUEST;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;



    public enum ApplyStatus {
        APPLY_REQUEST("요청중"),
        APLLY_ACCEPT("승인");

        @Getter
        private String status;

        ApplyStatus(String status) {
            this.status = status;
        }
    }
}
