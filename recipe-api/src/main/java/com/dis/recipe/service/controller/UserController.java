package com.dis.recipe.service.controller;

import com.dis.recipe.service.UserService;
import com.dis.recipe.dto.UserInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RequestMapping("user")
@RestController
@AllArgsConstructor
public class UserController {
	private final UserService userService;

	@GetMapping(path = "/{id}")
	public UserInfo getUserById(@PathVariable final String id ) {
		return userService.getUserById(id);
	}

	@PostMapping(path = "/create",produces = MediaType.APPLICATION_JSON_VALUE)
	public UserInfo create(@RequestBody final UserInfo source) {
		return userService.create(source);
	}

	@PostMapping(path = "/login",produces = MediaType.APPLICATION_JSON_VALUE)
	public UserInfo login(@RequestBody final UserInfo userInfo) {
		return userService.login(userInfo.getUsername(), userInfo.getPassword());
	}
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public void deleteUser(@RequestBody final UserInfo userInfo) {
        userService.deleteUser(userInfo.getUsername(), userInfo.getPassword(), userInfo.getId());
    }
}



