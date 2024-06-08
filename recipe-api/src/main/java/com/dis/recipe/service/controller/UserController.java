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
	private final UserService userService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	// endpoint for creating user
	public UserInfo create(@RequestBody UserInfo source) {
	    UserInfo user = userService.create(source);
		System.out.println(user);
		return user;
	}

	// NOTE: post would probably be preferred since query params with username and password isn't the best lmao (we could also support email login
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public UserInfo login(@PathVariable String username, @PathVariable String password) {
		return userService.login(username, password);
	}
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public void deleteUser(@PathVariable String username, @PathVariable String password, @PathVariable String id) {
        userService.deleteUser(username, password, id);
    }
}

