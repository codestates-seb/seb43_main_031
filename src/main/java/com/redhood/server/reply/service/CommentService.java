package com.redhood.server.reply.service;

import com.redhood.server.board.BoardRepository;
import com.redhood.server.board.entity.Board;
import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.MemberRepository;
import com.redhood.server.member.entity.Member;
import com.redhood.server.reply.entity.Comment;
import com.redhood.server.reply.repository.CommentRepository;
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

    public Comment createComment(Comment comment){
        comment.setBoard(findVerifiedBoard(comment.getBoard().getBoardId()));
        //멤버 조회(jwt적용 후 수정)
        comment.setMember(findVerifiedMember(1));
        ///
        return commentRepository.save(comment);
    }
    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        /// findComment 와 요청자가 같은지 검증 필요(jwt적용 후 추가)
        Optional.ofNullable(comment.getContent()).ifPresent(content -> findComment.setContent(content));
        return commentRepository.save(findComment);
    }
    public List<Comment> findComments(long boardId){
        List<Comment> findComments = commentRepository.findByBoardBoardId(boardId);
        return findComments;
    }
    public Comment findComment(long commentId){
        return findVerifiedComment(commentId);
    }
    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
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
