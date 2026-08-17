//DICTIONARY

Dictionary<string, int> myDict = new Dictionary<string, int>();
myDict.Add("Steve", 1);
myDict.Add("Ananya", 2);
myDict.Add("Krishav", 3);
myDict.Add("Freddy", 4);
myDict.Add("Dhari", 5);

foreach (var item in myDict)
{
   Console.WriteLine($"{item.Key}: {item.Value}");
}


if (myDict.TryGetValue("Dhari", out int value))
{
   Console.WriteLine($"\nFound: {value}");
}
else
{
   Console.WriteLine("Key not found");
}

//LIST

//List<string> myList = new List<string>();
//myList.Add("Apple");
//myList.Add("Banana");
//myList.Add("Cherry");

//foreach (string item in myList)
//{
//    Console.WriteLine(item);
//}

//HASHSET

//HashSet<int> myHashSet = new HashSet<int>();
//myHashSet.Add(10);
//myHashSet.Add(25);
//myHashSet.Add(42);
//myHashSet.Add(6);
//myHashSet.Add(7);
//myHashSet.Add(42);
//myHashSet.Add(10);

//foreach (int item in myHashSet)
//{
//    Console.WriteLine(item);
//}

//LINQ operators

//List<int> numbers = new List<int> { 5, 12, 3, 8, 15, 7 };

//Console.Write("Original List: ");
//foreach (int n in numbers)
//    Console.Write(n + " ");

//Console.Write("\nList using where n>5 : ");
//var result1 = numbers.Where(n => n > 5);
//foreach (int n in result1)
//    Console.Write(n + " ");

//Console.Write("\nList using select n*10 : ");
//var result2 = numbers.Select(n => n * 10);
//foreach (int n in result2)
//    Console.Write(n + " ");

//Console.Write("\nList using OrderBy (n=>n) : ");
//var result3 = numbers.OrderBy(n => n);
//foreach (int n in result1)
//    Console.Write(n + " ");

//METHOD PARAMETERS

//int a = 10;
//int b = 20;
//int c;

//InParameter(a);
//Console.WriteLine($"a = {a} - in (read only) so value doesn't become 99");
//Console.WriteLine($"After InParameter: a = {a}");

//Console.WriteLine($"\nb = {b} - ref (can access and modify) so value becomes 99");
//RefParameter(ref b);
//Console.WriteLine($"After RefParameter: b = {b}");

//Console.WriteLine($"\nc is undefined - out (can initialize) so value becomes 99");
//OutParameter(out c);
//Console.WriteLine($"After OutParameter: c = {c}");

//void InParameter(int x)
//{
//    x = 99;
//}

//void RefParameter(ref int x)
//{
//    x = 99;
//}

//void OutParameter(out int x)
//{
//    x = 99;
//}


// RECURSION

// Countdown(5);

// void Countdown(int n)
// {
//     if (n < 0)
//         return;
//     Console.WriteLine(n);
//     Countdown(n - 1);
// }









