package com.redhood.server.board.repository;

import com.redhood.server.board.entity.Board;
import jdk.jfr.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByBoardId(long boardId);
    Optional<Board> findByTitle(String title);
    Page<Board> findAll(Pageable pageable);

    List<Board> findByExpiredDateTimeBefore(LocalDateTime currentDateTime);


    Page<Board> findByGuTagContainingIgnoreCase(String guTag, Pageable pageable);
    Page<Board> findByDongTagContainingIgnoreCase(String dongTag, Pageable pageable);
    Page<Board> findByGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCase(String guTag, String dongTag, Pageable pageable);
     // 지역필터링



    Page<Board> findByTitleContainingIgnoreCaseAndContentContainingIgnoreCase(String title, String content, Pageable pageable);
    Page<Board> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Board> findByContentContainingIgnoreCase(String content, Pageable pageable);
    //제목&내용 검색
}

