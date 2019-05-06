const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const conf = require('../../config/config');

exports.User = (sequelize, type) => {
	const User = sequelize.define('user', {
		id : {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		login: type.STRING,
		password: type.STRING,
		name: type.STRING
	});

	User.register = function(login, password, confirmPassword) {
		return new Promise(async function (resolve, reject) {
			try {
				const user = await User.findOne({where: {login}});
				if (user) {
					return reject(new UserExistError("user with this login is exist"));
				} else {
					if (password !== confirmPassword) {
						throw new ConfirmPasswordError("password and confirm password are not equal");
					}

					const hashedPassword = bcrypt.hashSync(password, 8);

					User.create({login, password: hashedPassword})
						.then(user => resolve())
						.catch(() => {
							throw new InteractionDBError("There was a problem registering the user")
						});
				}
			} catch(err) {
				return reject(err)
			}
		});
	};

	User.login = function(login, password) {
		return new Promise(async (resolve, reject) => {
			try{
				const user = await User.findOne({where: {login}});
				if (!user) return reject(new UserNotExistError("user is not exist"));

				const passwordIsValid = bcrypt.compareSync(password, user.password);

				if (!passwordIsValid) return reject(new ConfirmPasswordError("password is wrong"));

				const token = jwt.sign({id: user.id}, conf.token.secret, {expiresIn: conf.token.tokenLife});
				const refreshToken = jwt.sign({id: user.id}, conf.token.refreshSecret, {expiresIn: conf.token.refreshTokenLife});

				return resolve({auth: true, token: token, refreshToken: refreshToken});
			}
			catch(err) {}
		});
	};

	return User;
};

function UserExistError(message) {
	Error.call(this, arguments);
	Error.captureStackTrace(this);
	this.name = "UserExistError";
	this.message = message;
}

function UserNotExistError(message) {
	Error.call(this, arguments);
	Error.captureStackTrace(this);
	this.name = "UserNotExistError";
	this.message = message;
}

function ConfirmPasswordError(message) {
	Error.call(this, arguments);
	Error.captureStackTrace(this);
	this.name = "ConfirmPasswordError";
	this.message = message;
}

function InteractionDBError(message) {
	Error.call(this, arguments);
	Error.captureStackTrace(this);
	this.name = "InteractionDBError";
	this.message = message;
}

exports.UserExistError  = UserExistError;
exports.ConfirmPasswordError  = ConfirmPasswordError;
exports.InteractionDBError  = InteractionDBError;
exports.UserNotExistError  = UserNotExistError;