import { useState } from 'react';

function TemperatureOutfit() {
 const [temp, setTemp] = useState('');
 const [message, setMessage] = useState('');

 const handleSubmit = () => {
 const t = Number(temp);

 if (t > 30) {
 setMessage(" Too hot! Wear shorts and a t-shirt");
 } else if (t >= 20) {
 setMessage(" Nice weather! Light jacket is fine");
 } else if (t >= 10) {
 setMessage("Cool — grab a sweater");
 } else {
 setMessage(" ToO CoLD!!! Heavy coat and scarf");
 }
 };

 return (
 <div>
 <input
 type="number"
 placeholder="Enter temperature in celsius"
 value={temp}
 onChange={(e) => setTemp(e.target.value)}
 />
 <button onClick={handleSubmit}>Submit</button>
 {message && <p>{message}</p>}
 </div>
 );
}
export default TemperatureOutfit;