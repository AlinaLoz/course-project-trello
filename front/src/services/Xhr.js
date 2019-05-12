const URL = 'http://localhost:8000/api/v1.0';

class Xhr {
	defaultData = {
		optionsGet  : {
			mode   : 'cors',
			method : 'get',
			credentials: "include",
			headers: {
				"Content-Type" : "application/json; charset=UTF-8",
			}
		},
		optionsPost : {
			mode     : 'cors',
			method   : 'post',
			credentials: "include",
			headers  : {
				"Content-Type" : "application/json; charset=UTF-8",
			},
		},
		optionsDelete  : {
			mode   : 'cors',
			method : 'delete',
			credentials: "include",
			headers  : {
				"Content-Type" : "application/json; charset=UTF-8",
			},
		},
		optionsPut  : {
			mode   : 'cors',
			method : 'put',
			credentials: "include",
			headers  : {
				"Content-Type" : "application/json; charset=UTF-8",
			},
		}
	};

	get(url, params) {
		const sendData = Object.keys(params).map(key => `${key}=${params[key]}`);

		return fetch(`${url}?${sendData.join('&')}`, this.defaultData.optionsGet)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				return response.json().then(err => {throw err;});
			});
	}

	post(url, body) {
		return fetch(url, {...this.defaultData.optionsPost, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}

				return response.json().then(err => {throw err;});
			});
	}

	delete(url, body) {
		return fetch(url, {...this.defaultData.optionsDelete, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	put(url, body) {
		return fetch(url, {...this.defaultData.optionsPut, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	static login(login, password) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/login`, {login, password});
	}

    static auth() {
        const xhr = new Xhr();
        return xhr.get(`${URL}/auth`, {});
    }

	static register(login, password, confirmPassword) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/register`, {login, password, confirmPassword});
	}

	static getTasks(idList) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/tasks`, {idList});
	}

	static removeTask(userId, taskId) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/task-remove`, {userId, taskId});
	}

	static addTask(userId, theme, text) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/task-add`, {userId, theme, text});
	}

	static changeTask(taskId, value) {
		const xhr = new Xhr();
		return xhr.put(`${URL}/task-change`, {taskId, value});
	}

	static getTeams(numberPage) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/teams/${numberPage}`, {});
	}

	static checkExistUser(login) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/user/check`, {login});
	}

	static createTeam(name, users) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/team/add`, {name, users});
	}

	static dropTeam(numberPage, id) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/team/drop`, {numberPage, id});
	}

	static logout() {
		const xhr = new Xhr();
		return xhr.get(`${URL}/logout`, {});
	}

	static getOneTeam(id) {
			const xhr = new Xhr();
			return xhr.get(`${URL}/team/${id}`, {id});
	}

	static updateNameTeam(id, name) {
			const xhr = new Xhr();
			return xhr.put(`${URL}/team/update`, {id, name});
	}

	static getBoards(numberPage) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/boards/${numberPage}`, {});
	}

	static getBoardById(id) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/board/${id}`, {});
	}

	static createBoard(name, isTeamBoard, team) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/board/add`, {name, isTeamBoard, team});
	}

	static dropBoard(id) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/board/drop`, {id});
	}

	static createList(idBoard, nameList) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/list/add`, {idBoard, nameList});
	}

	static deleteList(id) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/list/delete`, {id});
	}

	static createTask(theme, text, idList) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/task/add`, {theme, text, idList});
	}

	static updateTask(theme, text, id) {
		const xhr = new Xhr();
		return xhr.put(`${URL}/task-change/${id}`, {theme, text});
	}

	static deleteTask(id) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/task-delete/${id}`, {});
	}

	static getUsers(pageNumber) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/get-all-users/${pageNumber}`, {});
	}

	static deleteUser(id, pageNumber) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/delete-user`, {id, pageNumber});
	}
}

export {Xhr};