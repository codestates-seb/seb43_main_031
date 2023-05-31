package com.redhood.server.board.service;

import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.board.repository.BoardRepository;
import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberRepository;
import com.redhood.server.member.MemberService;
import com.redhood.server.reply.entity.Comment;
import com.redhood.server.security.UserDetailsImpl;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.data.domain.Page;


import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public BoardService(BoardRepository boardRepository, MemberRepository memberRepository, MemberService memberService) {
        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    public Board createBoard(Board board, UserDetailsImpl user) {
        verifyExistsTitle(board.getTitle());
        Optional<Member> findUserName = memberRepository.findByEmail(user.getUsername());
        board.setMember(findUserName.get());

        return boardRepository.save(board);
    }

    public Board updateBoard(UserDetailsImpl userDetails, Board board) {
        Board findBoard = findVerifiedBoard(board.getBoardId());

        memberService.verifyLogInMemberMatchesMember(userDetails.getUserId(),findBoard.getMember().getMemberId());

        Optional.ofNullable(board.getTitle())
                .ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent())
                .ifPresent(content -> findBoard.setContent(content));
        Optional.ofNullable(board.getCost())
                .ifPresent(cost -> findBoard.setCost(cost));
        Optional.ofNullable(board.getDongTag())
                .ifPresent(dongTag -> findBoard.setDongTag(dongTag));
        Optional.ofNullable(board.getGuTag())
                .ifPresent(guTag -> findBoard.setGuTag(guTag));
        Optional.ofNullable(board.getDetailAddress())
                .ifPresent(detailAddress -> findBoard.setDetailAddress(detailAddress));
        Optional.ofNullable(board.isCompleted())
                .ifPresent(completed -> findBoard.setCompleted(completed));
        Optional.ofNullable(board.getExpiredDateTime())
                .ifPresent(expiredDateTime -> findBoard.setExpiredDateTime(expiredDateTime));
        Optional.ofNullable(board.getBoardStatus())
                .ifPresent(boardStatus -> findBoard.setBoardStatus(boardStatus));


        findBoard.setUpdatedDate(LocalDateTime.now());

        return boardRepository.save(findBoard);

    }

    public Board boardViewCounts(long boardId) {
        Optional<Board> board = this.boardRepository.findById(boardId);
        if(board.isPresent()) {
        Board board1 = board.get();
        board1.increaseViewCount();
        this.boardRepository.save(board1);
        return board1;
    } else {
        throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
    }
}

    public Board findBoard(long boardId) {
        return findVerifiedBoard(boardId);
    }


    public Page<Board> getBoards(Pageable pageable) {
        return this.boardRepository.findAllByBoardStatusNot(Board.BoardStatus.ADOPTION_DELETE, pageable);

    }




    public void deleteBoard(UserDetailsImpl userDetails, long boardId) {
        Board findBoard = findVerifiedBoard(boardId);
        findBoard.setBoardStatus(Board.BoardStatus.ADOPTION_DELETE);

        memberService.verifyLogInMemberMatchesMember(userDetails.getUserId(), findBoard.getMember().getMemberId());

        boardRepository.save(findBoard);

    }

    @Transactional
    public void deleteExpiredBoards() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Board> expiredBoards = boardRepository.findByExpiredDateTimeBeforeAndBoardStatusNot(currentDateTime, Board.BoardStatus.ADOPTION_DELETE);
        for(Board board : expiredBoards) {
            board.setBoardStatus(Board.BoardStatus.ADOPTION_DELETE);
        }

        boardRepository.saveAll(expiredBoards);
    }

    public Page<Board> getBoardsByGuTagAndDongTag(String guTagKeyword, String dongTagKeyword, Pageable pageable) {
        if (StringUtils.isBlank(guTagKeyword) && StringUtils.isBlank(dongTagKeyword)) {
            return boardRepository.findAll(pageable);
        } else if (StringUtils.isNotBlank(guTagKeyword) && StringUtils.isNotBlank(dongTagKeyword)) {
            return boardRepository.findByGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCaseAndBoardStatusNot(guTagKeyword, dongTagKeyword, Board.BoardStatus.ADOPTION_DELETE,pageable);
        }
        return Page.empty();

    }
    public Page<Board> filterBoardsByGuTagAndDongTag(Page<Board> boardPage, String guTagKeyword, String dongTagKeyword, Pageable pageable) {
        if (StringUtils.isBlank(guTagKeyword) && StringUtils.isBlank(dongTagKeyword)) {
            return boardPage;
        } else if (StringUtils.isNotBlank(guTagKeyword) && StringUtils.isNotBlank(dongTagKeyword)) {
            return boardRepository.findByGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCaseAndBoardStatusNot(guTagKeyword, dongTagKeyword, Board.BoardStatus.ADOPTION_DELETE,pageable);
        }
        return Page.empty();
    }


  public Page<Board> searchBoards(String titleKeyword, String guTagKeyword, String dongTagKeyword, Pageable pageable) {
      if (StringUtils.isBlank(guTagKeyword) && StringUtils.isBlank(dongTagKeyword)) {
          if (StringUtils.isNotBlank(titleKeyword)) {
              return boardRepository.findByTitleContainingIgnoreCaseAndBoardStatusNot(titleKeyword,Board.BoardStatus.ADOPTION_DELETE,pageable);
          } else {
              return boardRepository.findAll(pageable);
          }
      } else if (StringUtils.isNotBlank(guTagKeyword) && StringUtils.isNotBlank(dongTagKeyword)) {
          if (StringUtils.isNotBlank(titleKeyword)) {
              return boardRepository.findByTitleContainingIgnoreCaseAndGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCaseAndBoardStatusNot(titleKeyword, guTagKeyword, dongTagKeyword, Board.BoardStatus.ADOPTION_DELETE,pageable);
          } else {
              return boardRepository.findByGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCaseAndBoardStatusNot(guTagKeyword, dongTagKeyword, Board.BoardStatus.ADOPTION_DELETE,pageable);
          }

      }
      return Page.empty();

  }

    public  Board findVerifiedBoard(long boardId) {
        Optional<Board> optionalBoard =
                boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    private void verifyExistsTitle(String title) {
        Optional<Board> board = boardRepository.findByTitle(title);
        if(board.isPresent())
            throw new BusinessLogicException(ExceptionCode.BOARD_EXISTS);
    }

}
