using TrainTicketProjectwithCore.Models;
using TrainTicketProjectwithCore.Repositories.Interfaces;

namespace TrainTicketProjectwithCore.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        TrainDbContext db;
        public UnitOfWork(TrainDbContext db)
        {
            this.db = db;
        }
        public async Task CompleteAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.db.Dispose();
        }

        public IGenericRepository<T> GetRepository<T>() where T : class, new()
        {
            return new GenericRepository<T>(this.db);
        }       
    }
}
