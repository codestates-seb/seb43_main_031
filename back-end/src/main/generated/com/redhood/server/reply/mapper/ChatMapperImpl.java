package com.redhood.server.reply.mapper;

import com.redhood.server.member.Member;
import com.redhood.server.member.MemberDto;
import com.redhood.server.reply.dto.ChatDto;
import com.redhood.server.reply.entity.Chat;
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
public class ChatMapperImpl implements ChatMapper {

    @Override
    public ChatDto.Response chatToChatDtoResponse(Chat chat) {
        if ( chat == null ) {
            return null;
        }

        ChatDto.Response response = new ChatDto.Response();

        response.setChatId( chat.getChatId() );
        response.setContent( chat.getContent() );
        response.setMember( memberToReplyResponse( chat.getMember() ) );

        return response;
    }

    @Override
    public List<ChatDto.Response> chatsToChatDtoResponses(List<Chat> chats) {
        if ( chats == null ) {
            return null;
        }

        List<ChatDto.Response> list = new ArrayList<ChatDto.Response>( chats.size() );
        for ( Chat chat : chats ) {
            list.add( chatToChatDtoResponse( chat ) );
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
}
