import { Ref, ref } from "vue";

import { defineStore } from "pinia";

import { createGetAllStallsRequest, createStallRequest } from "@/api";
import { Stall } from "@/config/app/types";

export const useStallsStore = defineStore("stalls", () => {
  const stalls: Ref<Stall[] | null> = ref(null);
  const totalStalls: Ref<number | null> = ref(null);
  const filters: Ref<{ [key: string]: any } | undefined> = ref();

  const getAllStalls = async (page = 1) => {
    const response = await createGetAllStallsRequest(page, filters.value);
    if (response?.data) {
      stalls.value = response.data.data;
      totalStalls.value = response.data.total;
    }
  };

  const createStall = async (data: any) => {
    await createStallRequest(data);
  };

  return {
    stalls,
    totalStalls,
    filters,
    getAllStalls,
    createStall,
  };
});
