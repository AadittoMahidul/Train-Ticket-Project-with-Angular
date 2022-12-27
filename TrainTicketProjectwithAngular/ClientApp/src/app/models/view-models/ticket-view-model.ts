import { Category } from "../shared/app-constants";

export interface TicketViewModel {
    ticketId?:number;
    journeyDate?:Date;
    category?:Category;
    price?:number
    passengerId?:number;
    passengerName?:string;
    ticketValue?:number;
}
