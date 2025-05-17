import { FC } from "react";
import ReactDOM from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  mainClassName?: string;
  heading?: string;
  headingClassName?: string;
  description?: string;
}

const JSX_MODAL: FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  heading = null,
  headingClassName = null,
  className = null,
  description = null,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`z-1000 min-w-[45vw] ${className} max-h-[85vh] overflow-y-auto bg-white`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-lg font-semibold text-primary uppercase mt-[-10px] ${headingClassName}`}
          >
            {heading}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <section className="h-fit overflow-y-auto py-2 px-[2px]">
          {children}
        </section>
      </DialogContent>
    </Dialog>
  );
};

const Modal: FC<ModalProps> = (props) => {
  const modalContainer = document.querySelector("#modal");
  if (!modalContainer) {
    throw new Error("Modal container not found");
  }

  return ReactDOM.createPortal(<JSX_MODAL {...props} />, modalContainer);
};

export default Modal;
