using System;
using System.Text;

////ARRAY 1D CREATE
int[] arr = { 1, 2, 3, 4, 5 };

for (int i = 0; i < arr.Length; i++)
{
   Console.Write(arr[i] + " ");
}
Console.WriteLine("\n");
string[] names;
names = new string[] { "Madhav", "Soosie", "Sahil", "Shiva" };
foreach (string name in names)
{
   Console.WriteLine(name);
}
Console.WriteLine("\n");

int[] roll_no = new int[4];
roll_no = new int[] { 1, 2, 3, 4 };
for (int i = 0; i < roll_no.Length; i++)
{
   Console.WriteLine($"{roll_no[i]:D3}");
}


//ARRAY 2D CREATE

//Console.WriteLine("Creating 2D array");
//Console.Write("Enter the number of rows:  ");
//int rows = Convert.ToInt32(Console.ReadLine());
//Console.Write("Enter the number of columns: ");
//int columns = Convert.ToInt32(Console.ReadLine());
//Console.WriteLine();
//int[,] arr2 = new int[rows, columns];
//for (int i = 0; i < rows; i++)
//{
//    for (int j = 0; j < columns; j++)
//    {
//        Console.Write($"Enter the value for [{i}][{j}]:  ");
//        arr2[i, j] = Convert.ToInt32(Console.ReadLine());
//    }
//}

//Console.WriteLine("Printing the array");
//for (int i = 0; i < rows; i++)
//{
//    for (int j = 0; j < columns; j++)
//    {
//        Console.Write(arr2[i, j] + " ");
//    }
//    Console.WriteLine();
//}

//ARRAY 3D CREATE

//int[,,] arr3 = new int[2, 2, 2];
//arr3 = new int[,,] { { { 1, 2 }, { 3, 4 } }, { { 5, 6 }, { 7, 8 } } };
//Console.WriteLine("Printing 3D array");
//for (int i = 0; i < arr3.GetLength(0); i++)
//{
//    for (int j = 0; j < arr3.GetLength(1); j++)
//    {
//        for (int k = 0; k < arr3.GetLength(2); k++)
//        {
//            Console.Write(arr3[i, j, k] + " ");
//        }
//        Console.WriteLine();
//    }
//}

//ARRAY METHODS

//int[] roll_no = new int[4];
//roll_no = new int[] { 11, 2, 13, 4 };
//Array.Sort(roll_no);
//Console.WriteLine("Printing the array");
//for (int i = 0; i < roll_no.Length; i++)
//{
//    Console.WriteLine($"{roll_no[i]:D3}");
//}
//int key = 13;
//int index = Array.IndexOf(roll_no, key);
//Console.WriteLine($"{key} is found in index {index}, or position {index + 1}");
//Array.Reverse(roll_no);
//Console.WriteLine("Printing the array after reversing");
//for (int i = 0; i < roll_no.Length; i++)
//{
//    Console.WriteLine($"{roll_no[i]:D3}");
//}

//JAGGED ARRAY

//int[][] jagged = new int[][]
//{
// new int[] { 1, 2, 3 },
// new int[] { 4, 5 },
// new int[] { 6, 7, 8, 9 }
//};
//Console.WriteLine("Printing the jagged array");
//for (int i = 0; i < jagged.Length; i++)
//{
//    for (int j = 0; j < jagged[i].Length; j++)
//    {
//        Console.Write(jagged[i][j] + " ");
//    }
//    Console.WriteLine();
//}

//STRING METHODS

//string s1 = "hello";
//int index = -1;
//Console.WriteLine("Finding the index of 'l' in the string 'hello'");
//while ((index = s1.IndexOf('l', index + 1)) != -1)
//{
//    Console.WriteLine(index);
//}

//string s2 = " hello, world, hi";
//Console.WriteLine("Splitting the string ' hello, world, hi' by ','");
//string[] words = s2.Split(',');
//foreach (string word in words)
//{
//    Console.WriteLine(word);
//}


//StringBuilder Methods

// StringBuilder sb = new StringBuilder();
// sb.Append("Hello");
// Console.WriteLine(sb);
// Console.WriteLine("\nAppending 'Hello' to the StringBuilder");
// sb.Append(" World!");
// Console.WriteLine(sb);

// Console.WriteLine("\nInserting ' How are you?' at the end ");
// sb.Insert(sb.Length, " How are you?");
// Console.WriteLine(sb);

// Console.WriteLine("\nReplacing 'World' with 'C#'");
// sb.Replace("World", "C#");
// Console.WriteLine(sb);

// Console.WriteLine("\nAppend format with name");
// string name = "Cindy";
// sb.AppendFormat(" {0}", name);
// Console.WriteLine(sb);
// sb.AppendLine();
// Console.WriteLine("\nAppending join");
// sb.AppendJoin(", ", "apple", "banana", "cherry");
// Console.WriteLine(sb);
// Console.WriteLine(sb[sb.Length + 1]);










