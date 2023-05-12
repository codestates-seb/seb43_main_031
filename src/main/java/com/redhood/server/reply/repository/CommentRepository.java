package com.redhood.server.reply.repository;

import com.redhood.server.reply.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardBoardId(Long boardId);
    List<Comment> findByCommentCommentId(Long commentId);
}
