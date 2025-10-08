import { useMutation } from "@tanstack/react-query";
import { Signup as SignupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: SignupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
    },
  });

  return { signup, isLoading };
};
