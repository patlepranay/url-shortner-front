import { create } from "zustand";

type Link = {
  longUrl: string;
  shortUrl: string;
  createdAt: Date;
  isActive: boolean;
};

export interface LinkStore {
  links: Link[];
  fetchLink: (email: string, token: string) => Promise<void>; // Make fetchLink async and return a promise
  addLink: (link: Link) => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  fetchLink: async (email, token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getLinksCreatedByUser/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedLinks = await response.json();
      console.log(fetchedLinks)
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
}));