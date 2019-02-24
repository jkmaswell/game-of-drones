import React from 'react';
import { GameService } from './game.service';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import * as axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { baseApi } from '../../constants/app.constants';

describe('GameService', () => {

  axios.prototype = {
    get: jest.fn(() => Promise.resolve({ data: {} }))
  };

  beforeEach(() => {
    
  });

  it('should call createUsers()', () => {
    GameService.prototype.createUsers();
    setTimeout(() => {
      expect(GameService.prototype.createUsers).toHaveBeenCalled();
    },200);
  });

  it('should call updateUser()', () => {
    GameService.prototype.updateUser();
    setTimeout(() => {
      expect(GameService.prototype.updateUser).toHaveBeenCalled();
    },200);
  });

  it('should call getUsers()', () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    mock.onGet(`${baseApi.url}/users`).reply(200, data);
    GameService.prototype.getUsers().then(res => {
      expect(res).toEqual(data);
    })
  });

  it('should call getUser(user)', () => {
    const user = 'user 1';
    const mock = new MockAdapter(axios);
    const data = { response: true };
    mock.onGet(`${baseApi.url}/user?name=${user}`).reply(200, data);
    GameService.prototype.getUser(user).then(res => {
      expect(res).toEqual(data);
    })
  });
});
