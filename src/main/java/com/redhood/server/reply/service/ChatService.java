package com.redhood.server.reply.service;

import com.redhood.server.exception.BusinessLogicException;
import com.redhood.server.exception.ExceptionCode;
import com.redhood.server.member.MemberRepository;
import com.redhood.server.member.entity.Member;
import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.entity.Chat;
import com.redhood.server.reply.repository.ApplyRepository;
import com.redhood.server.reply.repository.ChatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ChatService {
    private ChatRepository chatRepository;

    private ApplyRepository applyRepository;

    private MemberRepository memberRepository;

    public ChatService(ChatRepository chatRepository, ApplyRepository applyRepository, MemberRepository memberRepository) {
        this.chatRepository = chatRepository;
        this.applyRepository = applyRepository;
        this.memberRepository = memberRepository;
    }

    public Chat createChat(Chat chat){
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+chat.getApply().getApplyId());
        chat.setApply(findVerifiedApply(chat.getApply().getApplyId()));
        //멤버 조회(jwt적용 후 수정)
        chat.setMember(findVerifiedMember(1));
        ///
        return chatRepository.save(chat);
    }
    public List<Chat> findChats(long applyId){
        List<Chat> findChats = chatRepository.findByApplyApplyId(applyId);
        return findChats;
    }
    @Transactional(readOnly = true)
    public Apply findVerifiedApply(long applyId) {
        Optional<Apply> optionalComment = applyRepository.findById(applyId);
        Apply findApply = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.APPLY_NOT_FOUND));
        return findApply;
    }
    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
