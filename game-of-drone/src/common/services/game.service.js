import { Component } from 'react';
import * as axios from "axios";
import { baseApi } from '../../constants/app.constants';

export class GameService extends Component {

  getUsers() {
    return axios.get(`${baseApi.url}/users`).then(res => {
      return res.data;
    });
  }
    
  getUser(userName) {
    return axios.get(`${baseApi.url}/user?name=${userName}`).then(res => {
      return res.data;
    });
  }

  createUsers(users) {
    return axios.post(`${baseApi.url}/users`, users);
  }

  updateUser(user) {
    return axios.put(`${baseApi.url}/users`, user);
  }
}
