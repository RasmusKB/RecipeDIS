package com.dis.recipe.service;

import com.dis.recipe.dao.UserDao;
import com.dis.recipe.dto.UserInfo;
import com.dis.recipe.entity.User;
import com.dis.recipe.util.DtoFactory;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {
	private final UserDao userDao;
	private final DtoFactory dtoFactory;

	public UserInfo getUserById(String id) {
		return dtoFactory.toInfo(userDao.getUserById(id));
	}

	public UserInfo create(UserInfo userInfo) {
		if (!validateEmail(userInfo.getEmail())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The email "+userInfo.getEmail()+" is not compliant");
		}
		List<User> potentialUser = userDao.findUserByUsernameOrEmail(userInfo.getUsername(), userInfo.getEmail());
		if (!potentialUser.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A user with the provided user name or email already exists");
		}

		return insertUser(userInfo);
	}


	public UserInfo login(String username, String password) {
		List<User> potentialUsers = userDao.findUserByUsernameAndPassword(username, password);
		if (potentialUsers.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The username or password is not valid");
		}
		return dtoFactory.toInfo(potentialUsers.get(0));
	}
	public void deleteUser(String username, String password, String id) {
		List<User> potentialUser = userDao.findUserByIdAndUsernameAndPassword(id, username, password);
		if (potentialUser.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The user could not be deleted.");
		}
		userDao.deleteById(id);
	}
	public UserInfo insertUser(UserInfo user) {
		User entity = User.builder()
				.id(UUID.randomUUID().toString())
				.username(user.getUsername())
				.password(user.getPassword())
				.email(user.getEmail())
				.build();

		userDao.insert(entity.getId(), entity.getUsername(), entity.getPassword(), entity.getEmail());
		return dtoFactory.toInfo(entity);
	}
	private final Pattern VALID_EMAIL_ADDRESS_REGEX =
			Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

	private boolean validateEmail(String emailStr) {
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
		return matcher.matches();
	}
}
