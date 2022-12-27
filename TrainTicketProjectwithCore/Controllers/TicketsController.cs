using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrainTicketProjectwithCore.Models;
using TrainTicketProjectwithCore.Repositories.Interfaces;
using TrainTicketProjectwithCore.ViewModels;

namespace TrainTicketProjectwithCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Ticket> repository;
        private readonly IGenericRepository<TicketItem> itemRepository;

        public TicketsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = this.unitOfWork.GetRepository<Ticket>();
            this.itemRepository = this.unitOfWork.GetRepository<TicketItem>();
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            var data = await this.repository.GetAllAsync();
            return data.ToList();
        }

        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<TicketViewModel>>> GetTicketVMs()
        {

            var data = await this.repository.GetAllAsync(x => x.Include(o => o.TicketItems).ThenInclude(oi => oi.Train)
                                                        .Include(o => o.Passenger));
            return data.Select(o => new TicketViewModel
            {
                TicketId = o.TicketId,
                PassengerId = o.PassengerId,
                JourneyDate = o.JourneyDate,
                Category = o.Category,
                Price = o.Price,                
                PassengerName = o.Passenger.PassengerName,
                TicketValue = o.TicketItems.Sum(oi => oi.Quantity * oi.Ticket.Price)
            })
            .ToList();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await this.repository.GetAsync(o => o.TicketId == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        [HttpGet("{id}/OI")]
        public async Task<ActionResult<Ticket>> GetTicketWithTicketItems(int id)
        {
            var ticket = await this.repository.GetAsync(o => o.TicketId == id, x => x.Include(o => o.TicketItems).ThenInclude(oi => oi.Train)
                                                                            .Include(o => o.Passenger));

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }

            await this.repository.UpdateAsync(ticket);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                
                    throw;
            }

            return NoContent();
        }

        [HttpPut("VM/{id}")]
        public async Task<IActionResult> PutTicketWithTicketItem(int id, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }
            await this.repository.UpdateAsync(ticket);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

            }

            return NoContent();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            await this.repository.AddAsync(ticket);
            await this.unitOfWork.CompleteAsync();
            return ticket;
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await this.repository.GetAsync(o => o.TicketId == id);
            if (ticket == null)
            {
                return NotFound();
            }

            await this.repository.DeleteAsync(ticket);
            await this.unitOfWork.CompleteAsync();
            return NoContent();
        }

    }
}
