package com.redhood.server.board.repository;

import com.redhood.server.board.entity.Board;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.redhood.server.board.entity.Board.BoardStatus.ADOPTION_DELETE;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByBoardId(long boardId);
    Optional<Board> findByTitle(String title);
    Page<Board> findAllByBoardStatusNot(Board.BoardStatus boardStatus, Pageable pageable);

    List<Board> findByExpiredDateTimeBeforeAndBoardStatusNot(LocalDateTime currentDateTime, Board.BoardStatus boardStatus);

    Page<Board> findByGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCaseAndBoardStatusNot(String guTag, String dongTag,Board.BoardStatus boardStatus,Pageable pageable);


    Page<Board> findByTitleContainingIgnoreCaseAndGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCaseAndBoardStatusNot(String title, String guTag, String dongTag, Board.BoardStatus boardStatus,Pageable pageable);


    Page<Board> findByTitleContainingIgnoreCaseAndBoardStatusNot(String title,  Board.BoardStatus boardStatus, Pageable pageable);

    //제목&내용 검색
}

