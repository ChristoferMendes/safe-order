import { AxiosError } from 'axios';
import { useState } from 'react';
import { api } from '../../services/api';
import { IUseAxios } from './IUseAxios';

export function useAxios<TPayload, TRes>({ endpoint, method }: IUseAxios) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [data, setData] = useState<TRes>();

  const executeAxios = async ({ payload }: { payload: TPayload }) => {
    setLoading(true);
    try {
      const res = await api<TRes>({
        method,
        url: endpoint,
        data: payload,
      });

      setData(res.data);
      return res;
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    executeAxios, data, error, loading,
  };
}
