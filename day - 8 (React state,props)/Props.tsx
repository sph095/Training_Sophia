function Student(props: any) {
    return (
        <h1>Hello, {props.name}</h1>
    );
}
 
function Details(props: any) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            <p>City: {props.city}</p>
        </div>
    );
}
 
function Props() {
    return (
        <div>
            <Student name="Taylor" />
            <Student name="Luke" />
            
            <Details name="Taylor" age="46" city="New York" />
            <Details name="Luke" age="39" city="Los Angeles" />
        </div>
    );
}
 
export default Props;
 
 