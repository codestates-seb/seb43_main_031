package com.redhood.server.reply.mapper;


import com.redhood.server.board.entity.Board;
import com.redhood.server.reply.dto.CommentDto;
import com.redhood.server.reply.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    default Comment commentDtoPostToComment(CommentDto.Post requestBody){
     Comment comment = new Comment();
     Board board = new Board();
     board.setBoardId(requestBody.getBoardId());
     comment.setContent(requestBody.getContent());
     comment.setBoard(board);
     return comment;
    }
    Comment commentDtoPatchToComment(CommentDto.Patch requestBody);
    CommentDto.Response commentTocommentDtoResponse(Comment comment);
    List<CommentDto.Response> commentsTocommentDtoResponses(List<Comment> comments);
}
