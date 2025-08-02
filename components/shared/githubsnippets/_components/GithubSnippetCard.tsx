// "use client";

// import { useDashboardMutation } from "@/hooks/useDashboardMutation";
// import { CardTypeDashboard } from "@/types";
// import React, { useState } from "react";
// import { GithubSnippet } from "@prisma/client";
// import { confirmAction } from "@/utils/dashboardHelpers";
// import { Button } from "@/components/ui/button";
// import RenderIf from "@/utils/RenderIf";

// type Props = {
//   item: GithubSnippet & { isNew?: boolean };
//   type: CardTypeDashboard;
//   setNewItem?: (item: GithubSnippet | null) => void;
// };

// export const GithubSnippetCard = ({ item, type, setNewItem }: Props) => {
//   const isNew = item?.["isNew"] === true;
//   const [isEditing, setIsEditing] = useState(isNew);
//   const [isDeleting, setIsDeleting] = useState(false);

//   console.log("GithubSnippetCard item", item);
//   const [formState, setFormState] = useState({
//     repo: item.repo,
//     filePath: item.filePath,
//     branch: item.branch || "main",
//   });

//   const handleChange = (field: keyof typeof formState, value: string) => {
//     setFormState((prev) => ({ ...prev, [field]: value }));
//   };

//   const { updateMutation, deleteMutation, createMutation } =
//     useDashboardMutation(type, item.id);

//   const onEdit = () => {
//     setFormState({
//       repo: item.repo,
//       filePath: item.filePath,
//       branch: item.branch || "main",
//     });
//     setIsEditing(true);
//   };

//   const onCancel = () => {
//     if (!confirmAction("Are you sure you want to cancel the changes?")) return;
//     if (setNewItem) {
//       setNewItem(null);
//     }
//     setIsEditing(false);
//   };

//   const onDelete = () => {
//     if (!confirmAction("Are you sure you want to delete this item?")) return;
//     setIsDeleting(true);
//     deleteMutation.mutate(undefined, {
//       onSettled: () => setIsDeleting(false),
//     });
//   };

//   const onSubmitEdit = () => {
//     if (!confirmAction("Do you want to save the changes?")) return;

//     const data = {
//       repo: formState.repo.trim(),
//       filePath: formState.filePath.trim(),
//       branch: formState.branch.trim(),
//     };

//     if (isNew) {
//       createMutation.mutate(data, {
//         onSuccess: () => {
//           setIsEditing(false);
//         },
//       });
//       if (setNewItem) {
//         setNewItem(null);
//       }
//     } else {
//       updateMutation.mutate(data, {
//         onSuccess: () => {
//           setIsEditing(false);
//         },
//       });
//     }
//   };

//   const isPending =
//     updateMutation.isPending ||
//     deleteMutation.isPending ||
//     createMutation.isPending;

//   return (
//     <div className="flex flex-col md:flex-row gap-4 relative rounded-2xl hover:shadow-inner transition-shadow duration-200 custom-button !items-start p-4">
//       <div className="md:w-1/2 flex flex-col md:flex-row w-full gap-4 ">
//         <div className="w-full text-[14px] md:text-[16px]">
//           <RenderIf condition={isEditing}>
//             <input
//               type="text"
//               value={formState.repo}
//               placeholder="Enter repository name"
//               onChange={(e) => handleChange("repo", e.target.value)}
//               className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
//             />
//           </RenderIf>
//           <RenderIf condition={!isEditing}>
//             <p className="text-[16px] md:text-[20px] font-medium">
//               {item.repo}
//             </p>
//           </RenderIf>
//         </div>

//         <div className="w-full">
//           <RenderIf condition={isEditing}>
//             <input
//               type="text"
//               value={formState.filePath}
//               onChange={(e) => handleChange("filePath", e.target.value)}
//               className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
//               placeholder="Enter file path"
//             />
//           </RenderIf>
//           <RenderIf condition={!isEditing}>
//             <p className="text-[16px] md:text-[20px] font-medium">
//               {item.filePath}
//             </p>
//           </RenderIf>
//         </div>
//       </div>

//       <div className="md:w-1/2 w-full flex justify-between gap-4 items-center">
//         <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
//           <RenderIf condition={isEditing}>
//             <input
//               type="text"
//               value={formState.branch}
//               onChange={(e) => handleChange("branch", e.target.value)}
//               className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
//               placeholder="Enter branch name"
//             />
//           </RenderIf>
//           <RenderIf condition={!isEditing}>
//             <p className="text-[16px] md:text-[20px] font-medium">
//               {item.branch}
//             </p>
//           </RenderIf>
//         </div>
//         <div className="flex gap-4">
//           <RenderIf condition={isEditing}>
//             <>
//               <RenderIf condition={!!onCancel}>
//                 <Button
//                   onClick={onCancel}
//                   variant="custom"
//                   className="text-yellow-600 hover:underline text-sm"
//                 >
//                   Cancel
//                 </Button>
//               </RenderIf>
//               <Button
//                 onClick={onSubmitEdit}
//                 disabled={isPending}
//                 variant="custom"
//                 className="text-green-600 hover:underline text-sm"
//               >
//                 {isPending ? "Saving..." : "Done"}
//               </Button>
//             </>
//           </RenderIf>
//           <RenderIf condition={!isEditing}>
//             <>
//               <Button
//                 onClick={onEdit}
//                 variant="custom"
//                 className="text-yellow-600 !leading-0  hover:underline text-sm"
//               >
//                 Edit
//               </Button>
//               <Button
//                 onClick={onDelete}
//                 disabled={isDeleting}
//                 variant="custom"
//                 className="text-red-600 hover:underline text-sm"
//               >
//                 {isDeleting ? "Deleting..." : "Delete"}
//               </Button>
//             </>
//           </RenderIf>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GithubSnippetCard;
