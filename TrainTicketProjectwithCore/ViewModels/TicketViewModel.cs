
using TrainTicketProjectwithCore.Models;

namespace TrainTicketProjectwithCore.ViewModels
{
    public class TicketViewModel
    {
        public int TicketId { get; set; }
        
        public DateTime JourneyDate { get; set; } = default!;
        
        public Category Category { get; set; }
      
        public decimal Price { get; set; } = default!;

        public int PassengerId { get; set; }
        public string PassengerName { get; set; } = default!;
        public decimal TicketValue { get; set; }
    }
}
