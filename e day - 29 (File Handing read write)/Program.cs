//STREAM WRITER

using System.IO;
string folder = @"C:\Users\SophiaA\Desktop\training tasks\outputs";
if (Directory.Exists(folder))
{
    string path = Path.Combine(folder, "ToDoList.txt");
    using (var writer = new StreamWriter(path))
    {
        writer.WriteLine("Buy groceries");
        writer.WriteLine("Call the dentist");
        writer.WriteLine("Finish Chores");
    }
    Console.WriteLine($"file created at : " + path);
}

//READ ALL LINES

//string[] lines = File.ReadAllLines("ToDoList.txt");
//foreach (string line in lines)
//{
//    Console.WriteLine(line);
//}

//STREAMREADER
//using System.IO;
//string path = @"C:\Users\SophiaA\Desktop\training tasks\outputs\ToDoList.txt";
//using (StreamReader reader = new StreamReader(path))
//{
//    string line;
//    while ((line = reader.ReadLine()) != null)
//    {
//        Console.WriteLine(line);
//    }
//}

//STREAM WRITER CSV FILE

//using System.IO;
//string folder = @"C:\Users\SophiaA\Desktop\training tasks\outputs";
//if (Directory.Exists(folder))
//{
//    string path = Path.Combine(folder, "temperatures.csv");
//    using var writer = new StreamWriter(path);
//    writer.WriteLine("Date,Temperature");
//    writer.WriteLine("2026-08-25,31.5");
//    writer.WriteLine("2026-08-26,29.8");
//    Console.WriteLine($"file created at : " + path);
//}
