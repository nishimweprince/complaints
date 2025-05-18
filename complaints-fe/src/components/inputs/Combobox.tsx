import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { forwardRef, useState } from "react";
import { SkeletonLoader } from "./Loader";
import CustomTooltip from "../custom/CustomTooltip";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface ComboboxProps {
  options?: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  className?: string;
  inputClassName?: string;
  optionsClassName?: string;
  selectedValueClassName?: string;
  value?: string;
  defaultValue?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options = [],
      placeholder,
      onChange,
      label,
      required,
      labelClassName,
      className,
      inputClassName,
      optionsClassName,
      selectedValueClassName,
      value,
      defaultValue,
      isLoading,
      readOnly,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    return (
      <label className={`flex flex-col gap-1 w-full ${labelClassName}`}>
        <p
          className={
            label ? "flex items-center gap-1 text-[14px] px-1" : "hidden"
          }
        >
          {label}{" "}
          {required && (
            <CustomTooltip
              label={required ? `${label} is required` : ""}
              labelClassName="text-[12px] bg-red-600"
            >
              <span className="text-red-600 cursor-pointer">*</span>
            </CustomTooltip>
          )}
        </p>
        <Popover
          open={open}
          onOpenChange={readOnly ? undefined : setOpen}
          modal
        >
          <PopoverTrigger asChild className={`w-full ${className}`}>
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full flex items-center justify-between h-10 font-normal ${
                  inputClassName || "text-[13px]"
                }`}
              >
                <span
                  className={`flex-1 block w-full text-left truncate max-w-[calc(100%-24px)] ${
                    value
                      ? selectedValueClassName ||
                        inputClassName ||
                        "text-[12px] sm:text-[13px] md:text-[13px]"
                      : `text-gray-500 ${
                          inputClassName ||
                          "text-[12px] sm:text-[13px] md:text-[13px]"
                        }`
                  }`}
                >
                  {value
                    ? options.find((option) => option.value === value)?.label
                    : placeholder || "Select option..."}
                </span>
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 text-[12px] sm:text-[13px] md:text-[13px] flex-none" />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command ref={ref} className="w-full">
              <CommandInput
                placeholder="Search option..."
                className={`h-9 w-full ${inputClassName || "text-[13px]"}`}
              />
              <CommandList ref={ref} className="w-full">
                <CommandEmpty
                  className={`w-full text-center text-primary ${
                    optionsClassName || "text-[13px] py-2"
                  }`}
                >
                  No option found.
                </CommandEmpty>
                <CommandGroup className="w-full">
                  {(options ?? [])?.map((option) => (
                    <CommandItem
                      key={option.label}
                      defaultValue={defaultValue}
                      disabled={option?.disabled}
                      className="flex items-center gap-2 w-full cursor-pointer overflow-hidden"
                      value={option.label}
                      onSelect={(currentValue) => {
                        const selectedOption = options.find(
                          (option) => option.label === currentValue
                        );
                        onChange?.(selectedOption?.value || "");
                        setOpen(false);
                      }}
                    >
                      <p
                        className={`${
                          option?.disabled && `text-gray-400 cursor-not-allowed`
                        } truncate max-w-[calc(100%-24px)] ${
                          optionsClassName || "text-[13px]"
                        }`}
                      >
                        {option.label}
                      </p>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 flex-none",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </label>
    );
  }
);

Combobox.displayName = "Combobox";

export default Combobox;
