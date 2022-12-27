using TrainTicketProjectwithCore.Models;

namespace TrainTicketProjectwithCore.HostedService
{
    public class DbSeederHostedService : IHostedService
    {
        IServiceProvider serviceProvider;
        public DbSeederHostedService(
            IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (IServiceScope scope = serviceProvider.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TrainDbContext>();
                await SeedDbAsync(db);
            }
        }
        public async Task SeedDbAsync(TrainDbContext db)
        {
            await db.Database.EnsureCreatedAsync();
            if (!db.Passengers.Any())
            {
                var p1 = new Passenger { PassengerName = "Passenger 1", Phone = "01620151533", Email = "passenger1@gmail.com" };
                await db.Passengers.AddAsync(p1);
                var p2 = new Passenger { PassengerName = "Passenger 2", Phone = "01620151537", Email = "passenger2@yahoo.com"};
                await db.Passengers.AddAsync(p2);
                var tr1 = new Train { TrainName = "Train 1", StartingPoint="Kamlapur", Destination="Sylhet",  IsAvailable = true, Picture = "1.jpg" };
                await db.Trains.AddAsync(tr1);
                var tr2 = new Train { TrainName = "Train 2", StartingPoint = "Airport", Destination = "Rangpur", IsAvailable = true, Picture = "2.jpg" };
                await db.Trains.AddAsync(tr2);               
                var t1 = new Ticket { JourneyDate = DateTime.Today.AddDays(-8), Category = Category.Shovon, Price=540.00M, Passenger=p1 };
                t1.TicketItems.Add(new TicketItem { Ticket = t1, Train = tr1, Quantity = 2 });
                var t2 = new Ticket { JourneyDate = DateTime.Today.AddDays(-4), Category = Category.Snigdha, Price = 920.00M, Passenger = p2 };
                t2.TicketItems.Add(new TicketItem { Ticket = t2, Train = tr1, Quantity = 1 });
                t2.TicketItems.Add(new TicketItem { Ticket = t2, Train = tr2, Quantity = 1 });
                await db.Tickets.AddAsync(t1);
                await db.Tickets.AddAsync(t2);
                await db.SaveChangesAsync();
            }

        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

    }
}
