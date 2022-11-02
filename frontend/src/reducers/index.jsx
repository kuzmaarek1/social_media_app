import { combineReducers } from 'redux';

import post from '@/reducers/post';
import auth from '@/reducers/auth';
export const reducers = combineReducers({ auth, post });
