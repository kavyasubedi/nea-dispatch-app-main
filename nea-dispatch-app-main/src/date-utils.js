import dayjs from 'dayjs';

import {APP_LOCAL_DATE_FORMAT, APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_INPUT_DATE_FORMAT} from './constants';

export const convertDateTimeFromServer = date => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);
export const convertDateFromServer = date => (date ? dayjs(date).format(APP_LOCAL_INPUT_DATE_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? dayjs(date) : null);

export const displayDefaultDateTime = () => dayjs().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);
