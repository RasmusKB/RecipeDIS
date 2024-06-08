package com.dis.recipe.service;

import com.dis.recipe.dao.UserDao;
import com.dis.recipe.dto.RecipeInfo;
import com.dis.recipe.dto.UserInfo;
import com.dis.recipe.entity.Recipe;
import com.dis.recipe.entity.User;
import com.dis.recipe.util.DtoFactory;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {
	private final UserDao userDao;
	private final DtoFactory dtoFactory;

	public UserInfo create(UserInfo userInfo) {

		List<User> potentialUser = userDao.findUserByUsernameOrEmail(userInfo.getUsername(), userInfo.getEmail());
		if (!potentialUser.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A user with the provided user name or email already exists");
		}

		UserInfo user = insertUser(userInfo);
		System.out.println("TEST");
		return user;
	}
	private UserInfo insertUser(UserInfo user) {
		User entity = User.builder()
				.id(UUID.randomUUID().toString())
				.username(user.getUsername())
				.password(user.getPassword())
				.email(user.getEmail())
				.build();

		userDao.insert(entity.getId(), entity.getUsername(), entity.getPassword(), entity.getEmail());
		return dtoFactory.toInfo(entity);
	}
}
