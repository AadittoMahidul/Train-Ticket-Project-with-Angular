using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class PassengersController : ControllerBase
    {
        IUnitOfWork unitOfWork;
        IGenericRepository<Passenger> repository;

        public PassengersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = this.unitOfWork.GetRepository<Passenger>();
        }

        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengers()
        {
            var data = await this.repository.GetAllAsync();
            return data.ToList();
        }

        // GET: api/Passengers/5
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<PassengerViewModel>>> GetPassengerViewModels()
        {
            var data = await this.repository.GetAllAsync(x => x.Include(c => c.Tickets));
            return data.Select(c => new PassengerViewModel
            {
                PassengerId = c.PassengerId,
                PassengerName = c.PassengerName,
                Phone = c.Phone,
                Email = c.Email,
                CanDelete = c.Tickets.Count == 0
            }).ToList();
        }
        /// <summary>
        /// to get all passengers with ticket entries
        /////////////////////////////////////////////
        [HttpGet("WithTickets")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengerWithTickets()
        {
            var data = await this.repository.GetAllAsync(x => x.Include(c => c.Tickets));
            return data.ToList();
        }
        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
            var passenger = await this.repository.GetAsync(c => c.PassengerId == id);

            if (passenger == null)
            {
                return NotFound();
            }
            return passenger;
        }
        /// <summary>
        /// to get single passenger with tickets entries
        /////////////////////////////////////////////
        [HttpGet("{id}/WithTickets")]
        public async Task<ActionResult<Passenger>> GetPassengerWithTickets(int id)
        {
            var passenger = await this.repository.GetAsync(c => c.PassengerId == id, x => x.Include(c => c.Tickets));

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }
        // PUT: api/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassenger(int id, Passenger passenger)
        {
            if (id != passenger.PassengerId)
            {
                return BadRequest();
            }

            await this.repository.UpdateAsync(passenger);

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

        // POST: api/Passengers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostCustomer(Passenger passenger)
        {
            await this.repository.AddAsync(passenger);
            await unitOfWork.CompleteAsync();

            return passenger;
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            var passenger = await repository.GetAsync(c => c.PassengerId == id);
            if (passenger == null)
            {
                return NotFound();
            }

            await this.repository.DeleteAsync(passenger);
            await unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
