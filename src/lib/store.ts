import { create } from "zustand";
import { changeLinkStatusAPI, getLinksCreatedByUserAPI } from "./api";
import { toast } from "@/components/ui/use-toast";

export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdDate: Date;
  isActive: boolean;
};

export interface LinkStore {
  links: Link[];
  fetchLink: (email: string, token: string) => Promise<void>; // Make fetchLink async and return a promise
  addLink: (link: Link) => void;
  changeLinkStatus: (link: Link, token: string) => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  fetchLink: async (email, token) => {
    try {
      const response = await getLinksCreatedByUserAPI(email, token);

      if (!response?.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedLinks = await response.json();
      set({ links: fetchedLinks.links });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addLink: (link: Link) => {
    try {
      set((state) => ({ links: [...state.links, link] }));
    } catch (error) {
      console.error("Error adding Link");
    }
  },
  changeLinkStatus: async (link: Link, token: string) => {
    try {
      const response = await changeLinkStatusAPI(link, token);
      if (response?.status == 201) {
        const link = response.data.updatedLink;
        set((state) => {
          const index = state.links.findIndex((el) => el.id === link.id);
          state.links[index].isActive = link.isActive;
          
          return {links:[...state.links]}  
        });
      }
    } catch (err) {
      toast({
        title: "Failed to update status",
      });
      console.log(err);
    }
  },
}));

// const unsubscribe = useLinkStore.subscribe(
//   (currentState) => console.log('State changed:', currentState)
// );