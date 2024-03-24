import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

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
    cell: ({ row }) => {
      const value = row.getValue("originalUrl") as string;
      return <h2 className="font-medium max-w-48 truncate hover:">{value}</h2>;
    },
  },
  {
    accessorKey: "shortUrl",
    header: "Short Link",
    cell: ({ row }) => {
      const base_url = import.meta.env.VITE_FRONT_BASE_URL;
      const shortUrl = `${base_url}/${row.getValue("shortUrl")}`;

      return (
        <a
          target="_blank"
          href={`http://${shortUrl}`}
          className="underline font-medium"
        >
          {shortUrl}
        </a>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created On",
    cell: (row) => {
      const createdDate = new Date(row.getValue() as string);

      return createdDate.toDateString();
    },
  },
  {
    accessorKey: "visits",
    header: "Visitors",
  },
  // {
  //   accessorKey: "isActive",
  //   header: () => "Active",
  //   cell: ({ row }) => {
  //     const value: boolean = row.getValue("isActive");
  //     return value ? (
  //       <Activity className="text-green-700" />
  //     ) : (
  //       <Radiation className="text-red-700" />
  //     );
  //     // <Switch
  //     // disabled
  //     //   defaultChecked={value}
  //     //   onCheckedChange={(e) => {
  //     //     let link:Link = row.original;
  //     //     link.isActive = e;
  //     //     useLinkStore.getState().updateLink(link)

  //     //   }}
  //     // />
  //   },
  // },
  {
    accessorKey: "isActives",
    header: () => "Status",
    
  },
];
