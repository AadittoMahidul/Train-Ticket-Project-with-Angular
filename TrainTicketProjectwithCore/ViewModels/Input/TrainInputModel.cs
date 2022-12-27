using System.ComponentModel.DataAnnotations;
using TrainTicketProjectwithCore.Models;

namespace TrainTicketProjectwithCore.ViewModels.Input
{
    public class TrainInputModel
    {
        public int TrainId { get; set; }
        [Required, StringLength(40), Display(Name = "Train Name")]
        public string TrainName { get; set; } = default!;
        [Required, StringLength(40), Display(Name = "Starting Journey")]
        public string StartingPoint { get; set; } = default!;
        [Required, StringLength(40)]
        public string Destination { get; set; } = default!;
        public bool IsAvailable { get; set; }        
        public virtual ICollection<TicketItem> TicketItems { get; set; } = new List<TicketItem>();
    }
}
