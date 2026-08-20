//INHERITANCE

using System;
class Employee
{
    public string Name { get; set; }
    public decimal BaseSalary { get; set; }

    public void Work()
    {
        Console.WriteLine($"{Name} is working.");
    }
}
class Manager : Employee
{
    public void Manage()
    {
        Console.WriteLine($"{Name} is managing the team.");
    }
}
class Program
{
    static void Main()
    {
        Manager m = new Manager();
        m.Name = "Ravi";
        m.BaseSalary = 60000;
        m.Work();
        m.Manage();
    }
}

//DISCOUNT COUPON

//using System;

//class Coupon
//{
//    public virtual decimal ApplyDiscount(decimal total)
//    {
//        return total;
//    }
//}

//class FlatOffCoupon : Coupon
//{
//    private decimal offAmount;

//    public FlatOffCoupon(decimal off)
//    {
//        offAmount = off;
//    }

//    public override decimal ApplyDiscount(decimal total)
//    {
//        return total - offAmount;
//    }
//}

//class PercentOffCoupon : Coupon
//{
//    private int percent;

//    public PercentOffCoupon(int p)
//    {
//        percent = p;
//    }

//    public override decimal ApplyDiscount(decimal total)
//    {
//        return total - (total * percent / 100);
//    }
//}

//class Program
//{
//    public static void Main()
//    {
//        Coupon c1 = new FlatOffCoupon(50);
//        Coupon c2 = new PercentOffCoupon(20);
//        Console.WriteLine("Created object c1 for FlatOffCoupon ");
//        Console.WriteLine($"Flat off: {c1.ApplyDiscount(500)}");
//        Console.WriteLine("Created object c2 for PercentOffCoupon ");
//        Console.WriteLine($"Percent off: {c2.ApplyDiscount(500)}");
//    }
//}

//Abstract class

//using System;

//abstract class Employee
//{
//    public string Name { get; set; }

//    public abstract decimal CalculatePay();

//    public void DisplayInfo()
//    {
//        Console.WriteLine($"Employee: {Name}, Pay: {CalculatePay()}");
//    }
//}

//class SalariedEmployee : Employee
//{
//    public decimal MonthlySalary { get; set; }

//    public override decimal CalculatePay()
//    {
//        return MonthlySalary;
//    }
//}

//class HourlyEmployee : Employee
//{
//    public decimal HourlyRate { get; set; }
//    public int HoursWorked { get; set; }

//    public override decimal CalculatePay()
//    {
//        return HourlyRate * HoursWorked;
//    }
//}

//class Program
//{
//    static void Main()
//    {
//        Employee e1 = new SalariedEmployee { Name = "Anita", MonthlySalary = 50000 };
//        Employee e2 = new HourlyEmployee { Name = "Raj", HourlyRate = 500, HoursWorked = 40 };

//        Console.WriteLine("employee 1 with monthly salary");
//        e1.DisplayInfo();
//        Console.WriteLine("employee 1 with hourly salary");
//        e2.DisplayInfo();
//    }
//}

//Try/Catch

//using System;

//class Program
//{
//    static void Main()
//    {
//        Console.Write("Enter a number: ");
//        string input = Console.ReadLine();

//        try
//        {
//            int number = int.Parse(input);
//            Console.WriteLine($"You entered: {number}");
//        }
//        catch (FormatException)
//        {
//            Console.WriteLine("That's not a valid number.");
//        }
//    }
//}

//CUSTOM EXCEPTION

//using System;

//class InsufficientBalanceException : Exception
//{
//    public InsufficientBalanceException(string message) : base(message)
//    {
//    }
//}

//class BankAccount
//{
//    public decimal Balance { get; private set; }

//    public BankAccount(decimal initial)
//    {
//        Balance = initial;
//    }

//    public void Withdraw(decimal amount)
//    {
//        if (amount > Balance)
//        {
//            throw new InsufficientBalanceException(
//            $"Cannot withdraw {amount}. Balance is only {Balance}.");
//        }
//        Balance -= amount;
//        Console.WriteLine($"Withdrew {amount}. New balance: {Balance}");
//    }
//}

//class Program
//{
//    static void Main()
//    {
//        BankAccount account = new BankAccount(1000);

//        try
//        {
//            account.Withdraw(1500);
//        }
//        catch (InsufficientBalanceException ex)
//        {
//            Console.WriteLine($"Transaction failed: {ex.Message}");
//        }
//    }
//}