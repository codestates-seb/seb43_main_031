package com.redhood.server.reply.repository;

import com.redhood.server.reply.entity.Apply;
import com.redhood.server.reply.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByApplyApplyId(long applyId);
}
