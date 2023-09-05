import axios from 'axios';

export const GIT_HUB_REPO = 'https://api.github.com/repos/AppFlowy-IO/AppFlowy';

export const GET_CONTRIBUTORS = '/contributors';

export const api = axios.create({
  baseURL: GIT_HUB_REPO,
  headers: {
    'Content-Type': 'application/json',
  },
});
