package com.backend.messaging.dto.conversation;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateConversationRequest {
    private String type;
    private String name;
    private List<Long> memberIds;
}
