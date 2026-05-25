package com.backend.messaging.dto.users;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
   private Long id;
   private String username;
   private String avatar;
   private LocalDateTime createdAt;
}
