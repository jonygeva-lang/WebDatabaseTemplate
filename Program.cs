using System;
using System.ComponentModel.Design;
using System.Data.Common;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);
    var database = new Database();

    Console.WriteLine("The server is running");
    Console.WriteLine($"Local:   http://localhost:{port}/website/pages/signUp.html");
    Console.WriteLine($"Network: http://{Network.GetLocalNetworkIPAddress()}:{port}/website/pages/signUp.html");

    while (true)
    {
      var request = server.WaitForRequest();

      Console.WriteLine($"Recieved a request: {request.Name}");

      try
      {
        {
          if (request.Name == "GetUser")
          {
          var token = request.GetParams<string>();
          var user = database.Users.FirstOrDefault(u => u.Token == token);
          request.Respond(user);
          }
        }
        if (request.Name == "SignUpSend")
        {
          var (username, password) = request.GetParams<(string, string)>();

          if (database.Users.Any(u => u.Username == username))
          {
            request.Respond<string?>(null);
            continue;
          }

          var token = Guid.NewGuid().ToString();
          var user = new User(token, username, password);
          database.Users.Add(user);
          database.SaveChanges();

          request.Respond(token);
        }
        {
          if(request.Name == "SignIn")
          {
          var (username, password) = request.GetParams<(string, string)>();
          var user = database.Users.FirstOrDefault(u =>u.Username == username && u.Password == password);
          request.Respond(user?.Token);
          }
        }
      }
      catch (Exception exception)
      {
        request.SetStatusCode(500);
        Log.WriteException(exception);
      }
    }
  }
}


class Database() : DatabaseCore("database")
{
  public DbSet<User> Users { get; set; } = default!;
  // public DbSet<WinGame> WinGames { get; set; } = default!;

}

class User(string token, string username, string password)
{
  public int Id { get; set; } = default!;
  [JsonIgnore] public string Token { get; set; } = token;
  public string Username { get; set; } = username;
  [JsonIgnore] public string Password { get; set; } = password;
}


class Card(string imageUrl)
{
  public int Id { get; set; } = default!;

  public string ImageUrl { get; set; } = imageUrl;
}

// class WinGame(string token, User user, int time, int moves)
// {
//   public int Id { get; set; } = default!;
//   [JsonIgnore] public string Token { get; set; } = token;

//   public User User { get; set; } = user;

//   public int Time { get; set; } = time;
//   public int Moves { get; set; } = moves;
// }