import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = (
  requestFn: (data: AuthLogin) => Promise<ResponseLogin>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useLogout = (requestFn: () => Promise<never>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestFn,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
