namespace TrainTicketProjectwithCore.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        IGenericRepository<T> GetRepository<T>() where T : class, new();
        Task CompleteAsync();
        void Dispose();
    }
}
