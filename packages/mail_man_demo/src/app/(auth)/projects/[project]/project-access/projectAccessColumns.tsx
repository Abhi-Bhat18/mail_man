import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type ProjectAccess = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  img_url: string;
  granted_by: string;
};

export const projectAccessColumn: ColumnDef<ProjectAccess>[] = [
  {
    header: "Name",
    accessorKey: "first_name",
    cell: ({ row }) => {
      const { first_name, last_name, img_url, id } = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={img_url} />
            <AvatarFallback>
              {`${first_name[0]}${last_name[0]}`}{" "}
            </AvatarFallback>
          </Avatar>
          <Link className="cursor-pointer" href={`/profile/${id}`}>
            {first_name + " " + last_name}
          </Link>
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Granted By",
    accessorKey: "granted_by",
  },
];

export const projectAccessData = [
  {
    id: "a6a00701-ef72-4fd9-ad00-7c5f5db96c19",
    first_name: "Tiffany",
    last_name: "Jackson",
    role: "Solicitor",
    email: "kennedygloria@petersen.com",
    img_url: "https://dummyimage.com/660x115",
    granted_by: "Aaron Carpenter",
  },
  {
    id: "47da13ad-5793-47ed-adc7-05a922b09cc2",
    first_name: "Misty",
    last_name: "Stafford",
    role: "Chief Marketing Officer",
    email: "michael67@hurley-smith.com",
    img_url: "https://placekitten.com/165/607",
    granted_by: "James Wong",
  },
  {
    id: "f0ead805-f30b-41e7-817e-002fbaabaaff",
    first_name: "Brent",
    last_name: "Hooper",
    role: "Electronics engineer",
    email: "robinsonriley@gutierrez.info",
    img_url: "https://placekitten.com/763/308",
    granted_by: "Neil Brown",
  },
  {
    id: "24941b0e-2990-4b8b-a715-b0d13401bdd3",
    first_name: "Brian",
    last_name: "Clark",
    role: "Statistician",
    email: "jorge68@cruz-wilson.com",
    img_url: "https://dummyimage.com/666x911",
    granted_by: "David Wilson",
  },
  {
    id: "43a4fa9d-1e91-4458-be39-16f9e69ffbad",
    first_name: "Carol",
    last_name: "Crawford",
    role: "Financial controller",
    email: "raybrenda@guerrero-gomez.com",
    img_url: "https://www.lorempixel.com/479/464",
    granted_by: "Gregory Foster",
  },
  {
    id: "c7e827bb-39f7-4874-9eee-4273b10f5710",
    first_name: "Jennifer",
    last_name: "Ramos",
    role: "Editorial assistant",
    email: "andersonchristina@yahoo.com",
    img_url: "https://www.lorempixel.com/382/825",
    granted_by: "Robert Holden",
  },
  {
    id: "02c48c78-0c48-44ef-9598-9af3eeecd07f",
    first_name: "Robert",
    last_name: "Frey",
    role: "Chief Operating Officer",
    email: "ymartinez@yahoo.com",
    img_url: "https://dummyimage.com/672x735",
    granted_by: "Stephen Silva",
  },
  {
    id: "6bf26a21-afd9-4ae8-b94c-3b96cbb56854",
    first_name: "Kelly",
    last_name: "Hall",
    role: "Scientist, physiological",
    email: "wrightlatoya@nguyen.net",
    img_url: "https://www.lorempixel.com/684/532",
    granted_by: "Kenneth Robinson",
  },
  {
    id: "0eeecff3-1e76-4a48-8815-42d54d0009f2",
    first_name: "Kathy",
    last_name: "Roberts",
    role: "Teacher, English as a foreign language",
    email: "harrispaul@hotmail.com",
    img_url: "https://placekitten.com/530/866",
    granted_by: "Steven Martinez",
  },
  {
    id: "7dd44d66-5027-4eb2-a5a5-daf55d154bc7",
    first_name: "Elizabeth",
    last_name: "Wallace",
    role: "Publishing rights manager",
    email: "robertorose@gmail.com",
    img_url: "https://dummyimage.com/948x758",
    granted_by: "Jay Garcia",
  },
];
