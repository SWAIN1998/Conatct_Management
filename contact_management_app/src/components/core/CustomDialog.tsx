import { Dialog } from "@mui/material";

type Props = {
  open?: boolean;
  onClose?: (event: Event) => void;
  children?: any;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
  className?: string;
};

const CustomDialog = ({
  open = false,
  className,
  onClose,
  children,
  maxWidth,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      keepMounted={false}
      scroll={"body"}
    >
      <div className={className}>{children}</div>
    </Dialog>
  );
};

export default CustomDialog;
