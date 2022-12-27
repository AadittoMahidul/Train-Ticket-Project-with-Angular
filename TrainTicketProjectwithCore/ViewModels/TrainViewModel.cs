using System.ComponentModel.DataAnnotations;

namespace TrainTicketProjectwithCore.ViewModels
{
    public class TrainViewModel
    {
        public int TrainId { get; set; }
        [Required, StringLength(40), Display(Name = "Train Name")]
        public string TrainName { get; set; } = default!;
        [Required, StringLength(40), Display(Name = "Starting Journey")]
        public string StartingPoint { get; set; } = default!;
        [Required, StringLength(40)]
        public string Destination { get; set; } = default!;
        public bool IsAvailable { get; set; }
        [Required, StringLength(150)]
        public string Picture { get; set; } = default!;
        public bool CanDelete { get; set; }
    }
}
