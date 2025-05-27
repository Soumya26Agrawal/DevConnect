// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// function CardPost({ title, description, createdAt }) {
//   const readableDate = new Date(createdAt).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p>{description}</p>
//       </CardContent>
//       <CardFooter>
//         <p>{readableDate}</p>
//       </CardFooter>
//     </Card>
//   );
// }

// export default CardPost;
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CardPost({ title, description, createdAt }) {
  const readableDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="bg-[#3A1E6E] border border-purple-700 rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between min-h-[180px]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-purple-200 truncate">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-purple-300 line-clamp-4">{description}</p>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-purple-400">{readableDate}</p>
      </CardFooter>
    </Card>
  );
}

export default CardPost;
