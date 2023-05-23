package com.redhood.server.reply.repository;

import com.redhood.server.reply.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardBoardIdAndCommentStatusNot(Long boardId,Comment.CommentStatus commentStatus);
    List<Comment> findByCommentCommentIdAndCommentStatusNot(Long commentId,Comment.CommentStatus commentStatus);
}
