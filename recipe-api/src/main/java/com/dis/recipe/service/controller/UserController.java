package com.dis.recipe.service.controller;

import com.dis.recipe.service.UserService;
import com.dis.recipe.dto.UserInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.math.BigInteger;

@Slf4j
@RequestMapping("user")
@RestController
@AllArgsConstructor
public class UserController {
	private final UserService UserService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	// endpoint for creating user
	public UserInfo create(@RequestBody UserInfo source) {
	    UserInfo user = UserService.create(source);
		System.out.println(user);
		return user;
	}
}

