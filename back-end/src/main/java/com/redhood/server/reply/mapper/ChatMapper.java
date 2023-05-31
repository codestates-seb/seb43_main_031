package com.redhood.server.reply.mapper;

import com.redhood.server.board.entity.Board;
import com.redhood.server.reply.dto.ApplyDto;
import com.redhood.server.reply.dto.ChatDto;
import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.entity.Chat;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChatMapper {
    default Chat chatDtoPostToChat(ChatDto.Post requestBody){
        Chat chat = new Chat();
        Apply apply = new Apply();
        apply.setApplyId(requestBody.getApplyId());
        chat.setContent(requestBody.getContent());
        chat.setApply(apply);
        return chat;
    }
    ChatDto.Response chatToChatDtoResponse(Chat chat);
    List<ChatDto.Response> chatsToChatDtoResponses(List<Chat> chats);
}
