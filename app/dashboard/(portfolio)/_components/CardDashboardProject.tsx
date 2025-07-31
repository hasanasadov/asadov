// import { useDashboardMutation } from "@/hooks/useDashboardMutation";
// import { CardTypeDashboard } from "@/types";
// import { trimFormData } from "@/utils/dashboardHelpers";
// import { Project } from "@prisma/client";
// import { useState } from "react";

// type Props = {
//   item: Project & { isNew?: boolean };
//   type: CardTypeDashboard;
//   setNewItem?: (item: Project | null) => void;
// };

// export const CardDashboardProject = ({ item, type, setNewItem }: Props) => {
//   const isNew = item?.["isNew"];
//   const [isEditing, setIsEditing] = useState(isNew);
//   const [formState, setFormState] = useState({
//     title: item.title,
//     description: item.description,
//     image: item.image,
//     category: item.category,
//     liveUrl: item.liveUrl,
//     repoUrl: item.repoUrl,
//   });

//   // const { updateMutation, deleteMutation, createMutation } =
//   //   useDashboardMutation(type, item.id);

//   // const handleChange = (field: keyof typeof formState, value: string) => {
//   //   setFormState((prev) => ({ ...prev, [field]: value }));
//   // };

//   // const onSubmitEdit = () => {
//   //   const data = trimFormData({
//   //     ...formState,
//   //   });

//   //   if (isNew) {
//   //     createMutation.mutate(data, {
//   //       onSuccess: () => {
//   //         setIsEditing(false);
//   //         setNewItem?.(null);
//   //       },
//   //     });
//   //   } else {
//   //     updateMutation.mutate(data, {
//   //       onSuccess: () => setIsEditing(false),
//   //     });
//   //   }
//   // };

//   return (
//     <div className="rounded-xl border p-4 bg-white dark:bg-gray-800 shadow-md">
//       {isEditing ? (
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={formState.title}
//             onChange={(e) => handleChange("title", e.target.value)}
//             className="input"
//             placeholder="Project Title"
//           />
//           <textarea
//             value={formState.description}
//             onChange={(e) => handleChange("description", e.target.value)}
//             className="textarea"
//             placeholder="Description"
//           />
//           <input
//             type="text"
//             value={formState.image}
//             onChange={(e) => handleChange("image", e.target.value)}
//             className="input"
//             placeholder="Image URL"
//           />
//           <input
//             type="text"
//             value={formState.category}
//             onChange={(e) => handleChange("category", e.target.value)}
//             className="input"
//             placeholder="Category"
//           />
//           <input
//             type="text"
//             value={formState.liveUrl}
//             onChange={(e) => handleChange("liveUrl", e.target.value)}
//             className="input"
//             placeholder="Live URL"
//           />
//           <input
//             type="text"
//             value={formState.repoUrl}
//             onChange={(e) => handleChange("repoUrl", e.target.value)}
//             className="input"
//             placeholder="Repo URL"
//           />
//           <div className="flex gap-2">
//             <button onClick={onSubmitEdit} className="btn-primary">
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="btn-secondary"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-xl font-bold">{item.title}</h2>
//           <p>{item.description}</p>
//           <p className="text-sm text-gray-500">{item.category}</p>
//           <div className="flex gap-2 mt-2">
//             <a href={item.liveUrl} className="text-blue-500 underline">
//               Live
//             </a>
//             <a href={item.repoUrl} className="text-blue-500 underline">
//               Code
//             </a>
//           </div>
//           <button
//             onClick={() => setIsEditing(true)}
//             className="btn-primary mt-2"
//           >
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
