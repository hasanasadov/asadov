import { Button } from "@/components/ui/button";
import RenderIf from "@/utils/RenderIf";

type Props = {
  onEdit: () => void;
  onCancel?: () => void;
  isEditing: boolean;
  isPending: boolean;
  isDeleting: boolean;
  onDelete: () => void | Promise<void>;
  onSubmitEdit: () => void | Promise<void>;
  className?: string;
};

export const Actions = ({
  onEdit,
  onCancel,
  isEditing,
  isPending,
  isDeleting,
  onDelete,
  onSubmitEdit,
  className = "",
}: Props) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <RenderIf condition={isEditing}>
        <>
          <RenderIf condition={!!onCancel}>
            <Button
              onClick={onCancel}
              variant="custom"
              className="text-yellow-600 hover:underline text-sm"
            >
              Cancel
            </Button>
          </RenderIf>
          <Button
            onClick={onSubmitEdit}
            disabled={isPending}
            variant="custom"
            className="text-green-600 hover:underline text-sm"
          >
            {isPending ? "Saving..." : "Done"}
          </Button>
        </>
      </RenderIf>
      <RenderIf condition={!isEditing}>
        <>
          <Button
            onClick={onEdit}
            variant="custom"
            className="text-yellow-600 !leading-0  hover:underline text-sm"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            disabled={isDeleting}
            variant="custom"
            className="text-red-600 hover:underline text-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </>
      </RenderIf>
    </div>
  );
};
