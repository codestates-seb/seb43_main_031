package com.redhood.server.board.mapper;

import com.redhood.server.board.dto.BoardPatchDto;
import com.redhood.server.board.dto.BoardPostDto;
import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import lombok.Builder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Component
public class BoardMapper {

    public Board boardPostDtoToBoard(BoardPostDto boardPostDto) {
        Board board = new Board();
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setDongTag(boardPostDto.getDongTag());
        board.setGuTag(boardPostDto.getGuTag());
        board.setDetailAddress(boardPostDto.getDetailAddress());
        board.setCost(boardPostDto.getCost());
        board.setExpiredDateTime(boardPostDto.getExpiredDateTime());
        board.setCompleted(boardPostDto.isCompleted());
        return board;

    }

    public Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto) {
        Board board = new Board();
        board.setBoardId(boardPatchDto.getBoardId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
        board.setDongTag(boardPatchDto.getDongTag());
        board.setGuTag(boardPatchDto.getGuTag());
        board.setDetailAddress(boardPatchDto.getDetailAddress());
        board.setCost(boardPatchDto.getCost());
        board.setExpiredDateTime(boardPatchDto.getExpiredDateTime());
        return board;
    }

    public BoardResponseDto boardToBoardResponseDto(Board board) {
        return new BoardResponseDto(board.getBoardId(),
                board.getMemberId(),
                board.getNickName(),
                board.getTitle(),
                board.getContent(),
                board.getCost(),
                board.getViewCount(),
                board.getExpiredDateTime(),
                board.getDongTag(),
                board.getGuTag(),
                board.getDetailAddress(),
                board.isCompleted(),
                board.getCreatedDate(),
                board.getUpdatedDate());
    }

    public BoardResponseDto mapToBoardResponseDto(Board board) {
        return new BoardResponseDto(board.getBoardId(),
                board.getMemberId(),
                board.getNickName(),
                board.getTitle(),
                board.getContent(),
                board.getCost(),
                board.getViewCount(),
                board.getExpiredDateTime(),
                board.getDongTag(),
                board.getGuTag(),
                board.getDetailAddress(),
                board.isCompleted(),
                board.getCreatedDate(),
                board.getUpdatedDate());
    }



    public Page<BoardResponseDto> boardPageToBoardResponseDtoPage(Page<Board> boardPage) {
        List<BoardResponseDto> dtoList = boardPage.stream()
                .map(this::mapToBoardResponseDto)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, boardPage.getPageable(),boardPage.getTotalElements());
    }
}

