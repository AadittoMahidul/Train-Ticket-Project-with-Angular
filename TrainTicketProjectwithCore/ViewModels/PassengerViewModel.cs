using System.ComponentModel.DataAnnotations;

namespace TrainTicketProjectwithCore.ViewModels
{
    public class PassengerViewModel
    {
        public int PassengerId { get; set; }
        [Required, StringLength(40), Display(Name = "Passenger Name")]
        public string PassengerName { get; set; } = default!;
        [Required, StringLength(40)]
        public string Phone { get; set; } = default!;
        [Required, StringLength(50)]
        public string Email { get; set; } = default!;
        public bool CanDelete { get; set; }
    }
}
