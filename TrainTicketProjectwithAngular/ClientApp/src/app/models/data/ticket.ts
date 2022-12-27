import { Category } from "../shared/app-constants";
import { TicketItem } from "./ticket-item";

export interface Ticket {
    ticketId?:number;
    journeyDate?:Date;
    category?:Category;
    price?:number
    passengerId?:number;
    ticketItems?:TicketItem[];
}
