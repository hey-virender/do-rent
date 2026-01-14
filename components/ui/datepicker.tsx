"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function DatePicker({
  date,
  setDate,
  className,
  calendarClassName,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  calendarClassName?: string;
}) {
  const [inputValue, setInputValue] = React.useState(
    date ? format(date, "yyyy-MM-dd") : ""
  );

  // Sync calendar → input
  React.useEffect(() => {
    setInputValue(date ? format(date, "yyyy-MM-dd") : "");
  }, [date]);

  // Handle typed input
  const handleInputChange = (value: string) => {
    setInputValue(value);
    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      setDate(parsed);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("w-auto p-3 bg-white space-y-2", calendarClassName)}
      >
        {/* Text input (YYYY-MM-DD) */}
        <Input
          value={inputValue}
          placeholder="YYYY-MM-DD"
          onChange={(e) => handleInputChange(e.target.value)}
        />

        {/* Calendar with month + year dropdowns */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={1950}
          toYear={new Date().getFullYear() + 20}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
