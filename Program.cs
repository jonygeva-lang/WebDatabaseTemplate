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
    Console.WriteLine($"Local:   http://localhost:{port}/website/pages/leardboard.html");
    Console.WriteLine($"Network: http://{Network.GetLocalNetworkIPAddress()}:{port}/website/pages/leardboard.html");

    while (true)
    {
      var request = server.WaitForRequest();

      Console.WriteLine($"Recieved a request: {request.Name}");

      try
      {
        if (request.Name == "GetLeaderboard")
        {
          var token = request.GetParams<string>();
          var leaderboard = database.WinGames
            .Include(w => w.User)
            .OrderByDescending(w =>
                100000.0 / (w.Time + w.Moves * 5))
            .Take(10)
              .ToList();
            request.Respond(leaderboard);
        }
          if (request.Name == "GetLeardboardOwn")
        {
          
        }
          if (request.Name == "Win")
          {
            var (userId, time, moves) = request.GetParams<(int, int, int)>();
            WinGame win = new ( userId, time, moves);
            database.WinGames.Add(win);
            database.SaveChanges();
            request.Respond(true);
          }
          if (request.Name == "GetUser")
          {
          var token = request.GetParams<string>();
          var user = database.Users.FirstOrDefault(u => u.Token == token);
          request.Respond(user);
          }
        if (request.Name == "SignUp")
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
  public DbSet<WinGame> WinGames { get; set; } = default!;

}

class User(string token, string username, string password)
{
  public int Id { get; set; } = default!;
  [JsonIgnore] public string Token { get; set; } = token;
  public string Username { get; set; } = username;
  [JsonIgnore] public string Password { get; set; } = password;
}

class WinGame(int userId, int time, int moves)
{
  public int Id { get; set; } = default!;
  public int Time { get; set; } = time;
  public int Moves { get; set; } = moves;
  public int UserId {get;set;} = userId;
  
  public User User { get; set; } = default!;
}