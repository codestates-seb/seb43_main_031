package com.redhood.server.reply.mapper;

import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.member.Member;
import com.redhood.server.member.MemberDto;
import com.redhood.server.reply.dto.ApplyDto;
import com.redhood.server.reply.entity.Apply;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-23T14:05:30+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class ApplyMapperImpl implements ApplyMapper {

    @Override
    public Apply applyDtoPatchToApply(ApplyDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Apply apply = new Apply();

        apply.setContent( requestBody.getContent() );

        return apply;
    }

    @Override
    public ApplyDto.Response applyToApplyDtoResponse(Apply apply) {
        if ( apply == null ) {
            return null;
        }

        ApplyDto.Response response = new ApplyDto.Response();

        response.setApplyId( apply.getApplyId() );
        response.setContent( apply.getContent() );
        response.setApplyStatus( apply.getApplyStatus() );
        response.setCreatedDate( apply.getCreatedDate() );
        response.setUpdateDate( apply.getUpdateDate() );
        response.setMember( memberToReplyResponse( apply.getMember() ) );
        response.setBoard( boardToReplyResponse( apply.getBoard() ) );

        return response;
    }

    @Override
    public List<ApplyDto.Response> applysToApplyDtoResponses(List<Apply> applys) {
        if ( applys == null ) {
            return null;
        }

        List<ApplyDto.Response> list = new ArrayList<ApplyDto.Response>( applys.size() );
        for ( Apply apply : applys ) {
            list.add( applyToApplyDtoResponse( apply ) );
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
        replyResponse.setMember( memberToReplyResponse( board.getMember() ) );

        return replyResponse;
    }
}
