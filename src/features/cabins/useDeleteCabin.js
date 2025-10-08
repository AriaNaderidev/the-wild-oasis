import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabins } = useMutation({
    mutationFn: (id) => deleteCabinsApi(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabins };
};

export default useDeleteCabin;
