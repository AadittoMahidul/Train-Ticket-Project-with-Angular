import { Train } from "./train";

export interface TicketItem {
    ticketId?:number;
    trainId?:number;
    quantity?:number;
    train?:Train;
}
