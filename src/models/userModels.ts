import {Plan} from "./generatorModels.ts";

export interface Profile {
    username: string;
    plans: Plan[];
}