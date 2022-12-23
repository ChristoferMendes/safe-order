import { AxiosError } from 'axios';
import { useState } from 'react';
import { api } from '../../services/api';
import { IUseAxios } from './IUseAxios';

export function useAxios<TData>({ endpoint, method }: IUseAxios) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [data, setData] = useState<TData>();

  const executeAxios = async ({ payload }: { payload: TData }) => {
    setLoading(true);
    try {
      const res = await api<TData>({
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
