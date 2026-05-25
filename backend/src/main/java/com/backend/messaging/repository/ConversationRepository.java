package com.backend.messaging.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.messaging.model.Conversation;

@Repository
public interface ConversationRepository extends  JpaRepository<Conversation,Long>{
	List<Conversation> findDistinctByMembers_User_Id(Long userId);
}
