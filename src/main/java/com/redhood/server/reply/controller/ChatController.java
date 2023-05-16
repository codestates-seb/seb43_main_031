package com.redhood.server.reply.controller;

import com.redhood.server.reply.dto.ApplyDto;
import com.redhood.server.reply.dto.ChatDto;
import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.entity.Chat;
import com.redhood.server.reply.mapper.ChatMapper;
import com.redhood.server.reply.service.ChatService;
import com.redhood.server.response.MultiResponseDto;
import com.redhood.server.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {
    private ChatMapper mapper;

    private ChatService chatService;

    public ChatController(ChatMapper mapper, ChatService chatService) {
        this.mapper = mapper;
        this.chatService = chatService;
    }
    @PostMapping
    public ResponseEntity postChat(@Valid @RequestBody ChatDto.Post requestBody) {
        Chat chat = mapper.chatDtoPostToChat(requestBody);
        Chat saveChat = chatService.createChat(chat);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.chatToChatDtoResponse(saveChat)), HttpStatus.OK);
    }
    @GetMapping("/{applyId}")
    public ResponseEntity getchats(@PathVariable("applyId") @Positive long applyId) {
        List<Chat> findChats = chatService.findChats(applyId);

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.chatsToChatDtoResponses(findChats)),HttpStatus.OK);
    }
}
