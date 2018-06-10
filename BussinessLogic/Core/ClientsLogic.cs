using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repositories;
using DataMapping.Entities;
using BussinessLogic.Helpers;

namespace BussinessLogic.Core
{
    public class ClientsLogic
    {
        public static List<Client> GetClientsList(int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return ClientRepositories.GetClientsList(skipCount, takeCount);
        }

        public static Client GetClientById(int id)
        {
            return ClientRepositories.GetClientById(id);
        }

        public static void InsertNewClient(Client client)
        {
            ClientRepositories.InsertNewClient(client);
        }

        public static void UpdateClient(Client client)
        {
            ClientRepositories.UpdateClient(client);
        }

        public static void DeleteClient(int id)
        {
            ClientRepositories.DeleteClient(id);
        }
    }
}
