import { useMutation, useQuery } from "@tanstack/react-query";
import type { LegalMatterType, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
      matterType: LegalMatterType;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.message,
        data.matterType,
      );
    },
  });
}
