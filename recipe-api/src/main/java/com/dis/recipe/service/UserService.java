package com.dis.recipe.service;

import com.dis.recipe.dto.UserInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {
	public UserInfo create(UserInfo recipe) {
		System.out.println("TEST");
		return recipe;
	}
}
