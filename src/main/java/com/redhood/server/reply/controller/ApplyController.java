package com.redhood.server.reply.controller;

import com.redhood.server.reply.dto.ApplyDto;
import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.mapper.ApplyMapper;
import com.redhood.server.reply.service.ApplyService;
import com.redhood.server.response.MultiResponseDto;
import com.redhood.server.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/applys")
public class ApplyController {
    private ApplyMapper mapper;

    private ApplyService applyService;

    public ApplyController(ApplyMapper mapper, ApplyService applyService) {
        this.mapper = mapper;
        this.applyService = applyService;
    }
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody ApplyDto.Post requestBody) {
        Apply apply = mapper.applyDtoPostToApply(requestBody);
        Apply saveApply = applyService.createApply(apply);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.applyToApplyDtoResponse(saveApply)), HttpStatus.OK);
    }
    @GetMapping("/boardId/{boardId}")
    public ResponseEntity getApplys(@PathVariable("boardId") @Positive long boardId) {
        List<Apply> findApplys = applyService.findApplys(boardId);

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.applysToApplyDtoResponses(findApplys)),HttpStatus.OK);
    }
    @GetMapping("/{applyId}")
    public ResponseEntity getComment(@PathVariable("applyId") @Positive long applyId) {
        Apply findApply = applyService.findApply(applyId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.applyToApplyDtoResponse(findApply)),HttpStatus.OK);
    }
    @PatchMapping("/{applyId}")
    public ResponseEntity patchApply(@PathVariable("applyId") @Positive long applyId,
                                       @Valid @RequestBody ApplyDto.Patch requestBody) {
        Apply apply = mapper.applyDtoPatchToApply(requestBody);
        apply.setApplyId(applyId);
        Apply updateApply = applyService.updateApply(apply);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.applyToApplyDtoResponse(updateApply)),
                HttpStatus.OK);
    }
    @DeleteMapping("/{applyId}")
    public ResponseEntity deleteApply(@PathVariable("applyId") @Positive long applyId){
        applyService.deleteApply(applyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
