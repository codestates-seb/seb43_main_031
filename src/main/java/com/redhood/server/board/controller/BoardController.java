package com.redhood.server.board.controller;

import com.redhood.server.board.dto.BoardPatchDto;
import com.redhood.server.board.dto.BoardPostDto;
import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.board.mapper.BoardMapper;
import com.redhood.server.board.service.BoardService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

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
    public ResponseEntity postBoard(@RequestBody @Valid BoardPostDto boardPostDto) {
        if(boardPostDto.getExpiredDateTime().isBefore(LocalDateTime.now())) {
            throw new ValidationException("만료일자 현재 날짜보다 이전입니다.");
        }
        Board board = mapper.boardPostDtoToBoard(boardPostDto);
        Board response = boardService.createBoard(board);

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @Valid @RequestBody BoardPatchDto boardPatchDto) {

        boardPatchDto.setBoardId(boardId);
        Board response = boardService.updateBoard(mapper.boardPatchDtoToBoard(boardPatchDto));

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId) {
        Board response = boardService.findBoard(boardId);
                         boardService.boardViewCounts(boardId);

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
    }

     @GetMapping
     public ResponseEntity<Page<BoardResponseDto>> getBoards(@PageableDefault(size=10, page=0, sort="createdDate", direction=Sort.Direction.DESC)Pageable pageable,
                                                             @RequestParam(name = "sortProperty", required = false) String sortProperty,
                                                             @RequestParam(name = "sortDirection", required = false) String sortDirection) {
            if(sortProperty != null && sortDirection != null) {
                Sort sort;
                if(sortProperty.equals("viewCount")) {
                    sort = Sort.by(Sort.Direction.fromString(sortDirection), "viewCount");
                } else {
                    sort = Sort.by(Sort.Direction.fromString(sortDirection), "createdDate");
                }
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
            }
            boardService.deleteExpiredBoards();
            Page<Board> boardPage = boardService.getBoards(pageable);
            Page<BoardResponseDto> boardResponseDtoPage = mapper.boardPageToBoardResponseDtoPage(boardPage);
            return new ResponseEntity<>(boardResponseDtoPage, HttpStatus.OK);
    }

    @GetMapping("/regions")
    public ResponseEntity<Page<BoardResponseDto>> getBoardsByRegion(@RequestParam(required = false) String guTag,
                                                                    @RequestParam(required = false) String dongTag,
                                                                    @PageableDefault(size = 10, page = 0, sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Board> boardPage = boardService.getBoardsByGuTagAndDongTag(guTag, dongTag, pageable);
        Page<BoardResponseDto> boardResponseDtoPage = mapper.boardPageToBoardResponseDtoPage(boardPage);
        return new ResponseEntity<>(boardResponseDtoPage, HttpStatus.OK);
    }

    @GetMapping("/search")
    public  ResponseEntity<Page<BoardResponseDto>> searchPaging(@RequestParam(required = false) String title,
                                                                @RequestParam(required = false) String content,
                                                                @PageableDefault(size = 10, page = 0, sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
    Page<Board> boardPage = boardService.searchBoards(title, content, pageable);
    Page<BoardResponseDto> boardResponseDtoPage = mapper.boardPageToBoardResponseDtoPage(boardPage);

    return  new ResponseEntity<>(boardResponseDtoPage, HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(
            @PathVariable("board-id") @Positive long boardId) {
        System.out.println("# delete board");
        boardService.deleteBoard(boardId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
