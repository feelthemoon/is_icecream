import { Ref, ref } from "vue";

import { defineStore } from "pinia";

import { createGetAllStallsRequest } from "@/api";
import { Stall } from "@/config/app/types";

export const useStallsStore = defineStore("stalls", () => {
  const stalls: Ref<Stall[] | null> = ref(null);
  const totalStalls: Ref<number | null> = ref(null);

  const getAllStalls = async (page = 1) => {
    const response = await createGetAllStallsRequest(page);
    if (response?.data) {
      stalls.value = response.data.data;
      totalStalls.value = response.data.total;
    }
  };

  return {
    stalls,
    totalStalls,
    getAllStalls,
  };
});
