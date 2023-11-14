import { ChangeEvent } from "react";

export interface SearchBoxPropsType {
    handleInputChange(e: ChangeEvent<HTMLInputElement>): void
}