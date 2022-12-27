import { Passenger } from "../data/passenger";
import { TicketItem } from "../data/ticket-item";
import { Category } from "../shared/app-constants";

export interface TicketAndTicketItemViewModel {
    ticketId?:number;
    journeyDate?:Date;
    category?:Category;
    price?:number
    passengerId?:number;
    ticketItems?:TicketItem[];
    passenger?:Passenger;
}
