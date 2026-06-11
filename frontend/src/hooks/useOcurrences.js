import { OcurrenceService } from "@/services/OcurrenceService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
export const useOcurrences = () => {
	const queryClient = useQueryClient(); 

	const {
		data: ocurrences = [],
		isLoading: ocurrenceLoading,
		refetch: refetchOcurrences,
	} = useQuery({
		queryKey: ["ocurrences"],
		queryFn: OcurrenceService.fetchOcurrences,
		staleTime: 5 * 60 * 1000,
	});

	const { mutate: createOcurrence, isSuccess } = useMutation({
		mutationFn: OcurrenceService.createOcurrence,
		onSuccess: () => {
			refetchOcurrences();
		},
	});

	const { mutate: confirmOcurrence, isPending: isConfirming } = useMutation({
		mutationFn: OcurrenceService.confirmOcurrence,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ocurrences"] });
		},
	});

	return {
		ocurrences,
		ocurrenceLoading,
		ocurrenceCreator: {
			createOcurrence,
			isSuccess,
		},
		ocurrenceConfirmer: {
			confirmOcurrence,
			isConfirming,
		},
	};
};
