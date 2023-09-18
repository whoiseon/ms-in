import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchChangePassword, fetchSignOut } from '@/lib/api/auth';
import { queryKey } from '@/lib/query/queryKey';
import { ServerMessage } from '@/components/desktop/profile/mePassword/PasswordChangeCard';
import { Dispatch, SetStateAction } from 'react';

export function useChangePassword(
  setMessage: Dispatch<SetStateAction<ServerMessage>>,
) {
  const { mutate, isLoading } = useMutation({
    mutationFn: fetchChangePassword,
    onSuccess: async (data) => {
      if (data.changed) {
        setMessage({
          type: 'success',
          message: '비밀번호가 성공적으로 변경되었습니다.',
        });
      } else {
        if (data.payload?.field === 'currentPassword') {
          setMessage({
            type: 'error',
            message: '현재 비밀번호가 일치하지 않습니다.',
          });
        }
        if (data.payload?.field === 'newPassword') {
          setMessage({
            type: 'error',
            message: '현재와 동일한 비밀번호로 변경할 수 없습니다.',
          });
        }
      }
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  return [mutate, isLoading] as [typeof mutate, typeof isLoading];
}
