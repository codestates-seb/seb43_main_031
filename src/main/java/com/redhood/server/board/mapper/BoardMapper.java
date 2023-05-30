package com.redhood.server.board.mapper;

import com.redhood.server.board.dto.BoardPatchDto;
import com.redhood.server.board.dto.BoardPostDto;
import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberMapper;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Component
@RequiredArgsConstructor
public class BoardMapper {
    private final MemberMapper memberMapper;

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
        board.setCompleted(boardPatchDto.isCompleted());
        board.setExpiredDateTime(boardPatchDto.getExpiredDateTime());
        return board;
    }

    public BoardResponseDto boardToBoardResponseDto(Board board) {
        BoardResponseDto boardResponseDto = new BoardResponseDto();
                boardResponseDto.setBoardId(board.getBoardId());
                boardResponseDto.setTitle(board.getTitle());
                boardResponseDto.setContent(board.getContent());
                boardResponseDto.setCost(board.getCost());
                boardResponseDto.setViewCount(board.getViewCount());
                boardResponseDto.setExpiredDateTime(board.getExpiredDateTime());
                boardResponseDto.setDongTag(board.getDongTag());
                boardResponseDto.setGuTag(board.getGuTag());
                boardResponseDto.setDetailAddress(board.getDetailAddress());
                boardResponseDto.setCompleted(board.isCompleted());
                boardResponseDto.setMember(memberMapper.memberToMemberResponseDto(board.getMember()));
                boardResponseDto.setCreatedDate(board.getCreatedDate());
                boardResponseDto.setUpdatedDate(board.getUpdatedDate());
                return boardResponseDto;
    }





    public Page<BoardResponseDto> boardPageToBoardResponseDtoPage(Page<Board> boardPage) {
        Page<BoardResponseDto> map = boardPage.map(board -> boardToBoardResponseDto(board));

        return map;
    }

}

