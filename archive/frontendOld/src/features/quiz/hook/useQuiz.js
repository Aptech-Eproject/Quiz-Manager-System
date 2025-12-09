import { useQuery, useMutation } from '@tanstack/react-query';
import { quizAPI } from '../services/api';

export const useQuiz = () => {
  const quizzesQuery = useQuery({
    queryKey: ['quizzes'],
    queryFn: quizAPI.getAll,
  });

  const createQuizMutation = useMutation({
    mutationFn: quizAPI.create,
  });

  return { quizzesQuery, createQuizMutation };
};
