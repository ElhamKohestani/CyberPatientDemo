
import { JsonParsedModel } from "./JsonParsedModel"

export interface JsonLoaderPropsType {
    sendDataToParent(jsonData: JsonParsedModel[]): void
}