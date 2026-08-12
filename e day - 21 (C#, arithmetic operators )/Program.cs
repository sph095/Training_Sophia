using System;

namespace school
{
    class Student
    {
        public string name;
        public int age;
    }
    class Marks
    {
        public int mark1;
        public int mark2;
        public int mark3;
        public int total()
        {
            return mark1 + mark2 + mark3;
        }
    }

    class Calculator
    {
        public int add(int a, int b)
        {
            int sum = a + b;
            return sum;
        }
        public int subtract(int a, int b)
        {
            int difference = a - b;
            return difference;
        }
        public int multiply(int a, int b)
        {
            int product = a * b;
            return product;
        }
        public int divide(int a, int b)
        {
            if (b == 0)
            {
                throw new DivideByZeroException("Cannot divide by zero.");
            }
            int quotient = a / b;
            return quotient;
        }
    }

    class Eligible
    {
        public string checkAge(int age)
        {
            return age >= 18 ? "Eligible to Vote" : "Not Eligible to Vote";
        }
    }
    

    class Program
    {
        static void Main()
        {
            //CREATE STUDENT OBJECTS AND DISPLAY THEIR DETAILS

            Student s1 = new Student();
            s1.name = "dory";
            s1.age = 20;
            Console.WriteLine($"Name: {s1.name}, Age: {s1.age}");
            Student s2 = new Student();
            s2.name = "pascal";
            s2.age = 17;
            Console.WriteLine($"Name: {s2.name}, Age: {s2.age}");


            //CREATE MARKS OBJECT AND DISPLAY TOTAL MARKS

            //Marks m1 = new Marks();
            //m1.mark1 = 95;
            //m1.mark2 = 80;
            //m1.mark3 = 90;
            //Console.WriteLine("Marks: " + m1.mark1 + ", " + m1.mark2 + ", " + m1.mark3);
            //Console.WriteLine("Total Marks: " + m1.total());

            //CALCULATOR

            //int a = 20;
            //int b = 10;
            //Calculator cal = new Calculator();
            //Console.WriteLine($"Sum of {a} and {b} is {cal.add(a, b)}");
            //Console.WriteLine($"Difference of {a} and {b} is {cal.subtract(a, b)}");
            //Console.WriteLine($"Product of {a} and {b} is {cal.multiply(a, b)}");
            //Console.WriteLine($"Quotient of {a} and {b} is {cal.divide(a, b)}");

            //ELIGIBLE TO VOTE?

            //Eligible voter = new Eligible();
            //int age = 19;
            //Console.WriteLine(voter.checkAge(age));

            //NORMLA ARITHEMETIC OERATIONS WITHOUT USING CLASS

            //int a = 100;
            //int b = 28;
            //int remainder = a % b;
            //Console.WriteLine($"Remainder is {remainder}\n");
            //bool a_gt_b = a > b;
            //Console.WriteLine($"a is greater than b : {a_gt_b}\n");
            //bool a_is_b = a == b;
            //Console.WriteLine($"a is equal to b: {a_is_b}\n");
            //int c = 70;
            //int d = 45;
            //bool c_gt_d = c > d;
            //Console.WriteLine($"c is greater than d: {c_gt_d}\n");

            //if(a > b && a > c)
            //{
            //    Console.WriteLine("a is the greatest\n");
            // }

            //IMPLICIT TYPE CONVERSION
            //Console.WriteLine("IMPLICIT TYPE CONVERSION\n");
            //int a = 10;
            //double b = a;
            //Console.WriteLine($"Int -> Double: {a} becomes {b}\n");

            //double c = 9.78;
            //int d = (int)c;
            //Console.WriteLine($"Double -> Int: {c} becomes {d}\n");

            //char e = 'A';
            //int f = e;
            //Console.WriteLine($"Char -> Int: {e} becomes {f}\n");

            //EXPLICIT TYPE CONVERSION
            //Console.WriteLine("\n\nEXPLICIT TYPE CONVERSION\n");
            //double g = 12.6;
            //int h = (int)g;
            //Console.WriteLine($"Double -> Int: {g} becomes {h}\n");
            //float i = 5.7f;
            //int j = (int)i;
            //Console.WriteLine($"Float -> Int: {i} becomes {j}\n");
            //char k = 'B';
            //int l = (int)k;
            //Console.WriteLine($"Char -> Int: {k} becomes {l}\n");


            //Stack memory

            //int x = 10;
            //int y = x;
            //Console.WriteLine("Before modifying y:");
            //Console.WriteLine($"x: {x}, y: {y}");
            //y = 20;
            //Console.WriteLine("After modifying y:");
            //Console.WriteLine($"x: {x}, y: {y}");



            //Example for Heap Memory
            //int[] a = { 1, 2, 3, 4, 5 };
            //int[] b = a;
            //Console.WriteLine("Before modifying b[2]:");
            //Console.WriteLine("Array a: " + string.Join(", ", a));
            //Console.WriteLine("Array b: " + string.Join(", ", b));
            //b[2] = 33;
            //Console.WriteLine("After modifying b[2]:");
            //Console.WriteLine("Array a: " + string.Join(", ", a));
            //Console.WriteLine("Array b: " + string.Join(", ", b));





        }
    }

}