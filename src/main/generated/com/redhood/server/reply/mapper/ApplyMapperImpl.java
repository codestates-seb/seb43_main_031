package com.redhood.server.reply.mapper;

import com.redhood.server.board.dto.BoardResponseDto;
import com.redhood.server.board.entity.Board;
import com.redhood.server.member.MemberDto;
import com.redhood.server.member.entity.Member;
import com.redhood.server.reply.dto.ApplyDto;
import com.redhood.server.reply.entity.Apply;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-15T11:05:37+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
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
        response.setMember( memberToResponse( apply.getMember() ) );
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

    protected MemberDto.Response memberToResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.Response response = new MemberDto.Response();

        if ( member.getMemberId() != null ) {
            response.setMemberId( member.getMemberId() );
        }

        return response;
    }

    protected BoardResponseDto.ReplyResponse boardToReplyResponse(Board board) {
        if ( board == null ) {
            return null;
        }

        BoardResponseDto.ReplyResponse replyResponse = new BoardResponseDto.ReplyResponse();

        replyResponse.setBoardId( board.getBoardId() );

        return replyResponse;
    }
}
