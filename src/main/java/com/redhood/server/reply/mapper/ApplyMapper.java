package com.redhood.server.reply.mapper;

import com.redhood.server.board.entity.Board;
import com.redhood.server.reply.dto.ApplyDto;
import com.redhood.server.reply.entity.Apply;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ApplyMapper {

    default Apply applyDtoPostToApply(ApplyDto.Post requestBody){
        Apply apply = new Apply();
        Board board = new Board();
        board.setBoardId(requestBody.getBoardId());
        apply.setContent(requestBody.getContent());
        apply.setBoard(board);
        return apply;
    }
    Apply applyDtoPatchToApply(ApplyDto.Patch requestBody);
    ApplyDto.Response applyToApplyDtoResponse(Apply apply);
    List<ApplyDto.Response> applysToApplyDtoResponses(List<Apply> applys);
}
