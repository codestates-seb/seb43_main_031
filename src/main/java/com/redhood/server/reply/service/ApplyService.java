package com.redhood.server.reply.service;

import com.redhood.server.board.entity.Board;
import com.redhood.server.board.repository.BoardRepository;
import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberRepository;
import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.repository.ApplyRepository;
import com.redhood.server.security.UserDetailsImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ApplyService {
    private ApplyRepository applyRepository;

    private BoardRepository boardRepository;

    private MemberRepository memberRepository;

    public ApplyService(ApplyRepository applyRepository, BoardRepository boardRepository, MemberRepository memberRepository) {
        this.applyRepository = applyRepository;
        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
    }

    public Apply createApply(Apply apply, UserDetailsImpl userDetails){
        apply.setBoard(findVerifiedBoard(apply.getBoard().getBoardId()));
        apply.setMember(findVerifiedMember(userDetails.getUserId()));
        return applyRepository.save(apply);
    }
    public List<Apply> findApplys(long boardId){
        List<Apply> findApplys = applyRepository.findByBoardBoardId(boardId);
        return findApplys;
    }
    public Apply findApply(long applyId){ return findVerifiedApply(applyId); }

    public Apply updateApply(Apply apply,UserDetailsImpl userDetails) {
        Apply findApply = findVerifiedApply(apply.getApplyId());
        if(findApply.getMember().getMemberId() == userDetails.getUserId()){
            Optional.ofNullable(apply.getContent()).ifPresent(content -> findApply.setContent(content));
        } else { new BusinessLogicException(ExceptionCode.AUTHOR_NOT_MATCH); }
        return applyRepository.save(findApply);
    }
    public Apply acceptApply(long applyId,UserDetailsImpl userDetails) {
        Apply findApply = findVerifiedApply(applyId);
        if(findApply.getBoard().getMember().getMemberId() == userDetails.getUserId()){
            if(findApply.getApplyStatus() == Apply.ApplyStatus.APPLY_REQUEST){
                Board findBoard = findVerifiedBoard(findApply.getBoard().getBoardId());
                findBoard.setBoardStatus(Board.BoardStatus.ADOPTION_COMPLETE);
                boardRepository.save(findBoard);
                findApply.setApplyStatus(Apply.ApplyStatus.APLLY_ACCEPT);
            } else { new BusinessLogicException(ExceptionCode.ALREADY_ACCEPT); }
        } else { new BusinessLogicException(ExceptionCode.AUTHOR_NOT_MATCH); }
        return applyRepository.save(findApply);
    }
    public Apply refuseApply(long applyId,UserDetailsImpl userDetails) {
        Apply findApply = findVerifiedApply(applyId);
        if(findApply.getBoard().getMember().getMemberId() == userDetails.getUserId()){
            if(findApply.getApplyStatus() == Apply.ApplyStatus.APLLY_ACCEPT){
                Board findBoard = findVerifiedBoard(findApply.getBoard().getBoardId());
                findBoard.setBoardStatus(Board.BoardStatus.ADOPTION_IN_PROGRESS);
                findApply.setApplyStatus(Apply.ApplyStatus.APPLY_REQUEST);
            } else { new BusinessLogicException(ExceptionCode.ALREADY_REQUEST); }
        } else { new BusinessLogicException(ExceptionCode.AUTHOR_NOT_MATCH); }
        return applyRepository.save(findApply);
    }
    public void deleteApply(long applyId,UserDetailsImpl userDetails) {
        Apply findApply = findVerifiedApply(applyId);
        if(findApply.getMember().getMemberId() == userDetails.getUserId()){
            applyRepository.delete(findApply);
        } else { new BusinessLogicException(ExceptionCode.AUTHOR_NOT_MATCH); }
    }
    @Transactional(readOnly = true)
    public Apply findVerifiedApply(long applyId) {
        Optional<Apply> optionalComment = applyRepository.findById(applyId);
        Apply findApply = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.APPLY_NOT_FOUND));
        return findApply;
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
