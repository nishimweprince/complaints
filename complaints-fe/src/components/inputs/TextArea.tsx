import { FC, ChangeEvent, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface TextAreaProps {
  cols?: number;
  rows?: number;
  className?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  resize?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string | undefined;
  required?: boolean;
  readonly?: boolean;
  onBlur?: () => void | undefined;
  label?: string | React.ReactNode;
  value?: string | number | readonly string[] | undefined;
  height?: string;
}

const TextArea: FC<TextAreaProps> = ({
  cols = 50,
  rows = 5,
  height = "100px",
  className = "",
  defaultValue = undefined,
  resize = false,
  onChange,
  placeholder = undefined,
  required = false,
  readonly = false,
  onBlur,
  label = null,
  value,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!defaultValue && !value && ref?.current) {
      ref.current.value = "";
    }
  }, [defaultValue, value]);

  return (
    <label className="grid w-full gap-1.5">
      {label && (
        <header className="flex items-center gap-1">
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </span>
          {required && <span className="text-destructive">*</span>}
        </header>
      )}
      <Textarea
        cols={cols}
        rows={rows}
        ref={ref}
        value={value}
        readOnly={readonly}
        placeholder={placeholder}
        className={cn(
          `w-full h-[${height}]`,
          !resize && "resize-none",
          className
        )}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default TextArea;
