import { useI18N } from "@/hooks/i18n";
import { enUS, es, ptBR } from "date-fns/locale";
import { useRouter } from "next/router";
import { FC } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { i18n } from "./i18n";
import { Props } from "./types";

export const DatePicker: FC<Props> = ({ className, ...rest }) => {
  const { locale } = useRouter();
  const texts = useI18N(i18n);

  const getLocale = () => {
    if (locale?.startsWith("en")) return enUS;
    if (locale?.startsWith("es")) return es;
    return ptBR;
  };

  const cursorStyle = rest.disabled ? "cursor-default" : "cursor-pointer";

  return (
    <div className="flex flex-col w-full">
      <label
        className={twMerge(
          "overflow-hidden flex items-center bg-white border border-gray-300 rounded-md text-gray-500 hover:border-blue-300 focus-within:border-blue-800 focus-within:border-2",
          cursorStyle,
          className
        )}
      >
        <ReactDatePicker
          className="py-2 pl-4 w-full cursor-pointer outline-none disabled:cursor-default"
          showTimeSelect
          timeIntervals={30}
          locale={getLocale()}
          monthsShown={1}
          timeCaption={texts.hour}
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText={texts.placeholder}
          shouldCloseOnSelect
          autoComplete="off"
          {...rest}
        />

        <FiCalendar
          className={twMerge("mr-2 text-2xl text-gray-800", cursorStyle)}
        />
      </label>
    </div>
  );
};
