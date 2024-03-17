import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Link = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdDate: Date;
  isActive: boolean;
};

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "originalUrl",
    header: "Original Link",
  },
  {
    accessorKey: "shortUrl",
    header: "Short Link",
  },
  { accessorKey: "createdDate", header: "Created On" },
  {
    accessorKey: "isActive",
    header: () => "Active",
  },
];
