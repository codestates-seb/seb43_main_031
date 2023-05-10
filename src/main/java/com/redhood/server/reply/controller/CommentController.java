package com.redhood.server.reply.controller;


import com.redhood.server.reply.dto.CommentDto;
import com.redhood.server.reply.entity.Comment;
import com.redhood.server.reply.mapper.CommentMapper;
import com.redhood.server.reply.service.CommentService;
import com.redhood.server.response.MultiResponseDto;
import com.redhood.server.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentMapper mapper;

    private CommentService commentService;

    public CommentController(CommentMapper mapper, CommentService commentService) {
        this.mapper = mapper;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody) {
        Comment comment = mapper.commentDtoPostToComment(requestBody);
        Comment saveComment = commentService.createComment(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentTocommentDtoResponse(saveComment)),HttpStatus.OK);
    }
    @GetMapping("/boardId/{boardId}")
    public ResponseEntity getComments(@PathVariable("boardId") @Positive long boardId) {
        List<Comment> findComments = commentService.findComments(boardId);

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.commentsTocommentDtoResponses(findComments)),HttpStatus.OK);
    }
    @GetMapping("/{commentId}")
    public ResponseEntity getComment(@PathVariable("commentId") @Positive long commentId) {
        Comment findComment = commentService.findComment(commentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentTocommentDtoResponse(findComment)),HttpStatus.OK);
    }
    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@PathVariable("commentId") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch requestBody) {
        Comment comment = mapper.commentDtoPatchToComment(requestBody);
        comment.setCommentId(commentId);
        Comment updateComment = commentService.updateComment(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentTocommentDtoResponse(updateComment)),
                HttpStatus.OK);
    }
    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") @Positive long commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
