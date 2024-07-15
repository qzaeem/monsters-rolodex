import { ChangeEventHandler } from "react";
import "./search-box.styles.css";

type SearchBoxProps = {
  className: string;
  placeHolder?: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = ({ onChangeHandler, placeHolder, className }: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeHolder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
