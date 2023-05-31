package com.redhood.server.reply.repository;

import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    List<Apply> findByBoardBoardId(long boardId);
}
