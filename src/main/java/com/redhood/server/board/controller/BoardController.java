package com.redhood.server.board.controller;

import com.redhood.server.board.dto.BoardPatchDto;
import com.redhood.server.board.dto.BoardPostDto;
import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.board.mapper.BoardMapper;
import com.redhood.server.board.service.BoardService;

import com.redhood.server.security.UserDetailsImpl;
import org.springframework.data.domain.*;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/boards")
@Validated
public class BoardController {

    private final BoardService boardService;
    private final BoardMapper mapper;

    public BoardController(BoardService boardService, BoardMapper mapper) {
        this.boardService = boardService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postBoard(@RequestBody @Valid BoardPostDto boardPostDto,
                                    @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (boardPostDto.getExpiredDateTime().isBefore(LocalDateTime.now())) {
            throw new ValidationException("만료일자 현재 날짜보다 이전입니다.");
        }
        Board board = mapper.boardPostDtoToBoard(boardPostDto);
        Board response = boardService.createBoard(board, userDetails);

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity patchBoard(@PathVariable("boardId") @Positive long boardId,
                                     @Valid @RequestBody BoardPatchDto boardPatchDto,
                                     @AuthenticationPrincipal UserDetailsImpl userDetails) {

        boardPatchDto.setBoardId(boardId);
        Board response = boardService.updateBoard(userDetails, mapper.boardPatchDtoToBoard(boardPatchDto));

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity getBoard(@PathVariable("boardId") @Positive long boardId) {
        Board response = boardService.findBoard(boardId);
        boardService.boardViewCounts(boardId);

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<BoardResponseDto>> getBoards(@RequestParam(required = false) String guTag,
                                                            @RequestParam(required = false) String dongTag,
                                                            @RequestParam(required = false) String title,
                                                            @RequestParam(required = false) String content,
                                                            @RequestParam(name = "sortProperty", required = false) String sortProperty,
                                                            @RequestParam(name = "sortDirection", required = false) String sortDirection,
                                                            @PageableDefault(size = 10, page = 0, sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        if (sortProperty != null && sortDirection != null) {
            Sort sort;
            if (sortProperty.equals("viewCount")) {
                sort = Sort.by(Sort.Direction.fromString(sortDirection), "viewCount");
            } else {
                sort = Sort.by(Sort.Direction.fromString(sortDirection), "createdDate");
            }
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        }

        Page<Board> boardPage;

        if ((title != null) && (guTag != null && dongTag != null)) {
            Page<Board> searchResultPage = boardService.searchBoards(title, guTag, dongTag, pageable);
            if (searchResultPage.isEmpty()) {
                boardPage = boardService.filterBoardsByGuTagAndDongTag(searchResultPage, guTag, dongTag, pageable);
            } else {
                boardPage = searchResultPage;
            }

        } else if (title != null) {
            boardPage = boardService.searchBoards(title, guTag, dongTag, pageable);


        } else if (guTag != null && dongTag != null) {
            boardPage = boardService.getBoardsByGuTagAndDongTag(guTag, dongTag, pageable);
        } else {
            boardService.deleteExpiredBoards();
            boardPage = boardService.getBoards(pageable);
        }
        Page<BoardResponseDto> boardResponseDtoPage = mapper.boardPageToBoardResponseDtoPage(boardPage);
        return new ResponseEntity<>(boardResponseDtoPage, HttpStatus.OK);


    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteBoard(
            @PathVariable("boardId") @Positive long boardId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        System.out.println("# delete board");
        boardService.deleteBoard(userDetails, boardId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
