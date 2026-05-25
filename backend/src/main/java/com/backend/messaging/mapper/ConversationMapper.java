package com.backend.messaging.mapper;

import java.util.List;

import com.backend.messaging.dto.conversation.ConversationDto;
import com.backend.messaging.dto.conversation.ConversationMemberDto;
import com.backend.messaging.model.Conversation;
import com.backend.messaging.model.ConversationMember;
import com.backend.messaging.model.User;

public final class ConversationMapper {
    private ConversationMapper() {
    }

    public static ConversationDto toDto(Conversation conversation) {
        List<ConversationMemberDto> members = conversation.getMembers()
                .stream()
                .map(ConversationMapper::toMemberDto)
                .toList();

        return ConversationDto.builder()
                .id(conversation.getId())
                .type(conversation.getType())
                .name(conversation.getName())
                .lastMessageId(conversation.getLastMessageId())
                .createdAt(conversation.getCreatedAt())
                .members(members)
                .build();
    }

    private static ConversationMemberDto toMemberDto(ConversationMember member) {
        User memberUser = member.getUser();
        return ConversationMemberDto.builder()
                .userId(memberUser != null ? memberUser.getId() : null)
                .username(memberUser != null ? memberUser.getUsername() : null)
                .avatar(memberUser != null ? memberUser.getAvatar() : null)
                .role(member.getRole())
                .joinedAt(member.getJoinedAt())
                .build();
    }
}
