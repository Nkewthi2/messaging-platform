package com.backend.messaging.dto.message;

import java.util.List;

import com.backend.messaging.model.MessageBlock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WsSendMessageRequest {
    private String id;
    private Long conversationId;
    private Long senderId;
    private List<MessageBlock> blocks;
    private String replyTo;

    public SendMessageRequest toSendMessageRequest() {
        return SendMessageRequest.builder()
                .id(this.id)
                .senderId(this.senderId)
                .blocks(this.blocks)
                .replyTo(this.replyTo)
                .build();
    }
}
