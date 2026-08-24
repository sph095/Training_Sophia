////C# and Sql connection

using Microsoft.Data.SqlClient;
using System.Data;

string connectionString = "Server=DESKTOP-J8Q6TIV;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True;";

using SqlConnection connection = new SqlConnection(connectionString);
connection.Open();

string query = "SELECT * FROM Employees";
using SqlCommand command = new SqlCommand(query, connection);

using SqlDataReader reader = command.ExecuteReader();


while (reader.Read())
{
    Console.WriteLine($"Employee ID: {reader["empId"]}");
    Console.WriteLine($"Name: {reader["name"]}");
    Console.WriteLine($"Department: {reader["dept"]}");
    Console.WriteLine();
}

////runtime parameters

//using Microsoft.Data.SqlClient;
//using System.Data;
//using System;

//string connectionString = "Server=DESKTOP-J8Q6TIV;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True;";

//using SqlConnection connection = new SqlConnection(connectionString);
//connection.Open();
//Console.Write("Enter the id:  ");
//int id = Convert.ToInt32(Console.ReadLine());
//Console.WriteLine();

//string query = "SELECT * FROM Employees WHERE empId = @EmployeeId";

//using SqlCommand command = new SqlCommand(query, connection);
//command.Parameters.Add("@EmployeeId", SqlDbType.Int).Value = id;

//using SqlDataReader reader = command.ExecuteReader();

//while (reader.Read())
//{
//    Console.WriteLine($"Employee ID: {reader["empId"]}");
//    Console.WriteLine($"Name: {reader["name"]}");
//    Console.WriteLine($"Department: {reader["dept"]}");
//    Console.WriteLine();
//}

//////executing stored parameters

//using Microsoft.Data.SqlClient;
//using System.Data;
//using System;

//string connectionString = "Server=DESKTOP-J8Q6TIV;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True;";

//using SqlConnection connection = new SqlConnection(connectionString);
//connection.Open();
//Console.Write("Enter the id:  ");
//int id = Convert.ToInt32(Console.ReadLine());
//Console.WriteLine();

//SqlCommand command =
//    new SqlCommand("GetEmployeeDetails", connection);
//command.CommandType = CommandType.StoredProcedure;

//command.Parameters.Add("@EmpId", SqlDbType.Int).Value = id;

//using SqlDataReader reader = command.ExecuteReader();

//while (reader.Read())
//{
//    Console.WriteLine($"Employee ID: {reader["empId"]}");
//    Console.WriteLine($"Name: {reader["name"]}");
//    Console.WriteLine($"Department: {reader["dept"]}");
//    Console.WriteLine();
//}

