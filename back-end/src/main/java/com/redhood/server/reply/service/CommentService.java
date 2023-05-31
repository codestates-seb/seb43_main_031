package com.redhood.server.reply.service;

import com.redhood.server.board.entity.Board;
import com.redhood.server.board.repository.BoardRepository;
import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberRepository;

import com.redhood.server.reply.entity.Comment;
import com.redhood.server.reply.repository.CommentRepository;
import com.redhood.server.security.UserDetailsImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Transactional
@Service
public class CommentService {
    private CommentRepository commentRepository;

    private BoardRepository boardRepository;

    private MemberRepository memberRepository;

    public CommentService(CommentRepository commentRepository, BoardRepository boardRepository, MemberRepository memberRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
    }

    public Comment createComment(Comment comment, UserDetailsImpl userDetails) {
        Comment savecomment = new Comment();
        if (comment.getBoard() != null) {
            comment.setBoard(findVerifiedBoard(comment.getBoard().getBoardId()));
            comment.setMember(findVerifiedMember(userDetails.getUserId()));
            comment.setCommentStatus(Comment.CommentStatus.COMMENT_ONE);
            savecomment = commentRepository.save(comment);
        } else if (comment.getComment() != null){
            comment.setComment(findVerifiedComment(comment.getComment().getCommentId()));
            comment.setMember(findVerifiedMember(userDetails.getUserId()));
            comment.setCommentStatus(Comment.CommentStatus.COMMENT_TWO);
            savecomment = commentRepository.save(comment);
        }
        return savecomment;
    }
    public Comment updateComment(Comment comment,UserDetailsImpl userDetails) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        if(findComment.getMember().getMemberId() == userDetails.getUserId()){
            Optional.ofNullable(comment.getContent()).ifPresent(content -> findComment.setContent(content));
        } else { new BusinessLogicException(ExceptionCode.AUTHOR_NOT_MATCH); }
        return commentRepository.save(findComment);
    }
    public List<Comment> findComments(long boardId){
        List<Comment> findComments = commentRepository.findByBoardBoardIdAndCommentStatusNot(boardId, Comment.CommentStatus.COMMENT_DELET);
        return findComments;
    }
    public List<Comment> findReplys(long commentId){
        List<Comment> findComments = commentRepository.findByCommentCommentIdAndCommentStatusNot(commentId,Comment.CommentStatus.COMMENT_DELET);
        return findComments;
    }
    public Comment findComment(long commentId){
        return findVerifiedComment(commentId);
    }
    public void deleteComment(long commentId,UserDetailsImpl userDetails) {
        Comment findComment = findVerifiedComment(commentId);
        if(findComment.getMember().getMemberId() == userDetails.getUserId()){
            findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELET);
            commentRepository.save(findComment);
        } else { new BusinessLogicException(ExceptionCode.AUTHOR_NOT_MATCH); }
    }
    @Transactional(readOnly = true)
    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
    @Transactional(readOnly = true)
    public Board findVerifiedBoard(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard = optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
