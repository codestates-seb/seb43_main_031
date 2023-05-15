package com.redhood.server.reply.service;

import com.redhood.server.board.entity.Board;
import com.redhood.server.board.repository.BoardRepository;
import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.MemberRepository;
import com.redhood.server.member.entity.Member;
import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.repository.ApplyRepository;
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

    public Apply createApply(Apply apply){
        apply.setBoard(findVerifiedBoard(apply.getBoard().getBoardId()));
        //멤버 조회(jwt적용 후 수정)
        apply.setMember(findVerifiedMember(1));
        ///
        return applyRepository.save(apply);
    }
    public List<Apply> findApplys(long boardId){
        List<Apply> findApplys = applyRepository.findByBoardBoardId(boardId);
        return findApplys;
    }
    public Apply findApply(long applyId){ return findVerifiedApply(applyId); }

    public Apply updateApply(Apply apply) {
        Apply findApply = findVerifiedApply(apply.getApplyId());
        /// findComment 와 요청자가 같은지 검증 필요(jwt적용 후 추가)
        Optional.ofNullable(apply.getContent()).ifPresent(content -> findApply.setContent(content));
        return applyRepository.save(findApply);
    }
    public void deleteApply(long applyId) {
        Apply findApply = findVerifiedApply(applyId);
        applyRepository.delete(findApply);
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
