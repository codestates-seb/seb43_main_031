package com.redhood.server.board.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@NamedQuery(name = "Board.findNotExpired", query = "SELECT b FROM Board b WHERE b.expiredDateTime > currentDateTime")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    @Column
    private long memberId;

    @Column
    private String nickName;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 300)
    private String content;

    @Column(nullable = false)
    private long cost;

    @Column(name = "view_count", nullable = false, columnDefinition = "integer default 0")
    private long viewCount;

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' T 'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime expiredDateTime = LocalDateTime.now();
    @Column
    private LocalDateTime currentDateTime = LocalDateTime.now();

    @Column(nullable = false)
    private String dongTag;


    @Column(nullable = false)
    private String guTag;

    @Column(nullable = false)
    private String detailAddress;

    @Column(nullable = false)
    private boolean completed;

    @Enumerated(value = EnumType.STRING)
    private BoardStatus boardStatus = BoardStatus.ADOPTION_IN_PROGRESS;

    @Column(nullable = false, name = "created_date")
    private LocalDateTime createdDate = LocalDateTime.now();

    @Column(nullable = false, name = "updated_date")
    private LocalDateTime updatedDate = LocalDateTime.now();

    public void increaseViewCount() {
        this.viewCount++;
    }

    public enum BoardStatus {
        ADOPTION_IN_PROGRESS("채택진행중"),
        ADOPTION_COMPLETE("채택완료");


        @Getter
        private String questDec;

        BoardStatus(String questDec) {
            this.questDec = questDec;
        }

        }
}