import { useQuery, useMutation } from '@tanstack/react-query';
import { resultAPI } from '../services/api';

export const useResult = () => {
  const resultsQuery = useQuery({
    queryKey: ['results'],
    queryFn: resultAPI.getAll,
  });

  const submitResultMutation = useMutation({
    mutationFn: resultAPI.submit,
  });

  return { resultsQuery, submitResultMutation };
};
