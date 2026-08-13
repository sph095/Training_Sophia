//IF ELSE

Console.WriteLine("Example for if else, checking balance sufficient?\n");
Console.Write("Enter your balance amount: ");
int balance = int.Parse(Console.ReadLine());
if (balance < 500)
{
    Console.WriteLine("\nInsufficient balance");
}
else
{
    Console.WriteLine($"Balance is sufficient, Balance = {balance}");
}

//SWITCH CASE

//Console.WriteLine("Switch case, display which plan did the user choose\n");
//int plan = 0;
//Console.WriteLine("Available plans are:");
//Console.WriteLine("1. Student Pack");
//Console.WriteLine("2. Premium Pack");
//Console.WriteLine("3. Platinum Pack");
//Console.WriteLine("4. Family pack");
//Console.Write("Enter your plan number: ");
//plan = int.Parse(Console.ReadLine());
//Console.WriteLine("\n\n");

//switch (plan)
//{
//    case 1:
//        Console.WriteLine("You have chosen Student Pack");
//        break;
//    case 2:
//        Console.WriteLine("You have chosen Premium Pack");
//        break;
//    case 3:
//        Console.WriteLine("You have chosen Platinum Pack");
//        break;
//    case 4:
//        Console.WriteLine("You have chosen Family Pack");
//        break;
//    default:
//        Console.WriteLine("Invalid plan number");
//        break;
//}
//Console.WriteLine("\n\n");  

//FOR LOOP

//Console.WriteLine("This program will diplay a user input as many times as the user wants\n\n");
//Console.Write("Enter a message to display: ");
//string message = Console.ReadLine();
//Console.Write("How many times do you want to display the message?");
//int times = int.Parse(Console.ReadLine());
//Console.WriteLine("\n");
//for (int i=1; i <= times; i++)
//{
//    Console.WriteLine($"{i}. {message}");
//}

// WHILE LOOP

//Console.WriteLine("This program says Hi till the user replies hi\n\n");
//string output = "Hi";
//string userInput = "";

//while(!string.Equals(userInput, output , StringComparison.OrdinalIgnoreCase)) {
//    Console.WriteLine($"Program:    {output}");
//    Console.Write($"User:   ");
//    userInput = Console.ReadLine();
//}
//Console.WriteLine("\n\n Exiting the program, user said hi");

//DO WHILE LOOP

//Console.WriteLine("This program shows the menu again");
//char userIn = ' ';
//do
//{
//    Console.WriteLine("\nMenu:");
//    Console.WriteLine("1. Option 1");
//    Console.WriteLine("2. Option 2");
//    Console.WriteLine("3. Exit");
//    Console.Write("Want to see menu again? (y/n):  ");
//    userIn = Console.ReadKey().KeyChar;
//}while(userIn == 'y' || userIn == 'Y');

//FOREACH LOOP

//Console.WriteLine("This program displays the names of students\n\n");
//string[] students = { "Aarav", "Krishav","Afza", "Ram Madhav", "Sabari"};
//foreach(string student in students){
//    Console.WriteLine(student);
//}

//BREAK CONTINUE

//int i = 1;
//while (i < 8)
//{
//    if (i == 3)
//    {
//        i++;  
//        continue;
//    }
//    if (i == 7)
//    {
//        break;
//    }
//    Console.WriteLine(i);
//    i++;
//}

