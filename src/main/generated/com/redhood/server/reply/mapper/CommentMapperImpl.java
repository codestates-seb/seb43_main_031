package com.redhood.server.reply.mapper;

import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberDto;
import com.redhood.server.reply.dto.CommentDto;
import com.redhood.server.reply.entity.Comment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-18T15:43:24+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commentDtoPatchToComment(CommentDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setContent( requestBody.getContent() );

        return comment;
    }

    @Override
    public CommentDto.Response commentTocommentDtoResponse(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentDto.Response response = new CommentDto.Response();

        response.setCommentId( comment.getCommentId() );
        response.setContent( comment.getContent() );
        response.setCreatedDate( comment.getCreatedDate() );
        response.setUpdateDate( comment.getUpdateDate() );
        response.setMember( memberToReplyResponse( comment.getMember() ) );
        response.setBoard( boardToReplyResponse( comment.getBoard() ) );
        response.setComment( commentToReply( comment.getComment() ) );

        return response;
    }

    @Override
    public List<CommentDto.Response> commentsTocommentDtoResponses(List<Comment> comments) {
        if ( comments == null ) {
            return null;
        }

        List<CommentDto.Response> list = new ArrayList<CommentDto.Response>( comments.size() );
        for ( Comment comment : comments ) {
            list.add( commentTocommentDtoResponse( comment ) );
        }

        return list;
    }

    protected MemberDto.ReplyResponse memberToReplyResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.ReplyResponse replyResponse = new MemberDto.ReplyResponse();

        replyResponse.setMemberId( member.getMemberId() );
        replyResponse.setEmail( member.getEmail() );
        replyResponse.setNickName( member.getNickName() );

        return replyResponse;
    }

    protected BoardResponseDto.ReplyResponse boardToReplyResponse(Board board) {
        if ( board == null ) {
            return null;
        }

        BoardResponseDto.ReplyResponse replyResponse = new BoardResponseDto.ReplyResponse();

        replyResponse.setBoardId( board.getBoardId() );

        return replyResponse;
    }

    protected CommentDto.Reply commentToReply(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentDto.Reply reply = new CommentDto.Reply();

        reply.setCommentId( comment.getCommentId() );

        return reply;
    }
}
