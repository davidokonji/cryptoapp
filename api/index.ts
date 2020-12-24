import axios, { AxiosPromise } from 'axios';

const baseURL: string = 'https://api.coinlore.net/api';

const instance = axios.create({
  baseURL
});

const handleApi = async (promise: AxiosPromise) => {
  try {
    const result = await promise;
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
}

export const getAllCurrency = async (start: number = 1, end: number = 100) => {
  return await handleApi(
    instance.get(`/tickers/?start=${start}&limit=${end}`)
  );
}