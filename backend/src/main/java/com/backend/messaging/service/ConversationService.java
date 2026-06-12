package com.backend.messaging.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.backend.messaging.dto.conversation.CreateConversationRequest;
import com.backend.messaging.dto.conversation.ConversationDto;
import com.backend.messaging.mapper.ConversationMapper;
import com.backend.messaging.model.Conversation;
import com.backend.messaging.model.ConversationMember;
import com.backend.messaging.model.User;
import com.backend.messaging.repository.ConversationMemberRepository;
import com.backend.messaging.repository.ConversationRepository;
import com.backend.messaging.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ConversationService {
    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    ConversationMemberRepository memberRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    public boolean create(CreateConversationRequest request) {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (user == null) {
            return false;
        }

        // If PRIVATE conversation between two users, compute private_key and avoid duplicates
        String privateKey = null;
        if ("PRIVATE".equalsIgnoreCase(request.getType()) && request.getMemberIds() != null && request.getMemberIds().size() == 1) {
            Long otherId = request.getMemberIds().get(0);
            Long ownerId = user.getId();
            Long a = Math.min(ownerId, otherId);
            Long b = Math.max(ownerId, otherId);
            privateKey = a + ":" + b;
            var existing = conversationRepository.findByPrivateKey(privateKey);
            if (existing.isPresent()) {
                // conversation already exists, skip creation
                return true;
            }
        }

        Conversation conversation = Conversation.builder()
                        .name(request.getName())
                        .type(request.getType())
                        .privateKey(privateKey)
                        .createdAt(LocalDateTime.now())
                        .build();

        conversationRepository.save(conversation);

        ConversationMember Owner = ConversationMember.builder()
                .conversation(conversation)
                .user(user)
                .role("OWNER")
                .build();

        memberRepository.save(Owner);
        
        for (Long memberId : request.getMemberIds()) {
            User memberUser = userRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("User not found: " + memberId));
            ConversationMember member = ConversationMember.builder()
                    .conversation(conversation)
                    .user(memberUser)
                    .build();

            memberRepository.save(member);
        }
        return true;
    }

    @Transactional
    public List<ConversationDto> getAll(){
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();    
        if (user == null) {
            return Collections.emptyList();
        }
        return conversationRepository.findDistinctByMembers_User_Id(user.getId())
                .stream()
            .map(ConversationMapper::toDto)
                .toList();
    }
}
