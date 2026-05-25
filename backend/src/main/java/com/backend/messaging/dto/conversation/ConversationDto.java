package com.backend.messaging.dto.conversation;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDto {
    private Long id;
    private String type;
    private String name;
    private String lastMessageId;
    private LocalDateTime createdAt;
    private List<ConversationMemberDto> members;
}
