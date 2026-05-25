package com.backend.messaging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.messaging.model.ConversationMember;

@Repository
public interface ConversationMemberRepository extends JpaRepository<ConversationMember,Long>{

}
