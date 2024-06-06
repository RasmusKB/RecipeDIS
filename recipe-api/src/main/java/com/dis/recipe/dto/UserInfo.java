package com.dis.recipe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfo {
    private String id;
    private String username;
	private String password;
	private String email;
}
