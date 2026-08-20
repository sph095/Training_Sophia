//XML string to C# object

using System;
using System.Xml;
using System.Xml.Linq;

class Program
{
    static void Main()
    {
        string xml = @"
<order>
 <id>1001</id>
 <customer>Ravi</customer>
 <total>2500</total>
</order>";

        XDocument doc = XDocument.Parse(xml);
        string id = doc.Root.Element("id").Value;
        string customer = doc.Root.Element("customer").Value; 
        string total = doc.Root.Element("total").Value; 

        Console.WriteLine($"Order {id}: {customer} - Rs. {total}");
    }
}

//JSON to c#

//using System;
//using System.Text.Json;
//class Product
//{
//    public int id { get; set; }
//    public string name { get; set; }
//    public decimal price { get; set; }
//}

//class Program
//{
//    static void Main()
//    {
//        string json = "{\"id\":101,\"name\":\"Wireless Mouse\",\"price\":24.99}";
//        var myData= JsonSerializer.Deserialize<Product>(json);
//        Console.WriteLine($"{myData.name} costs ${myData.price}");
//    }
//}

//PDF CREATION ITEXTSHARP

//using iTextSharp.text;
//using iTextSharp.text.pdf;
//using System;
//using System.IO;

//class Program
//{
//    static void Main()
//    {
//        Document doc = new Document();
//        PdfWriter.GetInstance(doc, new FileStream("invoice.pdf", FileMode.Create));
//        doc.Open();
//        doc.Add(new Paragraph("Invoice #1024"));
//        doc.Add(new Paragraph("Date: 2026-08-20"));
//        doc.Add(new Paragraph("Item: Laptop - $899.00"));
//        doc.Add(new Paragraph("Total: $899.00"));
//        doc.Close();
//        Console.WriteLine("PDF created: invoice.pdf");
//    }
//}