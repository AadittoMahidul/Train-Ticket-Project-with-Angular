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
using TrainTicketProjectwithCore.ViewModels.Input;

namespace TrainTicketProjectwithCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainsController : ControllerBase
    {
        private IWebHostEnvironment env;
        IUnitOfWork unitOfWork;
        IGenericRepository<Train> repository;

        public TrainsController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            this.unitOfWork = unitOfWork;
            this.repository = this.unitOfWork.GetRepository<Train>();
            this.env = env;
        }

        // GET: api/Trains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Train>>> GetTrains()
        {
            var data = await this.repository.GetAllAsync();
            return data.ToList();
        }
        //
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<TrainViewModel>>> GetTrainViewModels()
        {
            var data = await this.repository.GetAllAsync(p => p.Include(x => x.TicketItems));
            return data.ToList().Select(p => new TrainViewModel
            {
                TrainId = p.TrainId,

                TrainName = p.TrainName,
                StartingPoint = p.StartingPoint,
                Destination = p.Destination,
                IsAvailable = p.IsAvailable,
                CanDelete = !p.TicketItems.Any(),
                Picture = p.Picture

            }).ToList();
        }

        // GET: api/Trains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetTrain(int id)
        {
            var train = await this.repository.GetAsync(x => x.TrainId == id);

            if (train == null)
            {
                return NotFound();
            }

            return train;
        }

        // PUT: api/Trains/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrain(int id, Train train)
        {
            if (id != train.TrainId)
            {
                return BadRequest();
            }

            await this.repository.UpdateAsync(train);

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
        [HttpPut("{id}/VM")]
        public async Task<IActionResult> PutTrainViewModel(int id, TrainInputModel train)
        {
            if (id != train.TrainId)
            {
                return BadRequest();
            }

            var existing = await this.repository.GetAsync(p => p.TrainId == id);
            if (existing != null)
            {
                existing.TrainName = train.TrainName;
                existing.StartingPoint = train.StartingPoint;
                existing.Destination = train.Destination;
                existing.IsAvailable = train.IsAvailable;
                await this.repository.UpdateAsync(existing);
            }

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

        // POST: api/Trains
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Train>> PostTrain(Train train)
        {
            await this.repository.AddAsync(train);
            await this.unitOfWork.CompleteAsync();

            return train;
        }
        //
        [HttpPost("VM")]
        public async Task<ActionResult<Train>> PostTrainInput(TrainInputModel train)
        {
            var newTrain = new Train
            {
                TrainName = train.TrainName,
                StartingPoint = train.StartingPoint,
                Destination= train.Destination,
                IsAvailable = train.IsAvailable,
                Picture = "no-product-image-400x400.png"
            };
            await this.repository.AddAsync(newTrain);
            await this.unitOfWork.CompleteAsync();

            return newTrain;
        }
        [HttpPost("Upload/{id}")]
        public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
        {
            var train = await this.repository.GetAsync(p => p.TrainId == id);
            var ext = Path.GetExtension(picture.FileName);
            string fileName = Guid.NewGuid() + ext;
            string savePath = Path.Combine(this.env.WebRootPath, "Pictures", fileName);
            FileStream fs = new FileStream(savePath, FileMode.Create);
            picture.CopyTo(fs);
            fs.Close();
            train.Picture = fileName;
            await this.repository.UpdateAsync(train);
            await this.unitOfWork.CompleteAsync();
            return new ImagePathResponse { PictureName = fileName };
        }

        // DELETE: api/Trains/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrain(int id)
        {
            var train = await this.repository.GetAsync(p => p.TrainId == id);
            if (train == null)
            {
                return NotFound();
            }

            await this.repository.DeleteAsync(train);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }
       
    }
}
