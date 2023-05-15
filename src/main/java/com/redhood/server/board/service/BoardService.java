package com.redhood.server.board.service;

import com.redhood.server.board.dto.BoardPatchDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.board.repository.BoardRepository;
import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.repository.util.ClassUtils.ifPresent;

@Service
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board createBoard(Board board) {
        verifyExistsTitle(board.getTitle());

        return boardRepository.save(board);
    }

    public Board updateBoard(Board board) {
        Board findBoard = findVerifiedBoard(board.getBoardId());

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
        return this.boardRepository.findAll(pageable);
    }

    public Page<Board> searchBoards(String titleKeyword, String contentKeyword, Pageable pageable) {
        if (StringUtils.isBlank(titleKeyword) && StringUtils.isBlank(contentKeyword)) {
            return boardRepository.findAll(pageable);
        }else
        if (StringUtils.isNotBlank(titleKeyword) && StringUtils.isNotBlank(contentKeyword)) {
            return boardRepository.findByTitleContainingIgnoreCaseAndContentContainingIgnoreCase(titleKeyword, contentKeyword, pageable);
        }
        else if (StringUtils.isNotBlank(titleKeyword)) {
            return boardRepository.findByTitleContainingIgnoreCase(titleKeyword, pageable);
        }
        else if (StringUtils.isNotBlank(contentKeyword)) {
            return boardRepository.findByContentContainingIgnoreCase(contentKeyword, pageable);
        }
        return Page.empty();
    }



    public void deleteBoard(long boardId) {
        Board findBoard = findVerifiedBoard(boardId);

        boardRepository.delete(findBoard);

    }

    @Transactional
    public void deleteExpiredBoards() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Board> expiredBoards = boardRepository.findByExpiredDateTimeBefore(currentDateTime);
        boardRepository.deleteAll(expiredBoards);
    }

    public Page<Board> getBoardsByGuTagAndDongTag(String guTagKeyword, String dongTagKeyword, Pageable pageable) {
        if (StringUtils.isBlank(guTagKeyword) && StringUtils.isBlank(dongTagKeyword)) {
            return boardRepository.findAll(pageable);
        } else if (StringUtils.isNotBlank(guTagKeyword) && StringUtils.isNotBlank(dongTagKeyword)) {
            return boardRepository.findByGuTagContainingIgnoreCaseAndDongTagContainingIgnoreCase(guTagKeyword, dongTagKeyword, pageable);
        } else if (StringUtils.isNotBlank(guTagKeyword)) {
            return boardRepository.findByGuTagContainingIgnoreCase(guTagKeyword, pageable);
        } else if (StringUtils.isNotBlank(dongTagKeyword)) {
            return boardRepository.findByDongTagContainingIgnoreCase(dongTagKeyword, pageable);
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
