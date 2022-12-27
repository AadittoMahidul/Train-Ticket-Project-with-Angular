using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TrainTicketProjectwithCore.Models;

namespace TrainTicketProjectwithCore.ViewModels.Input
{
    public class TicketInputModel
    {
        [Required]
        public int TicketId { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime JourneyDate { get; set; } = default!;
        [Required, EnumDataType(typeof(Category))]
        public Category Category { get; set; }
        [Required, Column(TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}")]
        public decimal Price { get; set; } = default!;
        [Required]
        public int PassengerId { get; set; }
        public List<TicketItem> TicketItems { get; } = default!;
    }
}
