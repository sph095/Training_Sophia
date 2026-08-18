public class Add
{
    public int a, b;
    public void sum()
    {
        Console.WriteLine($"Value of a is {a}");
        Console.WriteLine($"Value of b is {b}");
        Console.WriteLine($"Sum of {a} and {b} is {a + b}");
    }
}
public class Student
{
    public string Name;
    public int Age;
    public string Grade;

    public void details()
    {
        Console.WriteLine($"\nStudent Name: {Name}");
        Console.WriteLine($"Student Age: {Age}");
        Console.WriteLine($"Student Grade: {Grade}");
    }
}
public class Program
{
    static void Main()
    {
        //ADDING TWO NUMBERS USING CLASS AND OBJECTS

        Add add = new Add();
        add.a = 10;
        add.b = 20;
        add.sum();

        //CREATE STUDENT OBJECT

        Student s1 = new Student();
        s1.Name = "Krishav";
        s1.Age = 6;
        s1.Grade = "1";
        s1.details();
    }
}

////example 2 methods

//using System;
//public class Cat
//{
//    public string Name;
//    public string Breed;
//    public string Colour;
//    public void Sound()
//    {
//        Console.WriteLine(Name + " says: Meow!");
//    }
//    public void Climb(string place)
//    {
//        Console.WriteLine(Name + " the " + Colour + " " + Breed + " is climbing the " + place);
//    }
//    public void Eat(string foodType)
//    {
//        Console.WriteLine(Name + " is happily eating " + foodType + ".");
//    }
//}
//public class Program
//{
//    public static void Main()
//    {
//        Cat c1 = new Cat();
//        c1.Name = "Luna";
//        c1.Breed = "Bombay Cat ";
//        c1.Colour = "Black";

//        c1.Sound();
//        c1.Climb("tree");
//        c1.Eat("fish");
//    }
//}

//// example 3 Constructor

//using System.Xml.Linq;

//public class Swing
//{
//    string kid1, kid2;
//    public Swing(string name1, string name2)
//    {
//        kid1 = name1;
//        kid2 = name2;
//        Console.WriteLine($"{kid1} and {kid2} are playing in the swing");
//    }
//    public Swing()
//    {
//        //Console.WriteLine("who are playing in the swing?");
//        //Console.Write("player 1 :  ");
//        //string kid1 = Console.ReadLine();
//        //Console.Write("\nplayer 2 : ");
//        //string kid2 = Console.ReadLine();
//        kid1 = "Dhari";
//        kid2 = " Afza";
//        Console.WriteLine($"{kid1} and {kid2} are playing in the swing");
//    }
//    static void Main()
//    {
//        Console.WriteLine("Default constructors");
//        Swing mySwing = new Swing("Aarav", "Feminto");
//        Console.WriteLine("\n\nParameterized constructors");
//        Swing swing2 = new Swing();

//    }
//}

//CANNOT ACCESS PRIVATE AND PROTECTED

//public class BankAccount
//{
//    public int id = 1;
//    public string name = "Jay";
//    public int Age { get; private set; } = 56;
//    private string password = "ghjklsdfg";
//    protected int pin = 7890;
//}
//public class Program
//{
//    static void Main()
//    {
//        BankAccount user = new BankAccount();
//        Console.WriteLine($"public user id : {user.id}");
//        Console.WriteLine($"public user name : {user.name}");

//        Console.WriteLine(user.Age);
//    }
//}


// ACCESS PRIVATE USING GET SET
//public class EarPhones
//{
//    private int volume = 50;
//    public int Volume
//    {
//        get { return volume; }
//        set
//        {
//            if (value > 70)
//            {
//                Console.WriteLine("Error: Too high, cause damage if listened for too long");
//            }
//            else
//            {
//                volume = value;
//            }
//        }
//    }
//}

//public class Program
//{
//    static void Main()
//    {
//        EarPhones ep = new EarPhones();
//        ep.Volume = 50; 
//        Console.WriteLine(ep.Volume);

//        Console.WriteLine("Trying to change the value to 99");
//        EarPhones eph = new EarPhones();
//        eph.Volume = 99; 
//        Console.Write("the final value is: ");
//        Console.Write(eph.Volume);
//        Console.WriteLine();
//    }
//}


